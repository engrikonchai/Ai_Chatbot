# DESIGN.md

## Status

This design direction is **approved**.

Do not redesign the product unless explicitly instructed.

Implementation should follow this document together with:

- `PRODUCT.md`
- `OWNER-JOURNEY.md`
- `SCREENS.md`
- `WIREFRAMES.md`
- `DESIGN-DIRECTION.md`

If implementation choices conflict with these documents, preserve the product philosophy and simplicity described here.

---

# 1. Product Design Philosophy

This product is not a traditional SaaS dashboard.

It is a responsive web product where a business owner sets up an AI assistant for their website, installs it, and ideally rarely needs to return.

The assistant should feel like:

> A quiet employee that handles things for the business.

The owner should not feel like they are managing software.

The core mental model is:

> Hire it → teach it → install it → occasionally correct it.

The interface should reinforce:

> The assistant works for the business. The business should not work for the assistant.

---

# 2. Approved Visual Direction

The approved direction is:

## Colleague × Paper

The target feeling is:

> Warm enough to feel like an employee.  
> Restrained enough to feel premium.  
> Precise enough to trust with a business.

The final design combines:

- Colleague’s warmth and conversational personality
- Paper’s restraint and editorial hierarchy
- only a small amount of structured precision where functionality requires it

Do not reintroduce the Signal-style dashboard language as the default.

---

# 3. Visual Personality

The interface should feel:

- calm
- premium
- warm
- intelligent
- trustworthy
- lightweight
- human
- deliberate

It should NOT feel like:

- CRM software
- customer-support software
- enterprise admin
- analytics software
- developer tooling
- generic AI SaaS
- an app-store mobile application

This is a responsive website.

---

# 4. Color System

Primary background:

Warm off-white / neutral.

Approved visual direction currently uses approximately:

`#F7F5F1`

Primary text:

Deep warm charcoal.

Approximately:

`#23211E`

Secondary text:

Muted warm gray.

Approximately:

`#6F6A63`

Primary accent:

Muted moss green.

Approximately:

`#57644A`

The moss accent communicates:

- active
- ready
- successful
- primary positive action

Attention color:

Muted ochre.

Use only for:

- assistant needs help
- unresolved question
- verification attention
- non-critical issues requiring owner input

Do not use loud warning orange or red unless there is an actual error or destructive situation.

Avoid:

- generic SaaS blue as the dominant brand color
- AI purple gradients
- neon colors
- large gradients
- decorative color noise

---

# 5. Typography

Approved typography:

## Source Serif 4

Use primarily for:

- assistant voice
- major narrative statements
- important onboarding moments
- success / attention messaging

Examples:

> Everything is handled.

> Your assistant needs your help with one thing.

> Let’s build your assistant.

> I’m ready when you are.

> I’m on your website.

Serif typography represents the assistant speaking to the owner.

---

## Figtree

Use for:

- navigation
- labels
- forms
- buttons
- settings
- descriptions
- knowledge information
- normal product UI

Figtree represents the interface.

---

## Important Rule

Do not overuse the serif.

The product should not become a magazine or luxury editorial website.

Use serif when the assistant is effectively “speaking.”

Use Figtree for functional UI.

---

# 6. Layout

Prefer strong vertical reading order.

Most pages should follow:

```text
Current state / primary message

Main task or action

Supporting information

Secondary controls
```

Do not fill empty desktop space simply because space exists.

Whitespace is part of the design.

Do not automatically split every desktop screen into multiple columns.

Use columns only when they improve the task.

---

# 7. Content Width

Core product content should usually remain comfortably contained.

Do not stretch normal text and controls across the entire viewport.

The approved desktop concepts often use content starting around the left-middle portion of a 1440px screen rather than centering huge dashboard grids.

Exact implementation dimensions may adapt responsively.

Preserve the visual balance rather than copying pixel values blindly.

---

# 8. Navigation

Primary product navigation:

- Home
- Assistant
- Website

Settings/account is secondary through the profile/account area.

Approved desktop navigation:

lightweight horizontal top navigation.

Do not introduce a permanent enterprise sidebar.

