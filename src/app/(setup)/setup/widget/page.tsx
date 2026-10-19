import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { OnboardingIntro } from '@/components/OnboardingIntro';
import { getWidgetSettings } from '@/lib/data/widget';
import { demoWidget } from '@/lib/demo';

import { WidgetSetup } from './WidgetSetup';

export const metadata: Metadata = { title: 'Make it yours' };

/**
 * Onboarding step 6: Widget setup (WIREFRAMES.md, "Step 6 - Widget Setup"). Answers one
 * question, "What will my customers see?", with a preview and four basics. Strong
 * defaults: the owner can continue without changing anything.
 *
 * Loads the owner's saved appearance and saves it on Continue (see WidgetSetup). The
 * preview is drawn by this page; it is not the embeddable widget, which does not exist
 * yet, so nothing here claims the live widget uses these settings.
 */
export default async function WidgetSetupPage() {
  const settings = await getWidgetSettings();
  // The database creates this row with the business; the approved defaults (the same
  // values) cover the unlikely case that it is missing.
  const initial = settings
    ? {
        name: settings.assistant_name,
        greeting: settings.welcome_message,
        colour: settings.primary_color,
        position: settings.position,
      }
    : { name: demoWidget.name, greeting: demoWidget.greeting, colour: demoWidget.colour, position: demoWidget.position };

  return (
    <Container size="split">
      <OnboardingIntro
        title="Make it yours."
        lede="This is what visitors will see on your website. Adjust a few basics before you install it."
      />

      <WidgetSetup initial={initial} />
    </Container>
  );
}
