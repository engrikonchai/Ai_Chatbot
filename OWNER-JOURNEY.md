# Owner Journey

## Purpose

This document defines the complete experience of a business owner using the product.

It focuses on the sequence of actions, decisions, system responses, and states the owner experiences.

This document should be approved before detailed visual design or implementation begins.

The core principle remains:

> The owner should do as little work as possible while still trusting the assistant.

---

# 1. Journey Overview

The complete first-time journey is:

**Landing page → Sign up → Add website → Website analysis → Review important information → Configure enquiries → Test assistant → Customize widget → Install → Verify → Live**

The returning-owner journey is:

**Open product → See what happened → Resolve anything important → Leave**

The product should not encourage the owner to remain inside the application.

---

# 2. Before Sign Up

## Goal

The visitor should understand the product almost immediately.

They should understand:

- what the assistant does
- that it works on their website
- that it answers customer questions automatically
- that it can collect enquiries
- that setup is simple
- that they do not need to manage another inbox

## Main message

Example:

> Your website can answer customers for you.

Supporting message:

> Give us your website. We’ll build an AI assistant from your business information, help you check it, and give you one simple widget to install.

Primary action:

**Build my assistant**

Secondary action:

**See how it works**

Avoid presenting a large feature matrix.

The main selling point is simplicity.

---

# 3. Sign Up

## Goal

Get the owner into setup with minimal friction.

Required information should be limited.

Possible fields:

- name
- email
- password

Do not ask for every business detail during account creation.

After signup, immediately continue to assistant setup.

Avoid sending the owner to an empty dashboard.

---

# 4. Welcome / Start Setup

The owner should immediately see a simple message:

> Let’s build your assistant.

Supporting copy:

> Start with your website. We’ll learn the basics about your business automatically.

Primary input:

**Website URL**

Example:

`https://yourbusiness.com`

Primary button:

**Analyze website**

Optional:

> No website?

This path can exist later, but it should not complicate the main MVP journey.

---

# 5. Website Analysis

After the owner submits the URL, the product begins analysing the website.

The owner should see progress that feels understandable rather than technical.

Example:

**Learning about your business...**

- Reading your website
- Finding services
- Looking for prices
- Checking opening hours
- Finding contact information
- Preparing your assistant

Do not expose terms such as:

- crawler
- embeddings
- vector database
- scraping
- chunks
- tokens

The system may use those internally.

The owner should only understand that the assistant is learning their business.

---

# 6. Analysis Complete

The result should feel positive and simple.

Example:

> Your assistant has learned the basics.

Then show a concise overview.

Example:

**We found**

✓ Business name  
✓ Contact details  
✓ Opening hours  
✓ Services  
✓ Location  

Then:

**A few things need your help**

This should become the important part.

---

# 7. Review Important Information

The owner should NOT receive a giant list of scraped website content.

The product should separate information into three categories internally.

## A. Clear information

Information that appears clear and reliable.

Examples:

- address
- phone number
- opening hours
- listed services
- contact email

These usually do not need individual approval.

## B. Important information to verify

Information where an incorrect answer could cause a problem.

Examples:

- pricing
- cancellation rules
- guarantees
- deposits
- delivery fees
- minimum stays
- booking policies
- service conditions

Example UI:

> We found this price on your website:

**Airport transfer — €25**

`Correct` `Change`

Do not require review of every normal fact.

## C. Missing information

Things customers are likely to ask but the website does not clearly answer.

Example:

> Do you allow pets?

Owner can answer naturally:

`Small pets are allowed with prior approval.`

Button:

**Teach assistant**

The owner should feel like they are answering questions, not maintaining records.

---

# 8. Knowledge Trust Model

Knowledge should have provenance internally.

Possible sources:

- website
- owner verified
- owner added
- later integration
- system inferred

Owner-provided information has priority over scraped information.

Important information can carry states such as:

- found
- verified
- uncertain
- missing
- outdated

These states should mostly remain behind the interface.

The owner should see human language rather than database terminology.

---

# 9. Enquiry Setup

Next, the owner decides what should happen when the assistant cannot finish something itself.

Example:

> Where should we send customer enquiries?

Input:

`reservations@business.com`

Supporting explanation:

