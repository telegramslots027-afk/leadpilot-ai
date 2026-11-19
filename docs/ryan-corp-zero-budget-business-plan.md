# Ryan Corp — Zero-Budget Business Plan
Plan date: 19 November 2026
Status: launch strategy and product scope; not a claim of production readiness.
Existing codebase: https://github.com/telegramslots027-afk/leadpilot-ai

## 1. Executive decision

Ryan Corp will use a service-first, software-second model:
- Sell a narrowly scoped AI lead-response setup and managed service to small businesses.
- Reuse the repeatable workflows to build a subscription product only after real customers validate them.
- Start with no paid advertising, no inventory, no new paid software subscriptions and no paid hosting commitments.
- Use the existing ChatBoost AI / LeadPilot repository as the technical foundation rather than starting another codebase.

Initial product name: **Ryan Corp Lead Desk**.
Initial offer: **Lead Response Setup** — a website enquiry assistant configured with the customer's approved FAQs, contact details and service information, plus a simple lead-capture and handoff workflow.

## 2. Customer and first market

Primary initial customer: independent US auto repair shops and other local service businesses with a public website and a small team.
Why start here:
- The existing project already has an auto/dealership-oriented demo and prior prospecting experience.
- The enquiry types are relatively repeatable: services, opening hours, location, estimates, appointment requests and speaking to a person.
- A narrowly scoped pilot can be demonstrated without replacing the customer's CRM or claiming access to private social inboxes.

Secondary segments after the first repeatable pilot: independent real-estate agents, home-service contractors and small ecommerce sellers.

Ideal customer signals:
- Has a functioning website and publicly listed business contact.
- Receives quote, service or appointment enquiries.
- Has a clear business owner/manager contact.
- Can provide approved FAQ/service information and nominate a human for handoff.

Do not target regulated/high-risk use cases or businesses that require medical, legal, financial or emergency advice.

## 3. Problem and positioning

Problem hypothesis: a small business may receive enquiries outside business hours or across channels and lack a consistent way to answer basic questions, collect contact details and route requests to staff.

Positioning:
**Ryan Corp helps small businesses capture and organize website enquiries, answer approved FAQs and hand interested customers to a real person.**

Do not promise guaranteed sales, increased conversion rates, 24/7 human coverage, autonomous bookings, CRM integrations, WhatsApp/Instagram inbox access or automated SMS unless each capability is implemented, approved and tested.

## 4. First sellable service

### Lead Response Setup — paid pilot scope

Included only when completed and accepted:
1. One business-specific website chat assistant.
2. Business-approved FAQ, opening hours, service area and contact details.
3. Enquiry form that securely stores only agreed fields.
4. Lead inbox or agreed email notification.
5. Human handoff for unknown, sensitive or high-stakes questions.
6. Basic usage and lead export.
7. Test script and customer acceptance checklist.
8. One round of setup adjustments.

Excluded unless separately scoped and implemented: WhatsApp/Instagram automation, SMS/voice, calendar booking, CRM sync, payment collection, inventory, custom mobile apps and guaranteed lead conversion.

### Pilot pricing hypotheses (not validated)

- First 1–3 paid pilots: $99 setup + $39 for the first month, in exchange for structured feedback; do not discount below delivery cost.
- Standard after validation: $149–$299 setup + $39–$79/month depending on lead volume, AI usage, support and integrations.
- If a customer's requirements exceed the safe pilot scope, quote separately or decline.

The first pilot should be paid only after the system is working, customer data handling is safe, scope is agreed in writing, and a lawful payment method is available. No live checkout is active today.

## 5. Product roadmap

### Phase 0 — clarify and package (current)
- Rename customer-facing product to Ryan Corp Lead Desk while retaining the repository and technical history.
- Publish a truthful product page and a clearly labelled interactive demo.
- Create a one-page pilot scope, onboarding checklist, test script and prospect qualification criteria.
- Keep demo data fictional; clearly mark all simulated functions.

### Phase 1 — reliable single-customer pilot
- Review and harden the existing Next.js routes and Supabase design.
- Implement secure authentication and tenant isolation before storing customer data.
- Implement server-side lead persistence, validation, abuse protection and data deletion.
- Ground AI answers only in business-approved content; provide a safe fallback and human escalation.
- Add notification delivery only after testing and consent/recipient configuration.
- Build an installable website widget with per-customer configuration.
- Add logs, usage caps and AI cost tracking.
- Run security, privacy, mobile and end-to-end acceptance tests.

### Phase 2 — paid pilot and repeatability
- Configure one customer using approved information.
- Obtain written acceptance of the exact scope and privacy notice.
- Measure enquiry capture, successful handoffs, unanswered questions, staff time and operating cost.
- Review weekly with the customer and fix only the most valuable issues.
- Do not expand feature scope without evidence of demand.

