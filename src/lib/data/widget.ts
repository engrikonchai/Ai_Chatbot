import { cache } from 'react';

import type { WidgetSettings } from '@/lib/supabase/database.types';
import { createClient } from '@/lib/supabase/server';

import { requireBusiness } from './business';

/**
 * The owner's widget appearance. A row is created with every business (database
 * trigger) using the approved defaults, so this only returns null if that row is
 * genuinely missing. Read as the owner, so Row Level Security applies.
 */
export const getWidgetSettings = cache(async (): Promise<WidgetSettings | null> => {
  const business = await requireBusiness();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('widget_settings')
    .select('*')
    .eq('business_id', business.id)
    .maybeSingle();
  if (error) throw new Error(`Could not load widget settings: ${error.message}`);
  return data;
});
