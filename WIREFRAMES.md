# Phase 3 — UX Wireframes

These wireframes define hierarchy, interaction and information architecture.

They are intentionally not visual designs.

Do not choose final colors, typography, shadows, animations, illustration styles or detailed component styling yet.

The goal is to make every screen feel obvious before making it beautiful.

---

# Screen 1 — Home

## Core Purpose

Home answers only:

1. Is my assistant working?
2. Did it do anything useful?
3. Does anything need me?

The owner should be able to understand the entire screen in approximately five seconds.

Home should never feel like a dashboard that needs monitoring.

---

# Default Returning State

The ideal Home screen is extremely calm.

Wireframe:

```text
┌──────────────────────────────────────────────┐
│                                              │
│  Good morning, Alex                         │
│                                              │
│  Everything is handled.                     │
│  Your assistant is live and nothing         │
│  needs your attention right now.            │
│                                              │
│  ● Live on example.com                      │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  This week                                  │
│                                              │
│  42                  7                       │
│  conversations       enquiries              │
│  handled             captured               │
│                                              │
│  91%                                         │
│  answered without you                       │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  Recent activity                            │
│                                              │
│  Today                                      │
│  8 conversations handled                    │
│  2 enquiries captured                       │
│                                              │
│  Yesterday                                  │
│  11 conversations handled                   │
│  1 enquiry captured                         │
│                                              │
└──────────────────────────────────────────────┘
```

This state should communicate success through **absence of work**.

Do not fill empty space with unnecessary charts or cards.

---

# Home With Attention Needed

When the assistant needs something from the owner, this becomes the highest-priority content on the page.

Wireframe:

```text
┌──────────────────────────────────────────────┐
│                                              │
│  Good morning, Alex                         │
│                                              │
│  Your assistant needs your help             │
│  with 2 things.                             │
│                                              │
│  ● Live on example.com                      │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  Needs your help                            │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ Customers are asking                  │ │
│  │                                       │ │
│  │ “Do you offer airport transfers?”     │ │
│  │                                       │ │
│  │ Your assistant doesn't know yet.      │ │
│  │                                       │ │
│  │ [ Type your answer...              ]  │ │
│  │                                       │ │
│  │                         Teach assistant│ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ Check this information                │ │
│  │                                       │ │
│  │ We found two different check-in      │ │
│  │ times on your website.               │ │
│  │                                       │ │
│  │ ○ 2 PM        ○ 3 PM                 │ │
│  │                                       │ │
│  │                         Confirm        │ │
│  └────────────────────────────────────────┘ │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  This week                                  │
│                                              │
│  42 conversations   7 enquiries            │
│  89% handled automatically                  │
│                                              │
└──────────────────────────────────────────────┘
```

The owner should be able to fix the problem **without navigating somewhere else**.

This is important.

Do not make the owner:

Home → notification → Assistant → Knowledge → edit item → save → back.

They should simply answer the question directly.

---

# New Assistant State

Immediately after going live, there will be little or no data.

Do not show six cards containing zero.

Wireframe:

```text
┌──────────────────────────────────────────────┐
│                                              │
│  Your assistant is live.                    │
│                                              │
│  ● Live on example.com                      │
│                                              │
│  It can now answer visitors and collect     │
│  enquiries for you.                         │
│                                              │
│  We'll let you know when something needs    │
│  your attention.                            │
│                                              │
│  [ Test assistant ]                         │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  No activity yet                            │
│                                              │
│  When visitors start talking to your        │
│  assistant, you'll see a simple summary     │
│  here.                                      │
│                                              │
└──────────────────────────────────────────────┘
```

The absence of data should not make the product look unfinished.

---

# Assistant Offline / Problem State

If something important is wrong, Home should say so clearly.

Example:

```text
┌──────────────────────────────────────────────┐
│                                              │
│  Your assistant isn't active right now.     │
│                                              │
│  We can no longer detect the widget on      │
│  example.com.                               │
│                                              │
│  Your website itself is not affected.       │
│                                              │
│  [ Check installation ]                     │
│                                              │
└──────────────────────────────────────────────┘
```

Avoid:

- error codes
- technical logs
- scary red dashboards
- vague “system degraded” messages

Tell the owner what happened and what to do.

---

# Information Hierarchy

Home should follow this order:

## 1. Current state

Examples:

**Everything is handled.**

or

**Your assistant needs your help with 2 things.**

or

**Your assistant isn't active.**

This is the most prominent message.

---

## 2. Attention

Only appears when necessary.

Attention items should be actionable directly from Home.

---

## 3. Simple outcome numbers

Keep this intentionally small.

Recommended initial metrics:

**Conversations handled**

How many visitor conversations the assistant handled.

**Enquiries captured**

How many visitors became useful enquiries.

**Handled automatically**

Percentage of conversations completed without requiring business input.

Do not add metrics just because we can measure them.

---

## 4. Lightweight activity

The owner may want some confidence that the assistant is actually being used.

Show summarized activity.

Examples:

> 8 conversations handled today.

> 2 enquiries captured.

> Learned a new answer from you.

Avoid displaying a full customer-message feed.

---

# What Home Does NOT Show

Do not show:

- unread conversations
- individual conversation list
- visitor names unless associated with a useful enquiry
- ticket statuses
- sales pipeline
- conversation assignment
- response time leaderboard
- employee performance
- AI token usage
- model costs
- massive charts
- hourly graphs
- channel breakdowns
- customer-support KPIs

Home is about **confidence and exceptions**, not surveillance.

---

# Navigation Concept

For now, assume simple top-level navigation:

```text
Logo          Home   Assistant   Website              Profile
```

Do not lock the final navigation design yet.

We will decide during visual design whether this becomes:

- compact top navigation
- minimal rail
- another lightweight pattern

We should avoid a large traditional SaaS sidebar unless there is a strong UX reason for one.

---

# Desktop Layout Principle

Do not create a grid of twelve independent cards.

Prefer a strong vertical reading order:

```text
Status / greeting

Attention
(if required)

Simple results

Recent summary
```

The page should feel like reading a short update from your AI employee.

---

# Mobile Layout

The same hierarchy should work naturally in one column.

Example:

```text
Everything is handled.

● Assistant live

This week

42
conversations

7
enquiries

91%
handled automatically

Recent activity
...
```

Attention items become full-width cards with large inputs and controls.

No information should disappear merely because the owner is on mobile.

---

# Interaction Rules

## Teach assistant

When the owner submits an answer:

1. button enters loading state
2. information is saved
3. success is confirmed
4. attention item resolves
5. item gently disappears or collapses
6. remaining attention count updates

Do not immediately redirect somewhere else.

---

## Resolve conflicting information

After selection:

1. save the owner's chosen answer
2. update knowledge
3. resolve the item
4. confirm success

Again, no navigation required.

---

# Tone

Home should sound like an assistant reporting back to its owner.

Prefer:

> Everything is handled.

> Your assistant answered 42 conversations this week.

> One question needs your help.

> Your assistant is live.

Avoid:

> Dashboard overview

> Action center

> Ticket resolution

> Knowledge confidence warning

> Conversation analytics

---

# Home UX Principle

The best possible Home screen is one the owner looks at for ten seconds and then closes.

That is success.

We are deliberately not optimizing for time spent in the application.


# Screen 2 — Assistant

## Core Purpose

The Assistant screen answers:

1. What does my assistant know?
2. Does it need to learn anything?
3. Can I test it?
4. Can I quickly teach it something?

This screen should feel like managing an employee's understanding, not managing a database.

---

# Default Assistant State

Wireframe:

```text
┌──────────────────────────────────────────────┐
│                                              │
│  Assistant                                  │
│  Everything your assistant knows about      │
│  your business.                             │
│                                              │
│  [ Test assistant ]                         │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  Teach your assistant                       │
│                                              │
│  Tell it something customers should know.   │
│                                              │
│  [ We are closed every Monday...         ]  │
│                                              │
│                         [ Teach assistant ]  │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  What your assistant knows                  │
│                                              │
│  Business details                     →     │
│  Address, contact information, hours         │
│                                              │
│  Services                             →     │
│  8 services understood                      │
│                                              │
│  Pricing                              →     │
│  6 prices understood                        │
│                                              │
│  Policies                             →     │
│  Cancellation, pets, payment...              │
│                                              │
│  Common questions                     →     │
│  14 answers learned                          │
│                                              │
└──────────────────────────────────────────────┘
```

The page should feel calm.

The owner should not initially see hundreds of rows.

---

# Needs Help State

