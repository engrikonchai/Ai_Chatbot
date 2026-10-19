'use server';

import { redirect } from 'next/navigation';

import { requireBusiness } from '@/lib/data/business';
import { createClient } from '@/lib/supabase/server';
import { normalizeWebsite } from '@/lib/website-url';

/*
 * Saves the parts of setup that do not depend on the assistant itself: the website
 * address, where enquiries go, and how the widget looks.
 *
 * Each action re-validates its input, resolves the business from the verified
 * session (never from the request) and writes as the signed-in owner, so Row Level
 * Security applies too. `.select()` after each update proves a row was really
 * written; nothing reports success otherwise.
 *
 * None of these advance businesses.onboarding_stage. The stages between them
 * (analysis, review, test) are not real yet, so saving a later answer must not imply
 * earlier steps happened. The saved values themselves are the durable progress.
 */

export type SaveResult = { error?: string; saved?: string };

const SAVE_FAILED = 'We couldn’t save that. Please try again.';

function failed(context: string, message?: string): SaveResult {
  console.error(`${context} failed:`, message ?? 'no row was updated');
  return { error: SAVE_FAILED };
}

export async function saveWebsite(input: { website: unknown }): Promise<SaveResult> {
  const check = normalizeWebsite(typeof input.website === 'string' ? input.website : '');
  if (!check.ok) {
    return {
      error:
        check.reason === 'empty'
          ? 'Enter your website address to continue.'
          : 'That doesn’t look like a website address. Try something like myhotel.me.',
    };
  }

  const business = await requireBusiness();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('businesses')
    .update({ website_url: check.url })
    .eq('id', business.id)
    .select('website_url');
  if (error || !data?.length) return failed('Saving the website', error?.message);
  return { saved: check.url };
}

// Same shape check as the browser's type="email" and the auth forms.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function saveEnquiryEmail(input: { email: unknown }): Promise<SaveResult> {
  const email = typeof input.email === 'string' ? input.email.trim() : '';
  if (!email) return { error: 'Enter an email address to continue.' };
  if (email.length > 320 || !EMAIL.test(email)) return { error: 'Enter a valid email address.' };

  const business = await requireBusiness();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('businesses')
    .update({ enquiry_email: email })
    .eq('id', business.id)
    .select('enquiry_email');
  if (error || !data?.length) return failed('Saving the enquiry email', error?.message);

  // The address really is saved, so moving on is honest. Nothing is emailed yet.
  redirect('/setup/test');
}

const COLOUR = /^#[0-9a-f]{6}$/;

export async function saveWidgetSettings(input: {
  name: unknown;
  greeting: unknown;
  colour: unknown;
  position: unknown;
}): Promise<SaveResult> {
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const greeting = typeof input.greeting === 'string' ? input.greeting.trim() : '';
  const colour = typeof input.colour === 'string' ? input.colour.trim().toLowerCase() : '';
  const position = input.position === 'left' || input.position === 'right' ? input.position : null;

  if (!name) return { error: 'Give your assistant a name.' };
  if (name.length > 30) return { error: 'Keep the name to 30 characters or fewer.' };
  if (!greeting) return { error: 'Write a short welcome message.' };
  if (greeting.length > 140) return { error: 'Keep the welcome message to 140 characters or fewer.' };
  if (!COLOUR.test(colour)) return { error: 'Choose a colour.' };
  if (!position) return { error: 'Choose a position.' };

  const business = await requireBusiness();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('widget_settings')
    .update({ assistant_name: name, welcome_message: greeting, primary_color: colour, position })
    .eq('business_id', business.id)
    .select('business_id');
  if (error || !data?.length) return failed('Saving widget settings', error?.message);

  // Saved for real. The production widget that will use them does not exist yet.
  redirect('/setup/install');
}