> When someone wants to book, request a quote, or needs personal help, your assistant will collect the important details and send them here.

MVP destination:

**Email**

The owner should not need to use our app to receive the enquiry.

Later destinations may include:

- WhatsApp
- CRM
- Slack
- Telegram
- other systems

Do not expose those options until supported.

---

# 10. Assistant Test

Before installation, the owner should talk to the actual assistant.

This is one of the most important steps in onboarding.

Heading:

> Meet your assistant.

Supporting message:

> Ask it the kinds of questions your customers normally ask.

Provide suggestions based on the business.

Example for a hotel:

- Do you have parking?
- What time is check-in?
- Are pets allowed?
- How can I book?

Example for a car rental company:

- How much is the deposit?
- Can I pick up at the airport?
- What documents do I need?

The owner can type anything.

---

# 11. Correcting the Assistant During Testing

If the assistant gives a wrong answer, the owner should have a very easy correction path.

Example:

Assistant:

> Check-in begins at 3 PM.

Owner sees:

**Not correct?**

Clicking it could reveal:

> What should the assistant say instead?

Owner enters:

`Check-in starts at 2 PM.`

Then:

**Update assistant**

The assistant retries or confirms the new information.

No knowledge-management screen should be necessary.

---

# 12. Assistant Confidence

If the assistant does not know something during testing, this should be treated as a useful setup moment.

Example:

> I don’t know whether airport transfer is available yet.

Then show the owner:

> Want to teach your assistant?

Owner enters the answer.

This should reinforce the mental model:

**Teach the assistant, don’t configure a database.**

---

# 13. Widget Setup

Once testing is satisfactory:

> Your assistant is ready for your website.

The owner sees a live website-widget preview.

Keep customization intentionally limited.

Initial options:

- assistant name
- welcome message
- primary color
- widget position

Possibly:

- logo/avatar

Avoid dozens of appearance settings.

Strong defaults should make the widget look good immediately.

---

# 14. Installation

The installation experience must feel simple.

Primary method:

**Copy installation code**

Example:

```html
<script src="..."></script>
```

Supporting options can eventually include:

- WordPress
- Webflow
- Wix
- Shopify
- developer instructions

The product should explain where to place the code in plain language.

---

# 15. Installation Verification

After installation, the owner should not have to guess whether it worked.

Button:

**Check installation**

The system verifies whether the widget is detected.

Possible states:

### Installed

> Your assistant is live.

✓ Widget detected  
✓ Assistant responding

### Not detected

> We couldn’t find the assistant on your website yet.

Then provide short troubleshooting guidance.

Avoid frightening technical errors.

---

# 16. Go Live Moment

This should feel like completing setup rather than opening another dashboard.

Example:

> Your assistant is live 🎉

Supporting message:

> It can now answer visitors, collect enquiries, and ask for your help when it genuinely needs it.

Primary button:

**Go to Home**

Optional:

**Try it on my website**

---

# 17. First Home Experience

The Home screen should be extremely simple.

Immediately after launch:

> Your assistant is live.

Then perhaps:

**Today**

0 conversations handled  
0 enquiries captured

And:

> We’ll let you know when something needs your attention.

No empty charts.

No giant zero-filled dashboard.

No empty Inbox.

---

# 18. Returning Owner — Nothing Needs Attention

This should be the ideal state.

Example:

> Everything is handled.

**This week**

42 conversations handled  
7 enquiries captured  
91% answered automatically

Then:

> Nothing needs you right now.

This state should feel successful.

The absence of tasks is a positive outcome.

---

# 19. Returning Owner — Something Needs Attention

Home should prioritize these situations above statistics.

Example:

## 2 things need your help

### Question customers are asking

> Do you offer airport transfers?

Your assistant does not know yet.

Input:

`Yes, airport transfer costs €25 each way.`

Button:

**Teach assistant**

---

Another example:

### Information may be outdated

> Your website lists check-in at 3 PM, but another page says 2 PM.

Options:

**2 PM**  
**3 PM**  
**Enter another answer**

The owner resolves the issue and leaves.

---

# 20. Enquiry Experience

A visitor asks:

> We need an apartment for 4 people from July 10 to July 15.

The assistant gathers:

- name
- email or phone
- dates
- number of guests
- relevant preference
- additional question

