/**
 * DEMO DATA for the Milestone 1 Home validation screen. No backend exists yet.
 * Values come from the Home wireframe ("default returning state"). Replace with
 * real data when the data layer exists; nothing else should import this.
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