If there are things the assistant is unsure about, surface them before the knowledge summary.

```text
┌──────────────────────────────────────────────┐
│                                              │
│  Assistant                                  │
│                                              │
│  [ Test assistant ]                         │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  2 things need your help                    │
│                                              │
│  “Do you provide airport pickup?”           │
│                                              │
│  [ Type your answer...                   ]  │
│                         [ Teach assistant ]  │
│                                              │
│  ─────────────────────────────────────────   │
│                                              │
│  We found two cancellation policies.        │
│                                              │
│  ○ Free cancellation up to 3 days before   │
│  ○ Free cancellation up to 5 days before   │
│                                              │
│                              [ Confirm ]      │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  Teach your assistant                       │
│  ...                                        │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  What your assistant knows                  │
│  ...                                        │
│                                              │
└──────────────────────────────────────────────┘
```

This should use the same attention model as Home.

Home shows important exceptions.

Assistant gives the owner a place to inspect and improve things intentionally.

---

# Test Assistant

Testing should be one of the most prominent actions on the page.

When clicked, open a focused test experience.

Possible wireframe:

```text
┌──────────────────────────────────────────────┐
│  ← Back                         Test mode    │
├──────────────────────────────────────────────┤
│                                              │
│             Your assistant                   │
│                                              │
│  Ask it anything a customer might ask.      │
│                                              │
│                ┌──────────────────────────┐  │
│                │ Hi! How can I help?     │  │
│                └──────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │ Do you have parking?                │    │
│  └──────────────────────────────────────┘    │
│                                              │
│                ┌──────────────────────────┐  │
│                │ Yes, free parking is    │  │
│                │ available for guests.   │  │
│                └──────────────────────────┘  │
│                                              │
│                     [ Not correct? ]         │
│                                              │
│  [ Ask your assistant...                 ]  │
│                                     [ Send ] │
│                                              │
└──────────────────────────────────────────────┘
```

This should feel very close to the actual website widget.

The owner is effectively pretending to be a customer.

---

# Correcting a Wrong Answer

When the owner taps:

**Not correct?**

Do not send them to another screen.

Show a small inline correction area.

```text
The assistant said:

“Parking is free.”

What should it know instead?

[ Parking costs €5 per day.                 ]

                         [ Update assistant ]
```

After save:

> Updated. Your assistant will use this from now on.

The original conversation can continue.

---

# Unknown Answer During Testing

Example:

Owner asks:

> Do you offer airport transfers?

Assistant:

> I don't have information about airport transfers yet.

Then show:

```text
Teach your assistant

[ Yes, airport transfers cost €25 each way. ]

                         [ Teach assistant ]
```

Once saved, the owner can ask the same question again.

The corrected answer should now be used.

That creates a strong feeling that the owner is genuinely training the assistant.

---

# Teach Assistant

This should be the easiest way to add new information manually.

The owner does not choose:

- type
- category
- folder
- source
- status
- tags

They just write something.

Example:

```text
Tell your assistant something customers should know.

[ Our kitchen closes at 10:30 PM.          ]

                         [ Teach assistant ]
```

The system decides internally how to store and organize it.

---

# Teaching Success

After submission:

```text
✓ Learned

“Our kitchen closes at 10:30 PM.”
```

Then the input clears.

Optionally show:

**Test this**

which opens test mode with a suggested question.

Example:

> What time does the kitchen close?

This makes teaching feel tangible.

---

# What Your Assistant Knows

This is not a traditional Knowledge Base.

The default view should show categories and summaries.

Example:

```text
What your assistant knows

Business details
Location, phone, hours
                               →

Services
Apartment rental, transfers...
                               →

Pricing
Room rates, transfers, extras
                               →

Policies
Cancellation, pets, check-in
                               →

Common questions
Parking, Wi-Fi, breakfast...
                               →
```

The owner should understand the overall knowledge without seeing implementation details.

---

# Opening a Knowledge Category

If the owner opens **Policies**, show readable information.

```text
← Assistant

Policies

Cancellation

Free cancellation up to 3 days before arrival.

Owner confirmed
Updated Sep 18


Pets

Small pets are allowed with prior approval.

From your website
Checked Sep 17


Check-in

From 2 PM.

Owner confirmed
Updated Oct 2
```

The goal is inspection and correction.

Not database management.

---

# Editing Existing Information

