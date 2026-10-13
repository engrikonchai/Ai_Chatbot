/**
 * DEMO DATA for the validation screens (Home, Learning, Analysis complete, Review). No backend
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

/**
 * A representative, STATIC "analysis complete" state for /setup/analysis-complete.
 * It is NOT the result of any scan: nothing here was extracted from a website, and
 * nothing generates or changes it. A real scan will supply these summaries and the
 * count of things that need the owner's help.
 */
export const demoAnalysisComplete = {
  learned: [
    { name: 'Business details', detail: 'Address, contact information and opening hours' },
    { name: 'Services', detail: 'The services and options you offer' },
    { name: 'Common questions', detail: 'The details visitors are most likely to ask about' },
  ],
  needsHelpCount: 3,
} as const;

/**
 * Three representative questions for /setup/review, one per interaction pattern:
 * verify a fact, resolve a conflict, teach something missing. They are NOT the result
 * of any scan; nothing was found on any website. `key` is for React state only and is
 * never shown. A real knowledge system will supply these.
 */
export const demoReview = {
  items: [
    {
      kind: 'verify',
      key: 'airport-transfer',
      topic: 'Airport transfer',
      found: '€25 each way',
      editLabel: 'Airport transfer price',
    },
    {
      kind: 'choose',
      key: 'check-in',
      topic: 'Check-in time',
      options: ['2:00 PM', '3:00 PM'],
    },
    {
      kind: 'teach',
      key: 'pets',
      topic: 'Pets',
      question: 'Do you allow pets?',
      example: 'Yes, pets are welcome for an additional €10 per night.',
    },
  ],
} as const;
