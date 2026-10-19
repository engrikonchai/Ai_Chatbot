import type { Metadata } from 'next';

import { AssistantMark } from '@/components/AssistantMark';
import { ButtonLink } from '@/components/Button';
import { Container } from '@/components/Container';
import { PRODUCT_NAME } from '@/lib/brand';
import { demoInstall } from '@/lib/demo';

import styles from './landing.module.css';

export const metadata: Metadata = {
  title: { absolute: `${PRODUCT_NAME}: your website, working for you` },
  description:
    'An AI assistant for your website. It learns your business, answers customer questions and emails you the enquiries that matter.',
};

/**
 * Public landing page (SCREENS.md section 2). One idea, understood in seconds: your
 * website answers customers and captures enquiries for you, and you don't have to
 * watch another inbox.
 *
 * Every example on this page is illustrative and labelled as such for assistive
 * technology: no real business, customer or result is shown. No prices, plans,
 * integrations or numbers are claimed, because none are decided (PRODUCT.md
 * section 17; DESIGN.md section 26). Calls to action go to /signup, never straight
 * into setup.
 */

const STEPS = [
  {
    title: 'Add your website',
    text: 'Your assistant reads it and learns the basics about your business.',
  },
  {
    title: 'Check a few details',
    text: 'Confirm the things that matter, like prices and policies, and fill in anything it couldn’t find.',
  },
  {
    title: 'Test your assistant',
    text: 'Ask it what your customers ask. If an answer is wrong, correct it right there.',
  },
  {
    title: 'Add it to your website',
    text: 'Paste one small piece of code. Your assistant takes it from there.',
  },
] as const;

const OUTCOMES = [
  {
    title: 'Answers repetitive questions',
    text: 'Opening hours, prices, parking, how to book. Visitors get an answer straight away, at any hour.',
  },
  {
    title: 'Captures serious enquiries',
    text: 'When someone is ready to book or wants a quote, it collects their details for you.',
  },
  {
    title: 'Learns when you correct it',
    text: 'Tell it once when something is wrong or missing. It uses your answer from then on.',
  },
  {
    title: 'Works while you’re busy',
    text: 'It doesn’t need watching. It only asks for your help when it genuinely needs it.',
  },
] as const;

export default function LandingPage() {
  return (
    <>
      <Container size="wide">
        <section aria-labelledby="hero-title" className={styles.hero}>
          <div className={styles.heroText}>
            <h1 id="hero-title" className={styles.heroTitle}>
              <span className={styles.line}>Your website,</span>{' '}
              <span className={styles.line}>working for you.</span>
            </h1>
            <p className={styles.heroLede}>
              An AI assistant that learns your business, answers your customers’ questions and
              sends you the enquiries that matter. No new inbox to watch.
            </p>
            <div className={styles.ctas}>
              <ButtonLink href="/signup">Build my assistant</ButtonLink>
              <ButtonLink href="#how-it-works" variant="secondary">
                See how it works
              </ButtonLink>
            </div>
          </div>

          <figure className={styles.demo}>
            <figcaption className="visually-hidden">
              Example: a visitor asks about airport transfers, the assistant answers, and the
              visitor’s booking request is emailed to the business.
            </figcaption>
            <div className={styles.chat}>
              <div className={styles.chatHead}>
                <span className={styles.chatMark}>
                  <AssistantMark size={18} />
                </span>
                <span>Assistant</span>
              </div>
              <div className={styles.chatBody}>
                <p className={styles.visitor}>
                  <span className="visually-hidden">Visitor: </span>Do you offer airport transfers?
                </p>
                <p className={styles.reply}>
                  <span className="visually-hidden">Assistant: </span>Yes. Airport transfers are €25
                  each way.
                </p>
                <p className={styles.visitor}>
                  <span className="visually-hidden">Visitor: </span>Could I book one for 14 July?
                </p>
                <p className={styles.reply}>
                  <span className="visually-hidden">Assistant: </span>I’ll pass your request on so
                  they can confirm it with you. What’s the best email to reach you?
                </p>
              </div>
            </div>
            <p className={styles.sent}>
              <CheckIcon />
              Enquiry sent to reservations@example.com
            </p>
          </figure>
        </section>
      </Container>

      <div className={styles.band}>
        <Container size="wide">
          <section id="how-it-works" aria-labelledby="how-title" className={styles.section}>
            <p className={styles.eyebrow}>How it works</p>
            <h2 id="how-title" className={styles.sectionTitle}>
              Set it up once. Then it gets on with the job.
            </h2>
            <ol className={styles.steps}>
              {STEPS.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3 className={styles.itemTitle}>{step.title}</h3>
                  <p className={styles.itemText}>{step.text}</p>
                </li>
              ))}
            </ol>
          </section>
        </Container>
      </div>

      <Container size="wide">
        <section aria-labelledby="outcomes-title" className={`${styles.section} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow}>What it does for you</p>
            <h2 id="outcomes-title" className={styles.sectionTitle}>
              It handles the questions you answer every day.
            </h2>
          </div>
          <ul className={styles.outcomes}>
            {OUTCOMES.map((outcome) => (
              <li key={outcome.title} className={styles.outcome}>
                <h3 className={styles.itemTitle}>{outcome.title}</h3>
                <p className={styles.itemText}>{outcome.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <hr className={styles.rule} />

        <section aria-labelledby="enquiries-title" className={`${styles.section} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow}>Enquiries</p>
            <h2 id="enquiries-title" className={styles.sectionTitle}>
              No inbox to watch.
            </h2>
            <div className={styles.prose}>
              <p>
                When a visitor wants to book, asks for a quote or needs personal help, your assistant
                collects the important details and emails the enquiry to you. You reply the way you
                already do.
              </p>
              <p>It won’t promise availability or prices it doesn’t know.</p>
            </div>
          </div>

          <figure className={styles.email}>
            <figcaption className="visually-hidden">Example of an enquiry email</figcaption>
            <p className={styles.emailSubject}>New enquiry from your website</p>
            <dl className={styles.emailFields}>
              <div>
                <dt>Name</dt>
                <dd>Anna Novak</dd>
              </div>
              <div>
                <dt>Dates</dt>
                <dd>14–17 July</dd>
              </div>
              <div>
                <dt>Guests</dt>
                <dd>2</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>anna@example.com</dd>
              </div>
            </dl>
            <p className={styles.emailRequest}>Would like an airport transfer on arrival.</p>
          </figure>
        </section>

        <hr className={styles.rule} />

        <section aria-labelledby="install-title" className={`${styles.section} ${styles.split}`}>
          <div>
            <p className={styles.eyebrow}>Installation</p>
            <h2 id="install-title" className={styles.sectionTitle}>
              One small script.
            </h2>
            <div className={styles.prose}>
              <p>Paste one small piece of code into your website and publish. That’s it.</p>
            </div>
          </div>

          <figure className={styles.code}>
            <figcaption className="visually-hidden">Example installation code</figcaption>
            {/* Representative only: the same placeholder snippet as /setup/install. */}
            <pre className={styles.snippet}>
              <code>{demoInstall.snippet}</code>
            </pre>
          </figure>
        </section>
      </Container>

      <div className={styles.band}>
        <Container size="wide">
          <section aria-labelledby="start-title" className={styles.closing}>
            <h2 id="start-title" className={styles.closingTitle}>
              Let your website answer for you.
            </h2>
            <p className={styles.closingLede}>
              Set it up once. It handles the everyday questions and only asks you when it needs
              you.
            </p>
            <ButtonLink href="/signup">Build my assistant</ButtonLink>
          </section>
        </Container>
      </div>
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.5 10.5 8 14l7.5-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
