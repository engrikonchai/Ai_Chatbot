/**
 * DEMO DATA for the validation screens (Home, and the Learning state). No backend
 * exists yet. Values come from the wireframes. Replace with real data when the data
 * layer exists; nothing else should import this.
 */
export const demoOwner = { firstName: 'Alex' } as const;

export const demoHome = {
  // Hardcoded on purpose: a real greeting needs the visitor's local time.
  greeting: 'Good morning',
  site: 'example.com',
  week: { conversations: 42, enquiries: 7, handledAutomaticallyPercent: 91 },
  recent: [
    { label: 'Today', conversations: 8, enquiries: 2 },
    { label: 'Yesterday', conversations: 11, enquiries: 1 },
  ],
} as const;

/**
 * A representative, STATIC "in progress" state for /setup/learning. It is not the
 * result of any scan and nothing advances it. Real progress replaces this later.
 */
export const demoLearning = {
  site: 'example.com',
  steps: [
    { label: 'Found your website', state: 'done' },
    { label: 'Reading your services', state: 'done' },
    { label: 'Checking prices and policies', state: 'current' },
    { label: 'Preparing your assistant', state: 'pending' },
  ],
} as const;