Do not add product areas such as:

- Inbox
- Leads
- Knowledge
- Analytics
- Channels
- Team

unless the product specification is explicitly changed later.

---

# 9. Cards and Surfaces

Cards are not the default layout primitive.

Prefer:

- whitespace
- typography
- hairline dividers
- natural grouping

Use a contained surface only when it improves understanding.

Good examples:

- chat/widget preview
- active attention question
- code snippet
- focused interactive area

Bad examples:

- every metric inside a separate card
- every setting inside a panel
- every knowledge category inside a box

---

# 10. Corners

Use restrained rounding.

Typical direction:

- buttons: approximately 6px
- inputs: approximately 8px
- contained surfaces: approximately 8px

Do not use giant rounded cards everywhere.

Do not default to pill-shaped controls.

---

# 11. Shadows

Use very little shadow.

Prefer borders, spacing and hierarchy.

Shadows are reserved for genuine elevation or layered UI.

Avoid floating-dashboard aesthetics.

---

# 12. Buttons

One clear primary action should normally dominate a section.

Primary buttons should use clear verbs.

Good:

- Analyze website
- Teach assistant
- Test assistant
- Scan website again
- Check installation
- Go live

Avoid vague labels such as:

- Submit
- Manage
- Proceed
- Configure

Primary actions may use moss where appropriate.

Neutral/dark actions may be used when stronger contrast is needed.

---

# 13. Home

Home is not a dashboard.

Home answers only:

1. Is the assistant working?
2. What useful work did it do?
3. Does anything need the owner?

Normal state should prominently communicate:

> Everything is handled.

Statistics are secondary and should preferably read naturally.

Example:

> This week it handled 42 conversations, captured 7 enquiries and answered 91% without you.

Do not create KPI card grids.

---

# 14. Home Attention State

When the assistant needs help, the owner should solve the problem directly on Home.

Example:

> Your assistant needs your help with one thing.

Visitor question:

> Do you offer airport transfers?

Owner answers naturally:

> Yes, airport transfers cost €25 each way.

Action:

**Teach assistant**

Do not route this through:

Inbox → conversation → knowledge → edit → save.

The correction should happen directly.

---

# 15. Assistant Screen

The Assistant screen should feel like checking and teaching an employee.

Core functions:

- Test assistant
- Teach assistant
- Resolve uncertain information
- Inspect what the assistant knows

Approved style:

> Knows your business well.  
> Still learning two things.

Knowledge should be displayed in readable groups such as:

- Business details
- Services
- Pricing
- Policies
- Common questions

Avoid CRUD tables.

Avoid technical AI terminology.

Avoid:

- embeddings
- chunks
- vectors
- system prompts
- retrieval confidence
- model settings

---

# 16. Teaching

Teaching should primarily use natural language.

Example:

> Tell your assistant something customers should know.

Input:

> We are closed every Monday during winter.

Action:

**Teach assistant**

The system should organize this information internally.

Do not ask the owner to select:

- category
- tags
- source
- knowledge type
- status
- metadata

unless genuinely necessary later.

---

# 17. Onboarding

Onboarding hides the main product navigation.

Only show:

- brand
- current task
- quiet progress/step indicator where useful

Each screen should focus on one main job.

Approved flow:

1. Add website
2. Learn from website
3. Review important information
4. Enquiry destination
5. Test assistant
6. Widget customization
7. Installation
8. Verification
9. Go live

The owner should feel:

> The system is doing the setup for me.

Not:

> I am configuring an AI platform.

---

# 18. Website Analysis

Use conversational progress language.

Examples:

> Learning about your business...

> Reading your services...

> Checking your prices and policies...

Avoid technical scraping terminology.

Do not show crawler logs.

---

# 19. Review Information

Only show important information requiring verification.

Do not dump every scraped fact.

Use simple questions such as:

> Is this right?

Allow quick corrections.

Owner-confirmed information should remain authoritative if future website content conflicts with it.

---

# 20. Test Assistant

Testing should feel close to the actual visitor experience.

Owner can ask real questions.

Wrong answer:

