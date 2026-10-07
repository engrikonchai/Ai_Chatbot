# Screen Specification

## Purpose

This document defines the approved screens for the first version of the product.

It does not define final visual design.

It defines:

- why each screen exists
- what the owner can do there
- what information belongs there
- what must not appear there
- important loading, empty and error states

If a future feature requires a new screen or major navigation item, it must be justified against `PRODUCT.md`.

---

# 1. Product Structure

The product is divided into three areas:

## Public

- Landing
- Sign Up
- Log In

## Initial Setup

- Add Website
- Website Analysis
- Review Information
- Enquiry Setup
- Test Assistant
- Widget Setup
- Installation
- Go Live

## Main Product

- Home
- Assistant
- Website
- Settings

The main product should not expand into a large collection of modules.

---

# 2. Landing Page

## Purpose

Explain the product quickly and encourage the business owner to create an assistant.

The visitor should understand the main idea within several seconds.

## Core Message

The website gets an AI assistant that can:

- answer customer questions
- learn the business
- collect enquiries
- reduce repetitive communication

## Primary Action

**Build my assistant**

## Secondary Action

**See how it works**

## Suggested Content

- simple hero
- short explanation of the workflow
- example assistant interaction
- benefits
- simple installation explanation
- pricing later when defined
- final call to action

## Must Not Become

- giant SaaS feature comparison
- enterprise product page
- technical AI explanation
- long list of integrations
- dashboard screenshot gallery

The product should feel simple before signup.

---

# 3. Sign Up

## Purpose

Create an account with minimal friction.

## Inputs

- name
- email
- password

Alternative authentication methods may be added later.

## Primary Action

**Create account**

## After Success

Immediately continue to assistant setup.

Do not send a new user to an empty Home screen.

## Must Not Ask For

- business address
- business category
- employee count
- phone number
- pricing plan selection
- AI preferences
- dozens of setup fields

unless genuinely necessary.

---

# 4. Log In

## Purpose

Allow an existing owner to return.

## Inputs

- email
- password

## Primary Action

**Log in**

## Secondary Actions

- forgot password
- create account

After login:

- incomplete setup → resume setup
- completed setup → Home

---

# 5. Add Website

## Purpose

Start building the assistant with as little manual work as possible.

## Main Message

> Let’s build your assistant.

Supporting copy:

> Add your website and we’ll learn the basics about your business.

## Primary Input

Website URL

Example:

`https://yourbusiness.com`

## Primary Action

**Analyze website**

## Secondary Path

Potential future option:

**I don’t have a website**

Do not make this path visually compete with the primary journey during MVP.

## Error States

### Invalid URL

Explain the problem simply.

### Website unreachable

Offer:

- retry
- check URL
- continue manually later if supported

---

# 6. Website Analysis

## Purpose

Show that the system is doing the setup work for the owner.

This screen should feel active but calm.

## Suggested Progress

- Reading your website
- Learning about your services
- Finding opening hours
- Checking prices and policies
- Preparing your assistant

## Important

Do not show technical implementation terms.

Never show:

- embeddings
- chunks
- crawler queue
- token count
- vector index
- model names

## Failure State

If analysis cannot complete:

> We couldn’t learn enough from your website automatically.

Provide a clear next step rather than a technical error.

---

# 7. Review Information

## Purpose

Allow the owner to verify only information that genuinely matters.

This is **not** a knowledge-management screen.

## Header

Example:

> We learned a lot about your business.

Then:

> We just need you to check a few things.

## Information Types

### Already understood

Summarize these without requiring individual approval.

Example:

✓ Location  
✓ Contact information  
✓ Opening hours  
✓ Services  

### Needs verification

Show important facts that could cause problems if incorrect.

Examples:

- prices
- cancellation policy
- deposits
- important service conditions
- delivery fees

Example:

> Airport transfer  
> €25 each way

Actions:

**Correct**

**Change**

### Missing

Ask natural questions.

Example:

> Are pets allowed?

Input:

`Small pets are allowed with prior approval.`

Action:

**Teach assistant**

## Primary Completion Action

**Continue**

## Must Not Contain

- giant table
- hundreds of scraped pages
- database IDs
- publish/draft statuses
- bulk CRUD interface
- folders
- source management
- complicated filtering

---

# 8. Enquiry Setup

## Purpose

Decide where customer enquiries should be delivered.

## Main Question

> Where should we send customer enquiries?

## MVP Input

Email address

## Explanation

> When someone wants to book, request a quote, or needs personal help, your assistant will collect the important details and send them here.

## Primary Action

**Continue**

## Possible Test

Send a test email if technically useful.

## Must Not Become

- workflow builder
- CRM configuration
- automation system
- notification matrix
- channel-management dashboard

---

# 9. Test Assistant