When the owner taps a fact:

```text
Check-in

Your assistant currently knows:

“Check-in starts at 2 PM.”

[ Edit ]
```

Editing opens a very simple input.

```text
[ Check-in starts at 3 PM. ]

[ Save ]
```

No complex metadata form.

Internally the system can update provenance and versioning.

---

# Source Transparency

We should provide enough source information to create trust, but not clutter.

Useful source labels:

- From your website
- You taught this
- You confirmed this
- Updated from your website

Avoid technical source labels.

Never show:

- chunk ID
- embedding source
- vector document
- retrieval confidence 0.84

---

# Search

Do not add search automatically.

For an MVP with a relatively small knowledge set, categories may be enough.

If real testing shows owners struggle to find information, search can be added later.

Do not build features because we assume they will eventually be necessary.

---

# Re-scan Relationship

The Assistant screen should not own website crawling.

Website → **Scan website again**

Assistant → shows the resulting knowledge.

If a re-scan finds changes that matter, those can become attention items.

Example:

> Your website now lists airport transfer at €30.  
> You previously told your assistant €25.

Then ask the owner which is correct.

---

# Assistant Personality

The MVP should not expose a giant AI configuration page.

If basic behavior customization becomes necessary, keep it small.

Potential future options:

**Tone**

- Friendly
- Professional
- Casual

**Answer length**

- Short
- Balanced
- Detailed

But do not add these until we know businesses need them.

The assistant should have a strong good default.

---

# No Prompt Editor

The owner should never need to write:

> You are a helpful AI assistant...

There should be no visible system prompt in the MVP.

Product behavior belongs to our system.

Business information belongs to the owner.

Those are different things.

---

# Mobile

Mobile should preserve the same vertical hierarchy:

```text
Assistant

[Test assistant]

Needs your help
...

Teach assistant
[                    ]
[Teach]

What it knows

Business details  →
Services          →
Pricing           →
Policies          →
Common questions  →
```

Test mode can become a full-screen mobile chat experience.

Inputs should remain comfortably usable with the keyboard open.

---

# Assistant Screen Must Not Become

- Knowledge Base admin
- CMS
- document manager
- AI playground
- prompt editor
- model dashboard
- file repository
- database viewer
- giant FAQ table

The screen exists to help the owner think:

> “My assistant knows my business.”

Not:

> “I have to maintain my chatbot data.”


# Screen 3 — Website

## Core Purpose

The Website screen answers:

1. Is my assistant live on my website?
2. What does the widget look like?
3. How can I install, reinstall or update it?

This screen should feel more like controlling one small website feature than managing a software channel.

---

# Default Live State

Wireframe:

```text
┌──────────────────────────────────────────────┐
│                                              │
│  Website                                     │
│                                              │
│  ● Live on example.com                       │
│  Your assistant is installed and working.   │
│                                              │
│  [ Open website ]                            │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  Preview                                     │
│                                              │
│   ┌──────────────────────────────────────┐   │
│   │                                      │   │
│   │          Website preview             │   │
│   │                                      │   │
│   │                           ◉          │   │
│   │                    assistant widget  │   │
│   └──────────────────────────────────────┘   │
│                                              │
│                         [ Preview chat ]      │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  Appearance                                  │
│                                              │
│  Assistant name        [ Mira            ]   │
│                                              │
│  Welcome message                            │
│  [ Hi! How can I help you today?        ]   │
│                                              │
│  Primary color         [ ● ]                │
│                                              │
│  Position              Left     ● Right     │
│                                              │
│                              [ Save changes ]│
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  Installation                               │
│                                              │
│  Installed on                               │
│  example.com                                │
│                                              │
│  [ View installation instructions ]         │
│                                              │
│  [ Check installation ]                     │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  Website information                        │
│                                              │
│  Last scanned: Oct 6                         │
│                                              │
│  [ Scan website again ]                     │
│                                              │
└──────────────────────────────────────────────┘
```

The page should feel calm when everything is working.

The installation section should not dominate once setup is complete.

---

# Not Installed State

If the widget has not been detected:

```text
┌──────────────────────────────────────────────┐
│                                              │
│  Website                                     │
│                                              │
│  Your assistant isn't on your website yet.  │
│                                              │
│  Add one small script and we'll check that  │
│  everything is working.                     │
│                                              │
│  [ Install assistant ]                       │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  Preview                                     │
│                                              │
│  You can still customize and test the        │
│  assistant before installing it.             │
│                                              │
│  [ Preview assistant ]                       │
│                                              │
└──────────────────────────────────────────────┘
```

Do not show an alarming “offline” state if the business has simply never installed it.

---

# Installation Flow

The installation experience can open as a focused page or sheet.

Example:

```text
Install your assistant

Add this code before the closing </body> tag
on your website.

┌────────────────────────────────────────────┐
│ <script src="..."></script>                │
└────────────────────────────────────────────┘

[ Copy code ]

Using a website builder?

WordPress
Webflow
Wix
Shopify
Custom website

[ I've installed it ]
```

Platform-specific instructions should remain short and visual when possible.

The owner should never need to understand how the script itself works.

---

# Checking Installation

After clicking:

**I've installed it**

or:

**Check installation**

show:

```text
Checking your website...

Looking for the assistant on example.com
```

Then one of two states.

## Success

```text
✓ Assistant detected

Your assistant is live on example.com.

[ Open website ]
```

## Not Found

```text
We couldn't find the assistant yet.

A few things to check:

• Make sure the code was published
• Check that it was added to example.com
• Try refreshing your website

[ Check again ]

Need help?
View installation instructions
```

Do not show HTTP codes, script errors or developer logs by default.

---

# Broken Installation State

This is different from never having installed it.

If the assistant was previously detected and later disappears:

```text
Your assistant may no longer be active.

We detected it before, but we can't find it on
example.com right now.

Your website itself is still working normally.

[ Check installation ]
```

This may also surface on Home as an attention item.

---

# Preview

The preview should be interactive.

The owner should be able to:

- open the widget
- send a test message
- see the welcome state
- see changes to appearance immediately

This is primarily a visual preview.

For deeper knowledge testing, use **Assistant → Test assistant**.

Do not duplicate the entire Assistant screen here.

---

# Appearance

Keep customization intentionally limited.

Approved MVP controls:

## Assistant name

Example:

`Mira`

## Welcome message

Example:

`Hi! How can I help you today?`

## Primary color

Simple brand color.

## Position

- left
- right

Potential optional setting:

## Business logo

Only if it improves the experience without creating setup complexity.

---

# Appearance Changes

Changes should update the preview immediately.

Saving should feel simple:

1. owner changes option
2. preview updates
3. owner saves
4. live widget receives new configuration

Success message:

> Changes saved.

Do not require reinstalling the widget when appearance changes.

---

# What We Do NOT Customize in MVP

Do not expose:

- font family
- font sizes
- shadow controls
- border radius
- animation speed
- bubble dimensions
- custom CSS
- custom JavaScript
- individual button colors
- chat width
- complex positioning
- desktop/mobile-specific styling
- sound settings
- animation editor

The widget should look good by default.

---

# Website Scan

This screen owns website re-scanning.

Example:

```text
Website information

example.com

Last scanned
Oct 6

Your assistant learned from 14 pages.

[ Scan website again ]
```

The number of pages may be useful but should not feel technical.

During scan:

```text
Checking your website for updates...

You can leave this page.
```

If no meaningful changes are found:

> Everything looks up to date.

If useful changes are found:

> We found 3 updates.

Do not automatically overwrite owner-confirmed information when there is a conflict.

---

# Re-scan Conflict Example

Website now says:

> Airport transfer — €30

But the owner previously taught:

> Airport transfer — €25

Do not silently replace it.

Create an attention item:

```text
Airport transfer price changed on your website.

Your assistant currently knows:
€25

Your website now says:
€30

[ Keep €25 ]   [ Use €30 ]
```

Owner-confirmed information should remain trusted until the owner decides otherwise.

---

# Website URL Change

Changing the business website is a significant action.

Do not make it a casual text field beside appearance settings.

Place it under:

**Website settings**

Example:

```text
Website

example.com

[ Change website ]
```

Changing it should explain that the assistant may need to learn the new site.

Potential flow:

> Changing your website will scan the new site and ask you to review important differences.

Then confirm.

---

# Widget Status Language

Prefer:

> Live

> Not installed yet

> We can't detect it right now

Avoid:

> Connected / disconnected node

> Deployment failed

> Script status

> Channel unhealthy

> Integration offline

