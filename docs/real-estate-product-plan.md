# ChatBoost AI for Real Estate — Product, Pricing and Go-to-Market Plan

Plan date: 19 November 2026
Target market: United States
Revenue model: One-time setup + monthly subscription
Existing project: https://github.com/telegramslots027-afk/leadpilot-ai

## Product positioning

ChatBoost AI for Real Estate helps independent real-estate agents and small teams respond to property enquiries, qualify buyers and sellers, and organize follow-up requests from their website.

Core promise: Turn more website visitors into organized, agent-ready conversations.

Initial ideal customer:
- Independent residential real-estate agents and small teams (1–10 agents).
- A live website with property listings and inbound enquiries.
- No requirement for a full CRM replacement or MLS integration in the first pilot.

## MVP scope

1. Embeddable website chat widget with English and Spanish.
2. Agent-controlled business profile, service areas, office hours and contact details.
3. Agent-managed property records: address/area, asking price, beds, baths, size, status, features, approved description and last-updated timestamp.
4. Buyer, seller, renter and property-management enquiry paths.
5. Lead capture with name, email, phone optional, intent, budget range optional, target area, timeline and contact preference.
6. Explicit contact-consent record, timestamp and source page.
7. Lead inbox with status, notes, owner, created time and export.
8. Viewing request workflow (request only until a calendar integration is built).
9. AI answers grounded only in approved agent/property data; unknown questions escalate to a human.
10. Usage limits, audit trail, data export/deletion and basic analytics.

Not in initial MVP:
- MLS/IDX feed, property valuation, mortgage advice, legal advice, autonomous negotiation, SMS/voice calling, automated email campaigns, CRM sync, calendar booking or claims of live property availability. These require separate integrations, review and testing.

## Demo

Public GitHub Pages preview:
https://telegramslots027-afk.github.io/leadpilot-ai/realestate/

The demo uses fictional listings and scripted answers. Its enquiry form is a local-only interaction and does not transmit or store data. It is a sales preview, not a production customer service.

## Pricing hypotheses

| Plan | Setup | Monthly | Scope |
|---|---:|---:|---|
| Solo Agent | $149 | $39 | 1 agent, 1 website widget, up to 25 active listings, lead capture and email notification |
| Pro Agent | $299 | $79 | Up to 3 agents, up to 100 active listings, buyer/seller paths, lead summaries, viewing requests and follow-up workspace |
| Team | $599 | $149 | Up to 10 agents, lead assignment, team dashboard, reporting and priority support |

Usage limits and AI message quotas must be costed before accepting customers. Third-party CRM, MLS/IDX, SMS/voice, calendar and custom website work are quoted separately. Do not promise unlimited AI usage.

Pilot offer: first 3 qualified customers receive a discounted setup in exchange for structured feedback and permission to use an approved testimonial/case study. Do not promise a free custom build. Suggested pilot: $99 setup + $39/month for one month, then normal pricing if the customer agrees. The customer must know exactly which features are live.

## Sales plan

Primary segment: independent agents and small teams, not large brokerages.

Prospecting:
- Start with one US metro and a narrow segment (independent residential agents).
- Find agents whose websites have listings but weak enquiry handling, slow response paths or no useful after-hours assistant.
- Verify business identity and a publicly listed business contact address.
- Personalize each email with a genuine observation; include the demo URL and one clear invitation.
- Respect opt-outs, suppress bounced addresses and avoid repeat contacts.
- Do not imply a prior relationship or claim measured conversion lift.

Sales sequence:
1. Personalized email: identify enquiry-response gap and offer a 2-minute demo.
2. Demo: visitor asks about a sample property, selects buyer/seller intent and completes a sample enquiry form.
3. Discovery: ask how leads arrive, who responds, how quickly, and where leads are recorded.
4. Pilot proposal: scope one website, agreed listing data, lead destination, setup fee, monthly fee, AI quota and support.
5. Written acceptance and payment before custom implementation.
6. Configure from agent-approved data; test sample questions and escalation.
7. Customer acceptance test; launch only after consent, privacy, security and delivery checks.
8. Weekly review of leads, response quality, unanswered questions and usage cost.