The visitor sees something like:

> Thanks — I’ve sent your request to the property. They’ll confirm availability with you directly.

The assistant must not claim confirmed availability unless a real availability integration exists.

---

# 21. What the Owner Receives

The business receives a useful email.

Example structure:

**New enquiry from your website**

John Smith  
July 10–15  
4 guests  
john@example.com

Request:

> Looking for a two-bedroom apartment and wants to know if airport pickup is available.

AI summary:

> Visitor is interested in booking for five nights and needs accommodation for four people.

The email should contain enough information for the owner to act without opening our application.

---

# 22. Assistant Area

The Assistant area should answer:

> What does my assistant know?

> Is there anything I should teach it?

> How does it respond?

Possible sections:

### Test assistant

Always easily accessible.

### Needs your help

Questions or conflicting information.

### What it knows

A summarized view of the business.

Examples:

- Business details
- Services
- Prices
- Policies
- Frequently asked questions

Avoid showing hundreds of individual database items by default.

### Add something

Simple natural-language input:

> Tell your assistant something customers should know.

Owner enters:

`We are closed every Monday during winter.`

Then:

**Teach assistant**

---

# 23. Website Area

The Website area contains:

### Widget preview

### Appearance

Small set of options.

### Installation

Code and platform instructions.

### Status

Example:

> Live on example.com

### Re-scan website

The owner can ask the product to look for updated information.

Potential future feature:

Automatic website-change detection.

---

# 24. Settings

Settings should remain secondary.

Possible sections:

- business
- account
- enquiry destination
- notifications
- billing
- privacy
- advanced

Do not turn Settings into another complicated admin console.

---

# 25. Notifications

Because the owner should not need to keep checking the product, notifications are important.

Notify the owner when:

- an important enquiry arrives
- the assistant repeatedly cannot answer something
- critical information needs verification
- the widget stops working
- payment/account issues affect service

Do not notify for every normal conversation.

The owner should not receive:

> You have 17 unread chats.

Instead:

> Your assistant handled 17 conversations today.

And only send that if summaries become useful.

---

# 26. Failure States

The product should remain calm when something fails.

## Website cannot be analysed

> We couldn’t read your website automatically.

Then offer a simple retry or another setup route.

## Assistant does not know

It should admit this and either:

- ask a clarification
- collect an enquiry
- tell the visitor the business will follow up

## Email delivery fails

The system should retry automatically and clearly warn the owner if delivery cannot be completed.

## Widget unavailable

The site should continue functioning normally.

The widget must never break the customer's website.

---

# 27. Mobile Experience

The entire owner journey must work well from a phone.

A business owner should be able to:

- sign up
- enter their website
- verify information
- teach the assistant
- test it
- configure the widget
- copy installation instructions
- resolve attention items

without requiring a desktop.

Installation itself may require access to the website platform, but our interface must remain usable.

---

# 28. Emotional Journey

The product should create these feelings in order.

### Beginning

“This looks easy.”

### During website scan

“It’s doing the work for me.”

### During review

“I only need to fix a few things.”

### During testing

“Okay, this actually knows my business.”

### Installation

“That was easier than I expected.”

### Returning later

“It handled this without me.”

That emotional progression matters as much as individual screens.

---

# 29. Anti-Patterns

Do not introduce:

- unread-chat counters
- ticket queues
- conversation assignments
- CRM pipelines
- complicated knowledge tables
- dozens of filters
- huge analytics dashboards
- technical AI settings
- unnecessary setup steps
- mandatory tutorials
- complex sidebar navigation
- empty tables after signup

Whenever one of these appears necessary, reconsider the underlying workflow first.

---

# 30. Phase 2 Completion Test

Phase 2 is complete when we can answer all of these confidently:

1. What happens immediately after signup?
2. How does the assistant learn the business?
3. Which information requires owner verification?
4. How does the owner correct the AI?
5. Where do enquiries go?
6. How does the owner test the assistant?
7. How is the widget installed?
8. How do we know installation succeeded?
9. What does the owner see when everything is working?
10. What does the owner see when something needs attention?
11. How does the product avoid becoming another Inbox?
12. Can the owner understand all of this without documentation?

Only after these are approved should detailed screen design begin.