The owner cares whether the assistant works, not infrastructure terminology.

---

# Mobile

Mobile hierarchy:

```text
Website

● Live on example.com

[Open website]

Preview
[ widget preview ]

Appearance
Name
Greeting
Color
Position

[Save]

Installation
Installed ✓
[Instructions]

Website information
Last scanned...
[Scan again]
```

The widget preview should stay usable without requiring a huge desktop frame.

---

# Website Screen Must Not Become

- channels dashboard
- integration marketplace
- site builder
- developer console
- deployment dashboard
- advanced widget editor
- analytics page
- knowledge-management screen

Its job is simple:

> My assistant is on my website, it looks right, and it works.


# Onboarding Flow

## Core Goal

The onboarding should make the owner feel:

> “Most of this was done for me.”

The owner should not feel like they are configuring software.

The onboarding should move through one clear task at a time.

Avoid showing the full product navigation until setup is nearly complete.

---

# Onboarding Structure

Recommended flow:

1. Add website
2. Analyze website
3. Review important information
4. Set enquiry destination
5. Test assistant
6. Customize widget
7. Install
8. Verify
9. Go live

Each step should feel short.

Do not show a giant checklist with twenty tasks.

A simple progress indicator is enough.

Example:

```text id="8fg43x"
Step 2 of 7
──────────────●──────────────
```

Avoid percentage-heavy setup dashboards.

---

# Step 1 — Add Website

## Purpose

Start with the smallest possible action.

Wireframe:

```text id="3dd62h"
┌──────────────────────────────────────────────┐
│                                              │
│                  Logo                        │
│                                              │
│  Let's build your assistant.                 │
│                                              │
│  Start with your website. We'll learn the    │
│  basics about your business automatically.   │
│                                              │
│  Website                                     │
│  [ https://yourbusiness.com              ]   │
│                                              │
│  [ Analyze website ]                         │
│                                              │
│  No website?                                 │
│  Set up manually                             │
│                                              │
└──────────────────────────────────────────────┘
```

The manual setup path can be secondary.

Do not ask for:

- industry
- team size
- business description
- assistant name
- brand color
- pricing plan
- business address

before analysing the website.

We may learn most of that automatically.

---

# Website URL Validation

Validate gently.

If the owner types:

`myhotel.me`

normalize it automatically if possible.

Do not force them to understand protocol formatting.

Bad:

> Invalid URL format.

Better:

> We couldn't open that website. Check the address and try again.

---

# Step 2 — Website Analysis

## Purpose

Show visible progress while the system does the work.

Wireframe:

```text id="80ux5l"
┌──────────────────────────────────────────────┐
│                                              │
│  Learning about your business...             │
│                                              │
│  ✓ Found your website                        │
│  ✓ Reading your services                     │
│  ● Checking prices and policies              │
│  ○ Preparing your assistant                  │
│                                              │
│  example.com                                  │
│                                              │
│  This usually finishes automatically.        │
│                                              │
└──────────────────────────────────────────────┘
```

Use real progress when available.

Do not fake detailed progress if the backend cannot actually determine it.

---

# Analysis Success

When finished, transition directly into a positive result.

Example:

```text id="6zq0uq"
We learned the basics.

Your assistant already knows:

✓ Your business details
✓ Opening hours
✓ Services
✓ Contact information

We just need you to check a few important things.

[ Continue ]
```

This helps the owner understand that the hard part is already done.

---

# Analysis Failure

If the website cannot be read:

```text id="xpsrzb"
We couldn't learn enough from your website.

You can try again or tell us the basics yourself.

[ Try again ]

Set up manually
```

Do not strand the user.

Do not show:

- crawler failed
- HTTP 403
- timeout stack
- scraping blocked

---

# Step 3 — Review Important Information

## Purpose

Verify only the information that could cause real problems.

This should not feel like reviewing everything the system scraped.

Wireframe:

```text id="u5k3tw"
┌──────────────────────────────────────────────┐
│                                              │
│  Just a few things to check                  │
│                                              │
│  We already understood most of your          │
│  business.                                   │
│                                              │
│  3 things need your attention                │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ Airport transfer                      │  │
│  │                                       │  │
│  │ We found: €25 each way                │  │
│  │                                       │  │
│  │ [ Correct ]     [ Change ]            │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ Are pets allowed?                     │  │
│  │                                       │  │
│  │ [ Type your answer...               ] │  │
│  │                                       │  │
│  │                       [ Add answer ]   │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  [ Continue ]                                │
│                                              │
└──────────────────────────────────────────────┘
```

