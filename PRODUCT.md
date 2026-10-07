# AI Website Assistant — Product Definition

## 1. Product Vision

We are building an AI assistant for businesses that lives on their website and handles repetitive customer conversations automatically.

The product is not a customer-support inbox, CRM, helpdesk, chatbot builder, or large SaaS dashboard.

The business owner should configure the assistant once, install it on their website, and only return when the assistant genuinely needs information or when they want to change something.

The product should reduce the amount of software the owner has to manage.

### North Star

> A business owner sets up an AI assistant once, installs it on their website, and only comes back when the AI genuinely needs something from them.

Every product decision must support this principle.

---

# 2. Problem

Businesses receive the same questions repeatedly:

- What are your opening hours?
- How much does this cost?
- Do you have parking?
- Where are you located?
- Do you have availability?
- Can I bring pets?
- What services do you offer?
- How can I book?
- Can somebody contact me?

Many small businesses do not have dedicated customer-support staff.

The owner or employee ends up answering these questions through:

- website forms
- Instagram
- WhatsApp
- phone calls
- email
- other messaging tools

Traditional customer-support software often creates another place the owner has to monitor.

That defeats the purpose.

Our product should handle repetitive website conversations automatically while escalating only the situations that actually require a human.

---

# 3. Product Promise

The customer-facing promise is simple:

> Turn your website into an AI-powered employee that answers questions and captures enquiries for you.

The owner should feel:

> “My website handles customers even when I am busy.”

Not:

> “Now I have another dashboard to manage.”

---

# 4. Target Customer

The initial customer is a small or medium-sized business that:

- has a website
- receives repetitive customer questions
- does not want to manage complicated software
- benefits from collecting enquiries
- wants customers to receive answers outside business hours

Initial examples include:

Hotels and apartments, restaurants, car rentals, tour companies, real-estate businesses, beauty businesses, clinics, gyms, service businesses, and similar local businesses.

The architecture should eventually support different industries, but the MVP should not attempt to create custom workflows for every industry.

The system should stay general wherever possible.

---

# 5. Core Product Principle

The assistant works for the business.

The business should not work for the assistant.

Whenever we consider adding a feature, ask:

> Does this remove work from the owner, or does it create another thing they have to manage?

If it creates recurring management work without providing significant value, it should not be part of the core product.

---

# 6. What the Product Is

The product is an AI website assistant that can:

- learn information about a business
- answer customer questions
- identify when it does not know something
- collect enquiries and contact information
- notify the business when human involvement is genuinely required
- improve when the owner teaches it missing information
- run through an embeddable website widget

The technical system may be sophisticated internally.

The user interface should remain simple.

---

# 7. What the Product Is NOT

The product is not primarily:

- a shared team inbox
- a live-chat platform
- a traditional CRM
- a helpdesk
- a ticketing system
- a chatbot flow builder
- a workflow automation platform
- an analytics platform
- a complicated knowledge-management system

Some related functionality may exist internally or be added later, but these concepts must not define the main user experience.

---

# 8. Core Owner Journey

The ideal first-time experience is:

**Create account → Add website → AI learns business → Review missing information → Configure enquiry delivery → Test assistant → Install widget → Go live**

The owner should not need documentation to complete this process.

The setup should feel like hiring and training an employee rather than configuring software.

### Step 1 — Create Account

The owner creates an account and provides basic business information.

We should request only information that is necessary at this stage.

### Step 2 — Add Website

The owner enters their website URL.

Example:

`https://examplehotel.me`

The platform analyses the website and extracts useful business information.

Possible information includes:

- business name
- services
- prices
- location
- opening hours
- policies
- contact information
- frequently mentioned questions
- accommodation or product information

### Step 3 — Review What the Assistant Learned

Instead of presenting a traditional knowledge-base editor, show something understandable.

Example:

**Your assistant learned:**

Opening hours ✓  
Location ✓  
Room information ✓  
Parking ✓  
Cancellation policy ?

For missing or uncertain information:

> We couldn't find your cancellation policy.

The owner can answer naturally:

> Free cancellation up to 3 days before arrival.

The assistant now knows this information.

### Step 4 — Decide What Happens With Enquiries

The owner chooses where important enquiries should go.

For MVP, email should be enough.

Example:

> Send new enquiries to:  
> reservations@example.com

Later integrations may include WhatsApp, CRM systems, Slack, Telegram, or other destinations.

The owner should not need to monitor our platform to receive enquiries.