### Phase 3 — subscription software
- Add customer self-service onboarding only after repeated manual setups reveal the common workflow.
- Introduce subscription plans after billing, cancellation, refunds, access control and usage limits work end to end.
- Add official third-party integrations only after permissions, API access, consent and policy compliance are confirmed.

## 6. Go-to-market: zero-budget

1. Use the existing demo as a conversation starter, never as proof of live production functionality.
2. Build a small, manually verified prospect list (10–20 businesses per batch) from public business websites.
3. Personalize each message using a genuine observation and a specific, modest offer to show the demo.
4. Contact businesses individually; include sender identity and a working opt-out. Respect local laws and platform rules.
5. Track sent, replied, interested, not interested, bounced, discovery call, demo, pilot offered, won and lost.
6. Do not send bulk unsolicited campaigns, scrape private contact data or repeatedly contact non-responders.
7. Ask for a short discovery conversation before quoting custom work.
8. Publish only verified testimonials or case studies with customer permission.

Initial sales experiment: 20 well-qualified prospects, personalized individually. Success is not email volume; success is qualified replies, demo requests, discovery calls and a customer willing to pay for the defined pilot.

## 7. Zero-budget operating model

Use existing GitHub repository and free-tier tools where available. Keep the static demo on existing GitHub Pages if it remains available. A static page is not a substitute for a secure backend.

Do not commit credentials. Do not ask customers to send passwords or private keys. Configure secrets only through a trusted host's protected environment settings.

No paid hosting, API usage, advertising or subscriptions until:
- a real prospect validates the problem;
- the expected cost per customer is understood;
- the customer has accepted a paid scope; and
- a lawful, available way to collect and settle payment is confirmed.

AI API usage is not included in a ChatGPT subscription. Until a funded API budget exists, use deterministic demo responses or a manual human-assisted service and label it accurately.

## 8. Revenue model and financial discipline

Revenue streams:
- One-time setup / implementation fee.
- Monthly support and software access after a pilot is stable.
- Separately scoped integrations and data migration only where feasible.

No revenue forecast is presented as fact. Track:
- qualified prospects contacted;
- positive reply rate;
- demos booked;
- paid pilots offered and accepted;
- setup hours per customer;
- monthly support hours;
- hosting and AI cost per active customer;
- gross margin and cancellations.

Do not add a recurring subscription until ongoing customer value and service cost are measured.

## 9. Risk, privacy and trust

- Collect the minimum customer information necessary; explain purpose and retention.
- Keep customer workspaces strictly separated; test authorization server-side.
- Provide export and deletion procedures.
- Do not use customer data to train shared models.
- Do not invent business facts, prices, inventory, availability or appointment confirmations.
- Escalate sensitive, uncertain and high-impact questions to a human.
- Respect applicable privacy, marketing, consumer-protection and messaging laws in each target country.
- Keep payment checkout disabled until merchant eligibility, settlement, verification, webhook security and refunds are tested.

## 10. First 30-day execution plan

### Days 1–3
- Freeze product scope and positioning.
- Review current repository and remove conflicting or unsupported marketing claims.
- Prepare demo walkthrough, pilot agreement outline and onboarding checklist.

### Days 4–7
- Test the demo on mobile and desktop.
- Build a verified prospect list of 20 independent US auto repair/service businesses.
- Send a small personalized batch only after reviewing each message.

### Days 8–14
- Respond to interested prospects manually.
- Run discovery calls and record objections.
- Offer a paid pilot only when technical requirements and data handling are ready.

### Days 15–21
- Implement only the features needed for the first agreed pilot.
- Run security, privacy and acceptance checks.
- Collect payment only through an approved and tested method.

### Days 22–30
- Launch one limited pilot if all gates pass.
- Review actual usage, lead quality, operating cost and customer feedback.
- Decide whether to continue, change the niche or narrow the product.

## 11. Immediate priorities and gates

Priority order:
1. Truthful demo and clear offer.
2. Customer discovery and demand validation.
3. Secure single-tenant pilot foundation.
4. First paid pilot.
5. Repeatable onboarding.
6. Multi-tenant SaaS and subscriptions.

Current known gaps in the existing repository: the dealership/front-desk demos are scripted; lead storage requires Supabase configuration; the public GitHub Pages workflow is static-only; AI API use requires a separately funded server-side key; account security, tenant isolation, notifications, widget installation, production testing and billing are incomplete. Do not collect real customer data or charge for features until these gaps are closed.

## 12. Decision log

- Business model: services now + software later.
- Starting budget: $0.
- Product preference: software.
- Brand: Ryan Corp.
- First offer: Lead Response Setup / Ryan Corp Lead Desk.
- Initial niche: independent US auto repair shops and local service businesses.
- Initial language: English; add French after the core flow is reliable.
- Payment provider direction: Flutterwave is the selected candidate, but merchant approval and settlement are not confirmed; checkout remains disabled.