Keep the number of review items intentionally small.

If the system finds 50 questionable things, prioritize the most important ones rather than dumping everything on the owner.

---

# Review Interaction

For simple verification:

**Correct**

should immediately resolve the item.

For corrections:

```text id="e99ww7"
Airport transfer

Current:
€25 each way

Correct information

[ €30 each way                         ]

[ Save ]
```

Do not expose metadata.

---

# Optional Skip

Some questions may be skippable.

Example:

> Not sure right now?

**Skip for now**

If skipped, the assistant should know not to invent the answer.

Skipping is better than forcing uncertain information into the system.

---

# Step 4 — Enquiry Destination

## Purpose

Choose where useful customer requests should go.

Wireframe:

```text id="4uk2vl"
┌──────────────────────────────────────────────┐
│                                              │
│  Where should we send enquiries?             │
│                                              │
│  When someone wants to book, request a       │
│  quote, or needs personal help, we'll send   │
│  the important details here.                 │
│                                              │
│  Email                                       │
│  [ reservations@example.com             ]    │
│                                              │
│  [ Continue ]                                │
│                                              │
└──────────────────────────────────────────────┘
```

Pre-fill the account email when appropriate, but let the owner change it.

Avoid a large notification-settings matrix.

---

# Optional Test Email

After saving:

```text id="fe347r"
Enquiries will go to:

reservations@example.com

[ Send test email ]
```

This is optional and should not block onboarding.

---

# Step 5 — Test Assistant

## Purpose

Create the first “wow” moment.

The owner should see that the assistant already understands the business.

Wireframe:

```text id="m8ycd8"
┌──────────────────────────────────────────────┐
│                                              │
│  Meet your assistant                         │
│                                              │
│  Try asking something your customers         │
│  normally ask.                               │
│                                              │
│  Try:                                        │
│  [ Do you have parking? ]                    │
│  [ What time is check-in? ]                  │
│  [ How much is airport transfer? ]           │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ Hi! How can I help you?               │  │
│  │                                       │  │
│  │                                  ...  │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  [ Ask something...                     ]    │
│                                              │
│  [ Looks good ]                              │
│                                              │
└──────────────────────────────────────────────┘
```

This should use the same real answer engine intended for the widget.

Do not use fake responses in production onboarding.

---

# Test Correction

Every assistant response can optionally offer:

**Not correct?**

If clicked:

```text id="qtze7t"
What should your assistant know instead?

[ Check-in starts at 2 PM.                  ]

[ Update assistant ]
```

Then confirm:

> Updated.

Do not make the owner leave onboarding to fix knowledge.

---

# Unknown During Test

If the assistant cannot answer:

```text id="rvrba9"
I don't know whether pets are allowed yet.

Teach your assistant:

[ Small pets are allowed with approval.     ]

[ Teach assistant ]
```

This turns uncertainty into onboarding progress instead of failure.

---

# Step 6 — Widget Setup

## Purpose

Give the assistant a simple brand fit.

Wireframe:

```text id="0xf8g1"
┌──────────────────────────────────────────────┐
│                                              │
│  Make it yours                               │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  │             Website preview            │  │
│  │                                        │  │
│  │                               ◉        │  │
│  │                          assistant     │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Assistant name                              │
│  [ Mira                                  ]   │
│                                              │
│  Welcome message                             │
│  [ Hi! How can I help you?               ]   │
│                                              │
│  Brand color                                 │
│  [ ● ]                                       │
│                                              │
│  Position                                    │
│  ○ Left        ● Right                       │
│                                              │
│  [ Continue ]                                │
│                                              │
└──────────────────────────────────────────────┘
```

Use good defaults based on the business when possible.

The owner should be able to continue without changing anything.

---

# Step 7 — Install

## Purpose

Get the assistant onto the actual website.

Wireframe:

```text id="jme0kj"
┌──────────────────────────────────────────────┐
│                                              │
│  Put your assistant on your website          │
│                                              │
│  Add this small script to your site.         │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ <script src="..."></script>            │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  [ Copy code ]                               │
│                                              │
│  Using:                                      │
│                                              │
│  WordPress                                   │
│  Webflow                                     │
│  Wix                                         │
│  Shopify                                     │
│  Custom website                              │
│                                              │
│  [ I've installed it ]                       │
│                                              │
└──────────────────────────────────────────────┘
```