> Not correct?

Then allow correction inline.

Unknown answer:

allow the owner to teach the assistant immediately.

Do not send the owner to another screen.

---

# 21. Widget Customization

Keep controls limited.

MVP controls may include:

- assistant name
- welcome message
- primary color
- position
- optional logo if simple

Good defaults should be chosen automatically.

The user should be able to continue without changing anything.

Do not expose advanced styling controls.

---

# 22. Installation

Installation should be understandable by a non-technical owner.

Support platform guidance such as:

- Any website
- WordPress
- Wix
- Squarespace
- Shopify

Exact implementation instructions must be technically correct for the chosen platform.

Do not assume direct theme-file editing is the canonical method.

Provide:

- script
- copy action
- simple instructions
- check installation
- ability to send instructions to whoever manages the site

Also provide:

**I’ll install it later**

Installation must not trap the owner inside onboarding.

---

# 23. Verification

Success language:

> Found it. I’m on your website.

Failure language:

> I can’t see myself on your website yet.

Failures should remain calm and actionable.

Do not expose:

- HTTP status codes
- stack traces
- raw network errors

Explain that the business website itself remains unaffected.

---

# 24. Go Live

Before activation, present a simple summary.

Example:

Website  
lakesideguesthouse.com, installed

Enquiries go to  
owner@example.com

If I’m unsure  
I’ll ask for your help

Primary action:

**Go live**

Successful activation:

> You’re all set.

> I’m answering visitors now. I’ll only ask you when I need help.

Do not launch a feature tour immediately afterwards.

---

# 25. Website Screen

Website hierarchy must remain small:

1. live / installation status
2. appearance
3. installation
4. website scan

Example:

> I’m on your website.

Then:

Appearance  
Teal, bottom right...

Installation  
Added to your website...

Website scan  
Last scanned: Monday  
Scan website again

Do not expand Website into an integration dashboard.

---

# 26. Product Claims

The UI must not invent backend capabilities.

Do not claim functionality unless it exists.

Examples:

Do not say:

> I scan your website every week.

unless automatic scheduled scanning is implemented.

Do not say:

> Checked on all 12 pages.

unless all 12 pages were genuinely verified.

Do not promise a notification channel unless that channel is implemented.

Visual mockups must not silently define backend behavior.

---

# 27. Assistant Presence

The small circular assistant-presence symbol may be used as a subtle recurring motif.

It must remain:

- abstract
- minimal
- understated

It must not become:

- cartoon character
- face
- mascot
- animated blob
- decorative gimmick

Its exact final branding can evolve later.

---

# 28. Responsive Web

The product is a responsive website.

It is NOT:

- a native application
- a downloadable desktop app
- a PWA requirement
- an App Store product

Desktop should be intentionally designed.

Mobile should adapt intelligently.

Do not simply scale desktop layouts down.

On mobile, prioritize:

- checking Home
- resolving an attention item
- teaching assistant
- testing assistant
- simple Website status/actions

Installation may naturally be easier on desktop, but must still be readable on mobile.

---

# 29. Motion

Motion should be subtle and functional.

Good uses:

- resolving an attention item
- onboarding transitions
- assistant response
- successful teaching
- verification success
- widget opening

Avoid decorative motion.

Transitions should feel immediate.

---

# 30. Anti-Patterns

Do not introduce without explicit approval:

- permanent sidebar
- dashboard KPI grid
- unread-chat badge
- CRM pipeline
- conversation queue
- dense analytics
- ticket statuses
- large data tables
- complex filters
- model selector
- prompt editor
- advanced AI settings
- giant settings area
- card-heavy admin template
- generic AI gradients

---

# 31. Decision Rule

Whenever implementation requires choosing between:

A more complex interface that exposes system capability

and

A simpler interface that lets the assistant handle complexity internally

prefer the simpler interface.

Ask:

> Does this reduce work for the owner?

If not, question whether it belongs in the product.

---

# 32. Final Design Principle

The best interface is one the owner barely needs.

Success is not:

> “Look how much software we built.”

Success is:

> “I set it up, and it handles things for me.”