## Purpose

Give the owner confidence before installation.

This should be one of the strongest moments in onboarding.

## Layout

The actual assistant appears as it will behave for visitors.

## Heading

> Meet your assistant.

## Suggested Questions

Generated based on the business.

Examples:

- What are your opening hours?
- Do you have parking?
- What does this service cost?
- How can I book?

## Owner Can

- ask arbitrary questions
- see assistant responses
- correct a wrong answer
- teach something missing

## Wrong Answer Flow

Action near response:

**Not correct?**

Then ask:

> What should your assistant know instead?

Owner enters correction.

Action:

**Update assistant**

## Unknown Answer Flow

The assistant admits uncertainty.

Owner can immediately provide the missing information.

## Primary Completion Action

**Looks good**

## Must Not Contain

- model selector
- prompt editor
- temperature control
- system prompt
- RAG settings
- token limits

---

# 10. Widget Setup

## Purpose

Let the owner make the assistant feel appropriate for their website without overwhelming customization.

## Main Content

Large live widget preview.

## Initial Controls

- assistant name
- welcome message
- primary color
- left/right position

Optional if useful:

- business logo

## Primary Action

**Continue to installation**

## Design Rule

Every option added here increases setup complexity.

Add new customization only when there is clear value.

## Must Not Become

A complete website-builder style editor.

Avoid:

- detailed typography system
- dozens of color controls
- custom CSS editor
- animation configuration
- advanced layout settings

during MVP.

---

# 11. Installation

## Purpose

Get the assistant onto the business website.

## Main Message

> Add your assistant to your website.

## Primary Installation Method

Copy script.

Example:

```html
<script src="..."></script>
```

## Actions

**Copy code**

**Check installation**

## Supporting Instructions

Simple instructions for:

- custom website

Later:

- WordPress
- Webflow
- Wix
- Shopify

## Important

Installation instructions should be understandable without development knowledge where possible.

---

# 12. Installation Verification

This may exist as part of the Installation screen rather than a separate route.

## Checking State

> Looking for your assistant...

## Success State

> Your assistant is live.

✓ Widget detected  
✓ Assistant responding

Primary action:

**Finish setup**

## Failure State

> We couldn’t find the assistant on your website yet.

Offer:

- check installation again
- review instructions
- copy code again

Later, support/contact assistance may be added.

Do not display raw network errors.

---

# 13. Go Live

## Purpose

Create a clear completion moment.

## Message

> Your assistant is live 🎉

Supporting copy:

> It can now answer visitors, collect enquiries, and ask for your help when it genuinely needs it.

## Primary Action

**Go to Home**

## Secondary Action

**Open my website**

This screen should feel rewarding but remain simple.

---

# 14. Home

## Purpose

Answer two questions:

1. What did my assistant do?
2. Does anything need me?

Home is **not** an analytics dashboard.

## Priority Order

### 1. Things needing attention

Always highest priority when present.

Example:

> 2 things need your help

### 2. Assistant status

Example:

> Your assistant is live.

### 3. Simple activity summary

Possible metrics:

- conversations handled
- questions answered automatically
- enquiries captured
- percentage handled automatically

Keep the number of metrics small.

## Successful Empty State

The ideal state can be:

> Everything is handled.

> Nothing needs you right now.

This is a positive state, not an empty state to fill with more UI.

## New Account State

Immediately after launch:

> Your assistant is live.

0 conversations handled  
0 enquiries captured

> We’ll let you know when something needs your attention.

No empty graphs.

## Must Not Contain

- unread chat counters
- conversation queue
- sales pipeline
- dense charts
- large reporting tables
- dozens of KPI cards

---

# 15. Attention Item

Attention items may appear directly inside Home rather than having their own screen.

## Example — Missing Answer

> Customers are asking:

> “Do you offer airport transfers?”

Supporting text:

> Your assistant doesn’t know yet.

Input:

`Yes, airport transfers are €25 each way.`

Action:

**Teach assistant**

After completion:

- item disappears or moves into completed state
- future conversations use the new knowledge

## Example — Conflicting Information

> We found two different check-in times on your website.

Options:

**2 PM**

**3 PM**

**Enter another answer**

Action:

**Confirm**

## Principle

Attention items must result in a clear action.

Do not create vague alerts the owner cannot resolve.

---

# 16. Assistant

## Purpose

Answer:

- What does my assistant know?
- Is anything missing?
- Can I test it?
- Can I teach it something?

## Main Sections

### Test assistant

Prominent entry point.

### Needs your help

Only shown when relevant.

### What your assistant knows

Use understandable categories.

Examples:

**Business details**

**Services**

**Pricing**

**Policies**

**Frequently asked questions**

Each category should show a summary rather than immediately exposing every individual record.

