# Supabase

Database schema for the app, as ordered migrations in `migrations/`. The app talks to
Supabase only with the public URL and publishable key (see `../.env.example`); there is
no service-role key anywhere in the codebase.

## Apply the schema to a project

Either link the project with the Supabase CLI and push:

```sh
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

or paste each file in `migrations/`, in filename order, into the SQL Editor.

Then regenerate types (`src/lib/supabase/database.types.ts` is hand-written until then):

```sh
npx supabase gen types typescript --project-id <your-project-ref> --schema public \
  > src/lib/supabase/database.types.ts
```

## What the schema guarantees

- Row Level Security on every table: an owner only ever sees their own profile, their
  own business and its widget settings. The anonymous role has no access.
- Column-level grants: owners can only edit the fields the app edits. Ownership, ids
  and `onboarding_completed_at` cannot be changed from the browser.
- A profile is created for every new auth user by a trigger (works with email
  confirmation on). Default widget settings are created with every business.