The platform options should appear only if we actually have useful instructions for them.

---

# Installation Help

If the owner chooses a platform:

```text id="s3we61"
WordPress

1. Open your WordPress admin.
2. Add the assistant script to your site's footer.
3. Publish the change.
4. Come back here.

[ Copy code ]

[ I've installed it ]
```

Where possible, eventually offer easier one-click methods.

But MVP can start with clear instructions.

---

# Step 8 — Verify Installation

After clicking:

**I've installed it**

show a focused verification state.

```text id="mk6d7f"
Checking example.com...

Looking for your assistant.
```

Success:

```text id="vejsu7"
✓ We found it.

Your assistant is working on example.com.

[ Finish setup ]
```

Failure:

```text id="azje29"
We can't find it yet.

Make sure your website changes are published,
then try again.

[ Check again ]

[ Installation help ]
```

The owner should never wonder whether installation succeeded.

---

# Allow Later Installation

Some owners may need a developer to install the script.

Do not trap them.

Provide:

**I'll install it later**

If selected:

> No problem. Your assistant is ready. We'll show you how to install it from the Website page.

Then allow them into the product.

Home should clearly show:

> Assistant ready — not installed yet.

This prevents installation access from blocking setup.

---

# Step 9 — Go Live

## Purpose

Create a satisfying completion moment.

Wireframe:

```text id="6qqgay"
┌──────────────────────────────────────────────┐
│                                              │
│                 ✓                            │
│                                              │
│  Your assistant is live.                     │
│                                              │
│  It can now answer visitors, collect         │
│  enquiries and ask for your help only        │
│  when it really needs it.                    │
│                                              │
│  ● Live on example.com                       │
│                                              │
│  [ Go to Home ]                              │
│                                              │
│  Open my website                             │
│                                              │
└──────────────────────────────────────────────┘
```

Do not immediately present ten feature-tour popups.

The owner has finished.

Let them enjoy that.

---

# Setup Resume

If the owner leaves halfway through, they should resume from the correct point.

Examples:

Website analyzed but review incomplete:

> Let's finish your assistant.

Resume at review.

Widget configured but not installed:

> Your assistant is ready to install.

Resume at installation.

Do not restart onboarding.

---

# Progress Indicator

Use a light progress indicator.

Do not show all steps as a giant intimidating checklist.

Possible:

```text id="o0ozbm"
3 of 7
━━━━━━━●━━━━━━━━━━
```

or a minimal step label.

The owner should feel they are progressing without thinking:

> “There are seven more configuration screens.”

---

# Back Navigation

Allow going back where safe.

Going back should preserve completed information.

Never erase answers because the owner moved between onboarding steps.

---

# Saving

Most onboarding progress should save automatically after meaningful actions.

The owner should not need to repeatedly click:

**Save & continue**

unless the action genuinely requires confirmation.

Prefer:

- answer question
- save automatically
- continue

over form-heavy patterns.

---

# Mobile Onboarding

This entire flow should work naturally on a phone.

Use:

- one primary action at a time
- large inputs
- short content
- full-width cards
- sticky bottom action where useful

The website preview can be simplified on smaller devices.

Testing the assistant should feel especially natural on mobile.

---

# Onboarding Tone

Prefer:

> Let's build your assistant.

> We learned the basics.

> Just a few things to check.

> Meet your assistant.

> Your assistant is ready.

> We found it.

Avoid:

> Configure workspace

> Complete organization setup

> Initialize knowledge base

> Configure agent

> Deployment settings

> Integration configuration

---

# Onboarding Anti-Patterns

Do not build:

- multi-page business profile form before scanning
- role selection
- workspace creation wizards
- AI model selection
- large knowledge import screen
- required team invitations
- integration marketplace
- feature tour before setup
- dashboard before the assistant works
- 15-step checklist

The user signed up because they want an assistant.

Give them an assistant as quickly as possible.

---

# Onboarding Success Test

A successful owner should be able to describe setup as:

> “I gave it my website, checked a few things, tested it, and put it on my site.”

Not:

> “I configured an AI platform.”