### Teach assistant

Simple natural-language input:

> Tell your assistant something customers should know.

Example:

`We are closed every Monday during winter.`

Action:

**Teach assistant**

## Optional Detail

The owner may open a category to inspect information if necessary.

However, avoid turning this into a CRUD database.

## Must Not Contain

- vector source configuration
- publish workflows
- folders
- complex content states
- AI model configuration
- prompt engineering controls

---

# 17. Assistant Test Mode

Test mode may open inside Assistant as an expanded panel, full-screen view or focused page.

It should use the same core assistant behaviour as the real widget.

The owner can:

- send questions
- inspect answers
- correct answers
- teach missing knowledge

There should be a clear visual indication that this is a private test and not a real customer conversation.

---

# 18. Website

## Purpose

Manage the website-facing assistant.

## Sections

### Status

Example:

> Live on yourbusiness.com

### Preview

Interactive widget preview.

### Appearance

Limited options:

- assistant name
- greeting
- primary color
- position

### Installation

- installation code
- platform instructions
- verification status

### Website knowledge

Possible action:

**Scan website again**

This checks for new or changed information.

## Must Not Become

A channels dashboard.

The MVP is website-first.

Do not add empty cards for Instagram, WhatsApp, Messenger, etc.

---

# 19. Settings

## Purpose

Secondary account and business configuration.

Settings is not part of the daily product experience.

## Possible Sections

### Business

- business name
- website
- contact details

### Enquiries

- delivery email

### Account

- name
- email
- password/security

### Notifications

Only meaningful notification preferences.

### Billing

When pricing is implemented.

### Privacy / Data

- retention information
- deletion
- data controls

### Advanced

Only if genuinely needed later.

## Must Not Contain

Core product functionality that belongs in Home, Assistant or Website.

---

# 20. Navigation

Once onboarding is finished, primary navigation should contain:

**Home**

**Assistant**

**Website**

Settings should be accessible through account/profile controls.

## Desktop

Do not automatically use a traditional enterprise sidebar.

Possible navigation styles can be explored during visual design.

## Mobile

Navigation should remain extremely simple.

Possible patterns:

- compact bottom navigation
- simple menu
- top navigation

Final pattern will be decided during design.

## Rule

Adding a fourth primary navigation item requires product justification.

---

# 21. Global States

Every important screen must eventually define:

## Loading

Use meaningful language where possible.

## Empty

An empty state should explain what happens next.

## Error

Use calm, human-readable messages.

## Success

Confirm what changed.

## Offline / network failure

Never silently lose owner input.

## Mobile

No critical action should require desktop.

---

# 22. Global Language Rules

Prefer:

> Teach assistant

instead of:

> Add knowledge item

Prefer:

> Your assistant doesn’t know this yet.

instead of:

> Low confidence retrieval failure

Prefer:

> Check installation

instead of:

> Verify script injection

Prefer:

> Things that need your help

instead of:

> Action center

Prefer:

> Enquiry

instead of:

> CRM lead

The UI should describe what is happening in normal business language.

---

# 23. Screens We Are Intentionally NOT Building

The MVP does not have:

- Inbox
- Chats
- Tickets
- Leads
- CRM
- Knowledge CRUD
- Analytics dashboard
- Channels dashboard
- Team management
- Automation builder
- Workflow editor
- AI settings console
- prompt editor

These may only appear later if real customer usage justifies them.

---

# 24. Screen Creation Rule

Before creating any new screen, answer:

1. What owner problem does this solve?
2. Why can it not fit naturally into an existing screen?
3. Will the owner need to visit this screen regularly?
4. Does it reduce owner work?
5. Does it move the product toward becoming another SaaS dashboard?

If the answer to question 5 is yes, reconsider the feature.

---

# 25. Approved MVP Screen Set

The approved screen set is:

### Public

1. Landing
2. Sign Up
3. Log In

### Setup

4. Add Website
5. Website Analysis
6. Review Information
7. Enquiry Setup
8. Test Assistant
9. Widget Setup
10. Installation / Verification
11. Go Live

### Main Product

12. Home
13. Assistant
14. Website
15. Settings

Some setup steps may eventually be combined into fewer visual screens if testing shows that creates a better experience.

The number of routes is not important.

The simplicity of the owner's experience is.

---

# 26. Phase 2B Approval Test

Before detailed UI design begins, we should be able to look at this screen set and say:

- every screen has one clear purpose
- the owner always knows the next action
- no screen exists just because SaaS products usually have it
- there is no Inbox
- there is no CRM workflow
- knowledge feels like teaching an assistant
- setup does most of the work automatically
- the returning experience is extremely lightweight
- the owner can leave the application once their task is complete

Once this screen structure is approved, we can begin defining the visual and interaction direction.