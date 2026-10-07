# Design Direction

## Purpose

This document defines how the product should feel visually and interactively.

It does not define exact final components.

It exists to prevent the product from drifting into a generic SaaS dashboard.

The product is a responsive web product accessed through the browser on desktop and mobile.

It is not a downloadable app and should not be designed like a native mobile application.

---

# 1. Core Feeling

The product should feel:

- calm
- clear
- lightweight
- trustworthy
- modern
- premium
- friendly
- intelligent

The owner should never feel:

- overwhelmed
- buried in settings
- like they are operating enterprise software
- like they need training to use the product

The visual experience should reinforce the product promise:

> The AI does the work. You only step in when necessary.

---

# 2. Main Design Principle

The interface should feel more like receiving a useful update from an intelligent assistant than operating a traditional dashboard.

Prefer:

> Everything is handled.

over:

> Dashboard overview

Prefer:

> Your assistant needs your help with one thing.

over:

> 1 unresolved item

Prefer:

> Teach assistant

over:

> Add knowledge entry

Language, layout and interaction should all reinforce this mental model.

---

# 3. Avoid Generic SaaS Design

Avoid automatically using:

- large permanent sidebar
- many navigation sections
- grids of KPI cards
- excessive tables
- dense dashboards
- dozens of filters
- pill badges everywhere
- multiple nested tabs
- “admin panel” styling
- excessive borders
- overly technical information
- huge settings pages

The fact that something is common in SaaS products is not a reason to use it.

---

# 4. Layout Philosophy

Use a strong vertical hierarchy.

Most screens should read naturally from top to bottom.

Example:

```text
Page title / current state

Primary action or important message

Main content

Secondary information
```

Avoid breaking everything into separate cards.

Not every piece of content needs a container.

Whitespace should create structure.

---

# 5. Width

Desktop content should not stretch across the entire screen.

Use a comfortable centered content area.

For core product screens:

- moderate maximum width
- generous left and right space
- readable line lengths
- enough room for two-column layouts only when they genuinely improve clarity

Do not fill a 1440px desktop with content simply because the space exists.

---

# 6. Navigation

Primary navigation contains:

- Home
- Assistant
- Website

Settings/account is secondary.

The navigation should feel lightweight.

Preferred direction:

```text
Logo        Home     Assistant     Website                    Profile
```

A compact header is currently preferred over a traditional enterprise sidebar.

This is not permanently locked until visual exploration.

However, do not introduce a sidebar merely because the project is a web dashboard.

## Mobile

Mobile can use a compact menu or another responsive web navigation pattern.

Do not copy native mobile tab-bar patterns automatically.

Remember:

This is a responsive website.

---

# 7. Home Design

Home should feel like a short report from the assistant.

The main message should dominate.

Examples:

> Everything is handled.

or:

> Your assistant needs your help with 2 things.

Statistics are secondary.

Attention items are more important than analytics.

Avoid a dashboard grid.

A successful Home screen may contain very little content.

That is intentional.

---

# 8. Assistant Design

The Assistant screen should feel like teaching and checking an employee.

The most important actions are:

- Test assistant
- Teach assistant
- Resolve uncertainty
- Inspect what it knows

Avoid making the knowledge categories look like database folders.

Knowledge should feel readable and human.

---

# 9. Website Design

The Website screen should focus on:

- current status
- live preview
- appearance
- installation
- website scan

The preview should visually carry more importance than the installation code.

When the widget is already installed, technical installation controls should become less prominent.

---

# 10. Onboarding Design

Onboarding should be focused.

Use one main task per step.

Do not display full application navigation during early setup.

The owner should feel guided without feeling trapped in a wizard.

Each screen should have:

- clear heading
- short explanation
- one dominant action

Avoid huge forms.

---

# 11. Typography

Typography should feel clean and modern without becoming sterile.

We want:

- strong readable headings
- comfortable body text
- high legibility
- restrained font sizes
- strong hierarchy

Avoid:

- extremely bold oversized SaaS headings everywhere
- tiny gray text
- excessive uppercase
- dozens of font weights
- decorative fonts for normal interface content

The final typeface should feel premium but neutral enough for daily use.

---

# 12. Color

Use a restrained palette.

The product should not rely on many bright colors to create hierarchy.

A good direction:

- warm or clean neutral background
- strong dark text
- one primary brand/accent color
- subtle muted surfaces
- restrained success/warning/error colors

The exact brand color is not locked yet.

Avoid making the product visually noisy through excessive accent colors.

---

# 13. Surfaces

Do not put every section inside a card.

Use surfaces only when they help group something meaningful.

Good uses:

- attention item
- chat preview
- important status
- focused form

Bad use:

- wrapping every sentence or metric in its own card

Prefer whitespace, dividers and hierarchy where possible.

---

# 14. Borders and Shadows

Keep both subtle.

Avoid:

- thick borders
- highly visible gray boxes everywhere
- large floating shadows
- glassmorphism on every surface

Use shadows only when depth communicates interaction or layering.

The interface should not depend on visual effects to look polished.

---

# 15. Buttons

There should normally be one obvious primary action per section.