### Step 5 — Test the Assistant

The owner sees the actual assistant and can talk to it before installing it.

Example questions:

> Do you have parking?

> What time is check-in?

> Can I bring my dog?

If something is incorrect, the owner can correct it immediately.

### Step 6 — Install

The owner receives the installation method.

For custom websites:

```html
<script src="..."></script>
```

Other installation guides can later be provided for platforms such as WordPress, Webflow, Wix, Shopify, or similar website builders.

### Step 7 — Live

The assistant begins handling visitors.

The owner should not need to keep the dashboard open.

---

# 9. Returning Owner Experience

A returning owner should immediately understand whether anything requires them.

The Home page should answer two questions:

> What has my assistant done?

> Does anything need me?

Example:

**Your assistant this week**

38 conversations handled  
31 questions answered automatically  
5 enquiries captured  
2 things need your attention

The most important section is not analytics.

It is:

## Things that need you

Example:

> A visitor asked:  
> “Do you offer airport transfers?”

> Your assistant doesn't know the answer.

The owner enters:

> Yes, airport transfers are €25 each way.

Then presses:

**Teach assistant**

The owner is not replying to the customer.

They are improving the assistant so future customers receive the correct answer automatically.

---

# 10. Main Product Navigation

The core application should have only three main product areas.

## Home

Purpose:

Show what happened and whether the owner needs to do anything.

Possible content:

- conversations handled
- enquiries captured
- unanswered questions
- important warnings
- assistant status
- things requiring the owner's input

Home should not become a generic analytics dashboard.

## Assistant

Purpose:

Manage what the AI knows and how it behaves.

The owner should be able to:

- review important business knowledge
- correct information
- add information
- answer unanswered questions
- test the assistant
- make a small number of understandable behaviour changes

Avoid exposing unnecessary AI configuration.

Do not make the owner configure:

temperature, tokens, retrieval settings, system prompts, embeddings, model parameters, or other technical concepts.

## Website

Purpose:

Manage how the assistant appears and how it is installed.

Possible functionality:

- live widget preview
- brand colour
- assistant name
- welcome message
- widget position
- installation instructions
- installation status

Keep customization intentionally limited.

Strong defaults are better than dozens of controls.

## Settings

Settings is secondary navigation.

It can contain:

- business information
- account
- notifications
- subscription/billing
- advanced options
- privacy/data controls

---

# 11. Inbox Decision

There is no primary Inbox.

This is an intentional product decision.

The product's purpose is to reduce the amount of customer conversation the business owner has to handle.

Creating a traditional inbox would encourage the owner to manually read and respond to conversations.

That would transform the product into another customer-support tool.

Conversation records may still exist internally for:

- AI context
- debugging
- quality review
- security
- disputes
- analytics
- improving assistant performance

If conversation history is ever exposed to the owner, it should be secondary or advanced functionality.

The interface must never create the expectation that the owner should monitor unread chats.

Avoid concepts such as:

“12 unread conversations”

Prefer:

“12 conversations handled automatically.”

---

# 12. Enquiries

When a visitor shows genuine interest, the assistant should collect useful information.

Example for accommodation:

Name  
Email/phone  
Dates  
Number of guests  
Question/request

Example for car rental:

Name  
Contact details  
Pickup date  
Return date  
Preferred vehicle  
Request

Example for services:

Name  
Contact details  
Requested service  
Preferred date  
Additional information

The AI should summarize the enquiry and deliver it to the business.

The business should be able to receive and act on an enquiry without opening our platform.

For MVP, email delivery is sufficient.

The platform may keep an internal copy for reliability and reporting.

---

# 13. Human Handoff

Human involvement should be an exception, not the normal workflow.

The assistant should involve the business when:

- it lacks necessary information
- the visitor explicitly needs human help
- the situation is sensitive
- a custom quote is required
- an important enquiry needs follow-up
- the assistant cannot safely answer

The default should never be:

> Open our dashboard and continue chatting.

Instead, the assistant should collect the relevant information and send a useful summary to the business.

---

# 14. Knowledge Philosophy

The owner should not feel like they are maintaining a database.

The product should translate complicated AI knowledge infrastructure into simple concepts.

Prefer:

> “Your assistant knows this.”

> “We need your answer to this.”

> “This information may be outdated.”

Avoid:

> “Create knowledge item.”

> “Manage vector source.”

> “Configure retrieval.”

> “Upload embedding source.”