Sales channels:
- Personalized direct email and phone follow-up where lawful.
- LinkedIn outreach to agents and team leads.
- Real-estate agent communities and local brokerage networking.
- Fiverr/Upwork only for scoped installation services; avoid competing solely on low price.
- Referral incentive after the first successful paid pilot.

## Implementation roadmap

### Phase 0 — sales preview (completed in this commit)
- Add bilingual real-estate demo under /realestate/.
- Use fictional sample property data.
- Show buyer/seller/renter paths and local-only enquiry-form interaction.
- Preserve the existing dealership demo.

### Phase 1 — reliable pilot foundation
- Review existing Next.js/Supabase schema and security model.
- Implement authentication and tenant/workspace onboarding.
- Add tenant-scoped property CRUD and lead CRUD with server-side authorization.
- Store contact-consent evidence and source page.
- Build agent lead inbox and notifications.
- Add CSV export, retention and deletion workflows.
- Configure rate limits, audit logs and AI usage quotas.
- Use approved property facts only; log unknown-answer escalation.
- Pilot with one agent using manual property import.

### Phase 2 — paid pilot readiness
- Add website embed snippet and customer-specific widget settings.
- Add real server-side AI retrieval grounded in the agent's records.
- Add secure email notifications and basic analytics.
- Add billing only after confirming merchant eligibility, settlement, tax and signed webhook support.
- Run end-to-end tests, privacy review and security checks.
- Launch 1–3 paid pilots and measure real usage and support costs.

### Phase 3 — integrations and scale
- Calendar integration for confirmed appointment booking.
- CRM integrations after customer demand is demonstrated.
- MLS/IDX only after appropriate data licensing, broker authorization and vendor/API approval.
- SMS/voice only after consent, opt-out and applicable US communications compliance are implemented.
- Multi-team controls, advanced reporting and higher-volume plans.

## Existing resources and constraints

- Existing GitHub repository: telegramslots027-afk/leadpilot-ai.
- Existing GitHub Pages demo deployment workflow publishes the public/demo directory.
- Existing demo URL: https://telegramslots027-afk.github.io/leadpilot-ai/
- Stack already in repo: Next.js App Router, React, TypeScript; Supabase is planned; AI API is optional and server-side only.
- Existing Supabase schema and proposed platform schema require review before production use.
- Hosting budget previously discussed: $20–$50/month. Keep the first pilot lean; avoid adding paid services before customer validation.
- International payment provider eligibility and Cameroon settlement are not confirmed. Do not promise subscription checkout until verified.
- User primarily works from an iPhone; prioritize mobile-friendly admin and simple setup.

## Compliance and trust guardrails

- Fair Housing Act: do not steer, rank or filter prospects or neighbourhoods based on protected characteristics or proxies. Answer only objective property facts and customer-stated lawful criteria; escalate ambiguous questions.
- Never infer or ask protected-class information for lead qualification.
- TCPA and state privacy/marketing rules: do not send automated calls/texts or marketing messages without appropriate consent and compliant opt-out flows. Store consent evidence.
- CAN-SPAM: commercial email must use truthful headers/subjects, identify the sender, include a valid physical postal address and working opt-out process; honor opt-outs.
- Privacy: disclose collection and use; collect only needed data; restrict staff access; support export/deletion; do not train shared models on customer leads.
- MLS/IDX: do not scrape listings or imply access to MLS data without licensed feed and permission.
- No automated valuations, lending/credit advice, legal advice or guarantee of property availability.

## Success measures

Pilot metrics:
- Website enquiries captured with valid consent.
- Percentage of leads with enough detail for agent follow-up.
- Median time to agent notification.
- Unanswered/incorrect answer rate.
- Agent weekly active usage.
- Cost per AI conversation and gross margin per customer.
- Pilot-to-paid conversion and monthly retention.

First milestone: 3 paid pilot customers, not 30 speculative signups. Validate willingness to pay and delivery effort before scaling outreach.
