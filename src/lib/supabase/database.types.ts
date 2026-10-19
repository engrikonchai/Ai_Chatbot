/**
 * Database types for the Supabase client.
 *
 * HAND-WRITTEN, TEMPORARY. They mirror supabase/migrations/20261020120000_foundation.sql
 * in the shape `supabase gen types typescript` produces, because generating them needs a
 * live project and none was configured when this was written. Once the project exists,
 * replace this file with generated output:
 *
 *   npx supabase gen types typescript --project-id <ref> --schema public \
 *     > src/lib/supabase/database.types.ts
 *
 * Keep it in sync with every migration until then.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

/** Mirrors businesses_onboarding_stage_check. */
export type OnboardingStage =
  | 'website'
  | 'analysis'
  | 'review'
  | 'enquiries'
  | 'test'
  | 'widget'
  | 'installation'
  | 'complete';

export type WidgetPosition = 'left' | 'right';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          created_at: string;
          updated_at: string;
        };
        // Created by the handle_new_user trigger only; clients have no insert grant.
        Insert: {
          id: string;
          name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string | null;
        };
        Relationships: [];
      };
      businesses: {
        Row: {
          id: string;
          owner_id: string;
          name: string | null;
          website_url: string | null;
          enquiry_email: string | null;
          onboarding_stage: OnboardingStage;
          onboarding_completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        // Clients may only supply owner_id (column grant); everything else is defaulted.
        Insert: {
          owner_id: string;
        };
        // Column grant: only these four are writable by the owner.
        Update: {
          name?: string | null;
          website_url?: string | null;
          enquiry_email?: string | null;
          onboarding_stage?: OnboardingStage;
        };
        Relationships: [];
      };
      widget_settings: {
        Row: {
          business_id: string;
          assistant_name: string;
          welcome_message: string;
          primary_color: string;
          position: WidgetPosition;
          created_at: string;
          updated_at: string;
        };
        // Created by the create_default_widget_settings trigger only.
        Insert: {
          business_id: string;
        };
        Update: {
          assistant_name?: string;
          welcome_message?: string;
          primary_color?: string;
          position?: WidgetPosition;
        };
        Relationships: [
          {
            foreignKeyName: 'widget_settings_business_id_fkey';
            columns: ['business_id'];
            isOneToOne: true;
            referencedRelation: 'businesses';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

export type Business = Database['public']['Tables']['businesses']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type WidgetSettings = Database['public']['Tables']['widget_settings']['Row'];
