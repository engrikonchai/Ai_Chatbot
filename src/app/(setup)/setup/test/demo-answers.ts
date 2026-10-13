import { demoTest } from '@/lib/demo';

/*
 * LOCAL DEMO ANSWERS. INTERACTION VALIDATION ONLY. THIS IS NOT AI.
 *
 * No model, no API, no request. A question is answered only if, once normalised, it
 * exactly matches a phrasing in `demoTest` (or one the owner taught during this visit).
 * Anything else is "unknown", and the assistant says so rather than guessing. There
 * is deliberately no fuzzy matching: an exact lookup can never invent an answer.
 *
 * The knowledge is a plain immutable value held in React state by TestConversation, so
 * corrections and teaching last only until the page is refreshed. The real answer
 * engine replaces this module.
 */

export type Knowledge = {
  /** Normalised question -> topic. */
  readonly topics: Readonly<Record<string, string>>;
  /** Topic -> the answer the assistant gives. */
  readonly answers: Readonly<Record<string, string>>;
};

export type Reply = { kind: 'answer'; topic: string; text: string } | { kind: 'unknown' };

/** Ignore casing, punctuation and spacing: "do you have parking" = "Do you have parking?". */
export function normalizeQuestion(question: string) {
  return question
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^\p{L}\p{N}']+/gu, ' ')
    .trim();
}

export function initialKnowledge(): Knowledge {
  const topics: Record<string, string> = {};
  const answers: Record<string, string> = {};
  for (const fact of demoTest.knowledge) {
    answers[fact.topic] = fact.answer;
    for (const phrasing of fact.phrasings) topics[normalizeQuestion(phrasing)] = fact.topic;
  }
  return { topics, answers };
}

export function reply(knowledge: Knowledge, question: string): Reply {
  const topic = knowledge.topics[normalizeQuestion(question)];
  const text = topic === undefined ? undefined : knowledge.answers[topic];
  return topic === undefined || text === undefined ? { kind: 'unknown' } : { kind: 'answer', topic, text };
}

/** "Not correct?": every question about this topic now gets the owner's wording. */
export function correct(knowledge: Knowledge, topic: string, text: string): Knowledge {
  return { ...knowledge, answers: { ...knowledge.answers, [topic]: text } };
}

/** "Teach assistant": the question that stumped it now has an answer. */
export function teach(knowledge: Knowledge, question: string, text: string): Knowledge {
  const normalized = normalizeQuestion(question);
  const topic = `taught:${normalized}`;
  return {
    topics: { ...knowledge.topics, [normalized]: topic },
    answers: { ...knowledge.answers, [topic]: text },
  };
}