The underlying architecture can still use structured knowledge, documents, embeddings, retrieval, crawling, and confidence scoring.

The owner does not need to know.

---

# 15. AI Behaviour

The assistant should prioritize correctness over pretending to know everything.

It should:

- answer using approved business information
- use conversation context
- ask reasonable clarification questions
- capture enquiries when appropriate
- clearly admit when information is unavailable
- avoid inventing prices, availability, policies, or promises

If live availability is not integrated, the assistant must not claim that something is available.

Example:

Bad:

> Yes, Room 4 is available July 10–15.

Good:

> I don't have access to live availability, but I can send your dates and guest count to the property so they can confirm it for you.

---

# 16. Design Principles

The product should feel calm, obvious, friendly, and lightweight.

It should feel closer to a polished consumer application than enterprise administration software.

The interface should prioritize:

clarity, whitespace, strong hierarchy, understandable language, useful defaults, minimal navigation, and obvious actions.

Avoid unnecessary:

sidebars, nested navigation, tables, filters, tabs, charts, settings, badges, status labels, configuration panels, and enterprise terminology.

A screen with less information is often better if it helps the owner understand what to do.

---

# 17. MVP

The MVP must prove that a business can:

- create an account
- provide its website
- allow the system to learn business information
- review/correct important information
- test the assistant
- install the website widget
- allow visitors to ask questions
- receive accurate AI answers
- capture enquiries
- receive enquiries outside the platform
- teach the assistant unanswered information
- view simple evidence that the assistant is doing useful work

Anything that is not necessary to prove this should be questioned before being built.

---

# 18. Explicitly Out of Scope for MVP

The following features should not be built during the initial product unless we deliberately revise this document based on real evidence:

- traditional shared inbox
- live-agent chat dashboard
- CRM pipeline
- complex lead management
- WhatsApp AI
- Instagram DM AI
- Facebook Messenger
- voice assistant
- phone-call AI
- automated confirmed bookings
- advanced booking engine
- complex workflow builder
- Zapier-style automation builder
- advanced analytics suite
- employee productivity monitoring
- complex team permissions
- multi-channel support center
- extensive AI model configuration
- dozens of widget customization settings
- custom reports
- native mobile applications

These may become future products or features.

They are not required to validate the core idea.

---

# 19. Success Metrics

The most meaningful product metrics are not page views inside our dashboard.

We care about whether the assistant removes work and creates value.

Important metrics include:

percentage of visitor questions answered without human involvement

number of useful enquiries captured

percentage of conversations requiring owner intervention

number of unanswered questions

owner corrections required over time

time from signup to live assistant

widget installation completion rate

number of businesses actively running the assistant

business retention

willingness to pay

The strongest long-term metric is:

> How much useful customer communication does the assistant handle without requiring the business owner's time?

---

# 20. Product Rules

These rules are permanent unless `PRODUCT.md` is deliberately revised.

1. The product must reduce work for the business owner.

2. No feature should exist simply because competing SaaS products have it.

3. We do not build a traditional Inbox as a core feature.

4. We do not require business owners to stay logged into the platform.

5. Enquiries should reach businesses through channels they already use.

6. AI complexity must stay behind the interface.

7. Strong defaults are preferred over configuration.

8. New navigation items require strong justification.

9. We design the workflow before designing visual screens.

10. We design visual screens before implementing them.

11. We finish and approve one product area before redesigning another.

12. Every implementation task must have a clear scope and acceptance criteria.

13. AI must not fabricate business information.

14. The product should gracefully say “I don't know.”

15. A feature that makes the owner manage more software must provide enough value to justify that cost.

---

# 21. Product Test

Whenever we are uncertain about a feature, ask:

> If we remove this feature, can the AI still successfully handle customers for the business?

If yes, it may not belong in the MVP.

Also ask:

> Will this feature make the owner open our application more often?

If yes, determine whether that is genuinely necessary.

The goal is not maximum engagement with our dashboard.

The goal is maximum value with minimum management.

---

# 22. Long-Term Direction

The long-term vision can become larger than the initial website assistant.

Potential future capabilities may include:

WhatsApp, Instagram, CRM integration, reservation-system integration, live availability, ecommerce integration, appointment booking, voice, phone calls, multilingual businesses, team collaboration, advanced automation, and deeper analytics.

However, expansion must happen outward from a strong core.

The first product must succeed as:

> A simple AI employee for your website.

We earn complexity.

We do not start with it.