Primary actions should be easy to identify.

Secondary actions should visually step back.

Avoid screens containing many equally prominent buttons.

Action wording should be specific.

Prefer:

**Teach assistant**

**Analyze website**

**Check installation**

**Test assistant**

Avoid:

**Submit**

**Proceed**

**Manage**

when a clearer verb exists.

---

# 16. Inputs

Inputs should feel approachable.

Use plain labels and helpful examples.

Avoid long enterprise forms.

When possible, allow natural language.

Example:

```text
Tell your assistant something customers should know.

[ We are closed every Monday during winter. ]
```

instead of:

```text
Knowledge type
Category
Title
Content
Source
Status
Tags
```

---

# 17. Attention Items

Attention items are one of the most important UI patterns.

They should feel actionable, not alarming.

Each one should answer:

- what happened?
- why do you need me?
- what do I do now?

Example:

```text
Customers are asking:

“Do you offer airport transfer?”

Your assistant doesn't know yet.

[ Type your answer... ]

Teach assistant
```

Avoid bright warning styling unless there is a real problem.

Most attention items are simply questions.

---

# 18. Status

Use human status language.

Good:

- Live
- Everything is handled
- Needs your help
- Ready to install
- We can't detect it right now

Avoid:

- Operational
- Degraded
- Pending deployment
- Channel disconnected
- Resolution required
- Knowledge conflict status

---

# 19. Icons

Use icons sparingly.

Icons should help recognition, not decorate every label.

Avoid a sidebar full of unrelated icons.

Avoid using icons where clear text is easier to understand.

Use one consistent icon family.

---

# 20. Motion

Motion should be subtle and functional.

Good uses:

- attention item resolving
- preview opening
- onboarding step transitions
- success confirmation
- gentle loading states
- widget interactions

Avoid:

- flashy entrance animations
- excessive parallax
- bouncing UI
- unnecessary hover movement
- long transitions

The interface should feel responsive and immediate.

---

# 21. Loading

Loading states should explain what is happening where useful.

Good:

> Learning about your business...

> Checking your website...

> Updating your assistant...

Avoid technical spinners with no explanation during important actions.

Skeleton states can be used for normal page loading.

---

# 22. Empty States

Empty states should feel intentional.

Example Home:

> Nothing needs you right now.

That is success.

Example no activity:

> Your assistant is live. You'll see a summary here once visitors start using it.

Do not fill empty states with decorative dashboard elements.

---

# 23. Error States

Errors should be calm and actionable.

Explain:

- what went wrong
- whether anything important was affected
- what the owner can do

Example:

> We can't detect your assistant on the website right now.

> Your website itself is still working normally.

> Check installation

Avoid raw errors unless explicitly requested for debugging.

---

# 24. Responsive Web Design

The product must work beautifully on:

- desktop
- laptop
- tablet
- mobile browser

Desktop should feel intentionally designed for a larger screen.

Mobile should feel like the same website adapting intelligently.

Do not simply shrink the desktop layout.

Do not design a native mobile app UI.

Avoid mobile-only patterns unless they genuinely work well on the web.

---

# 25. Desktop Priority

Most business owners will likely complete tasks such as installation from a desktop or laptop.

Desktop should therefore be excellent.

Use the larger screen for:

- better preview
- clearer hierarchy
- comfortable testing
- easier installation instructions

But do not sacrifice the mobile experience.

---

# 26. Mobile Priority

Mobile is especially important for:

- checking Home
- answering an attention item
- teaching the assistant
- testing it
- changing simple settings

These actions should be easy to complete in a mobile browser.

---

# 27. Desired Visual Personality

The product should feel somewhere between:

- premium modern productivity software
- calm consumer software
- intelligent assistant

It should NOT feel like:

- enterprise CRM
- customer-support helpdesk
- admin template
- developer tool
- crypto dashboard
- generic AI startup template

---

# 28. Visual Restraint

When choosing between:

A visually impressive solution

and

A simpler solution that makes the product easier to understand

choose the simpler solution.

Polish should come from:

- spacing
- typography
- proportions
- interaction quality
- hierarchy
- consistency

not from adding more visual elements.

---

# 29. Non-Goals

We are not trying to make users say:

> “This dashboard has so many features.”

We want them to say:

> “This is really easy.”

and:

> “It basically runs itself.”

---

# 30. Design Test

Before approving a screen, ask:

1. Can the owner understand the purpose within five seconds?
2. Is there one obvious next action?
3. Is anything visible that the owner does not need?
4. Could any section be removed?
5. Does this look like generic SaaS?
6. Does the language sound human?
7. Does it work comfortably on desktop and mobile web?
8. Does the screen make the assistant feel more autonomous?

If a screen feels impressive but complicated, simplify it.

---

# 31. Current Visual Direction

For initial exploration, prefer:

- light theme first
- clean neutral background
- dark readable typography
- restrained primary accent
- generous whitespace
- subtle rounded corners
- minimal borders
- small amounts of depth
- compact navigation
- strong typography
- clear conversational language

This is a starting direction.

Exact branding, colors, typography and component styling will be chosen during visual exploration.