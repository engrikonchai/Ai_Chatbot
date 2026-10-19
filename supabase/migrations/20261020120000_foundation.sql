-- =============================================================================
-- Foundation: owner profile, one business per owner, widget appearance.
--
-- Deliberately small. No knowledge, conversations, enquiries or teams yet: those
-- arrive with the features that need them (Phase 2 Part 2).
--
-- Security model: every table has Row Level Security. A signed-in owner can only see
-- and change their own profile, their own business and that business's widget
-- settings. The anonymous role gets nothing. Writes are further limited to the
-- columns the app actually edits (column-level grants), so ownership, ids and
-- completion state cannot be changed from the browser.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- updated_at: one small trigger function shared by every table.
-- -----------------------------------------------------------------------------
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;


-- -----------------------------------------------------------------------------
-- profiles: one row per auth user, holding what the product needs about them.
-- -----------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text check (name is null or char_length(name) between 1 and 200),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

create policy "Owners can read their own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "Owners can update their own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Rows are created by handle_new_user() below, never by clients.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (name) on public.profiles to authenticated;


-- -----------------------------------------------------------------------------
-- Profile creation: a trigger on auth.users.
--
-- Chosen over creating the profile from the app after sign-up because it is the only
-- approach that works when email confirmation is on: sign-up then returns no session,
-- so the app cannot write as the new user, and this app has no service-role key by
-- design. The trigger is tiny, idempotent and only copies the name given at sign-up.
-- -----------------------------------------------------------------------------
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    nullif(left(btrim(coalesce(new.raw_user_meta_data ->> 'name', '')), 200), '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- -----------------------------------------------------------------------------
-- businesses: one per owner for the MVP (unique owner_id). No teams or switching.
--
-- onboarding_stage is the furthest step of setup whose information is genuinely
-- saved, i.e. where a returning owner should resume. It is a checked text column
-- rather than an enum so later steps can be added by replacing one constraint.
-- Viewing a screen never advances it. onboarding_completed_at stays null until the
-- assistant is really live; clients cannot set it (see grants below).
-- -----------------------------------------------------------------------------
create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null unique references auth.users (id) on delete cascade,
  name text check (name is null or char_length(name) between 1 and 200),
  website_url text check (website_url is null or char_length(website_url) between 1 and 2048),
  enquiry_email text check (enquiry_email is null or char_length(enquiry_email) between 3 and 320),
  onboarding_stage text not null default 'website'
    constraint businesses_onboarding_stage_check check (onboarding_stage in (
      'website', 'analysis', 'review', 'enquiries', 'test', 'widget', 'installation', 'complete'
    )),
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger businesses_set_updated_at
  before update on public.businesses
  for each row execute function public.set_updated_at();

alter table public.businesses enable row level security;

create policy "Owners can read their own business"
  on public.businesses for select to authenticated
  using ((select auth.uid()) = owner_id);

create policy "Owners can create their own business"
  on public.businesses for insert to authenticated
  with check ((select auth.uid()) = owner_id);

create policy "Owners can update their own business"
  on public.businesses for update to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

revoke all on public.businesses from anon, authenticated;
grant select on public.businesses to authenticated;
grant insert (owner_id) on public.businesses to authenticated;
grant update (name, website_url, enquiry_email, onboarding_stage) on public.businesses to authenticated;


-- -----------------------------------------------------------------------------
-- widget_settings: how the website assistant looks. One row per business, created
-- with the business so the owner always starts from the approved defaults (the same
-- values as the Widget Setup screen: src/lib/demo.ts, demoWidget).
-- -----------------------------------------------------------------------------
create table public.widget_settings (
  business_id uuid primary key references public.businesses (id) on delete cascade,
  assistant_name text not null default 'Assistant'
    check (char_length(btrim(assistant_name)) between 1 and 30),
  welcome_message text not null default 'Hi! How can I help?'
    check (char_length(btrim(welcome_message)) between 1 and 140),
  primary_color text not null default '#57644a'
    check (primary_color ~ '^#[0-9a-f]{6}$'),
  position text not null default 'right'
    check (position in ('left', 'right')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger widget_settings_set_updated_at
  before update on public.widget_settings
  for each row execute function public.set_updated_at();

alter table public.widget_settings enable row level security;

create policy "Owners can read their own widget settings"
  on public.widget_settings for select to authenticated
  using (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = (select auth.uid())
  ));

create policy "Owners can update their own widget settings"
  on public.widget_settings for update to authenticated
  using (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.businesses b
    where b.id = business_id and b.owner_id = (select auth.uid())
  ));

-- Rows are created by create_default_widget_settings() below, never by clients.
revoke all on public.widget_settings from anon, authenticated;
grant select on public.widget_settings to authenticated;
grant update (assistant_name, welcome_message, primary_color, position)
  on public.widget_settings to authenticated;

create function public.create_default_widget_settings()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.widget_settings (business_id)
  values (new.id)
  on conflict (business_id) do nothing;
  return new;
end;
$$;

revoke execute on function public.create_default_widget_settings() from public, anon, authenticated;

create trigger businesses_create_widget_settings
  after insert on public.businesses
  for each row execute function public.create_default_widget_settings();
