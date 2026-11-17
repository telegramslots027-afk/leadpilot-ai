# ChatBoost AI — Market and competitor research

Research snapshot: 17 November 2026. This is desk research, not proof of willingness to pay. Prices are public list prices captured from vendor pages and can vary by country, currency, taxes, billing period and usage.

## Executive recommendation

Position ChatBoost AI as a mobile-first, bilingual (English/French) sales operations assistant for small businesses. The initial wedge should be **turning enquiries into tracked sales**, not trying to replace every CRM, help desk and ecommerce platform at once.

The initial target segments should be:
1. Social-commerce sellers and small retailers (fashion, electronics, beauty, household goods).
2. Service businesses that receive enquiries and appointment requests.
3. Vehicle sellers and other high-consideration sellers who need lead qualification, follow-up and quote tracking.

Cameroon-specific differentiators:
- English/French workflows and low-bandwidth mobile-first design.
- Manual recording and reconciliation of MTN MoMo / Orange Money payments first; do not claim direct payment integrations until contracted APIs and reconciliation are implemented.
- Quote, order and follow-up tracking that works even when sales begin in WhatsApp, Facebook, Instagram or a phone call.
- Trust features: clear order references, customer confirmation, payment status and human handoff.
- International version should support multiple currencies, time zones, languages and tax settings.

## Evidence of demand and constraints

- The U.S. International Trade Administration's Cameroon eCommerce guide (updated 13 April 2026) says Facebook and Instagram influence purchases, mobile money is a preferred payment method, and low trust / digital-payment limitations remain challenges: https://www.trade.gov/country-commercial-guides/cameroon-ecommerce
- A 2026 AERC working paper using a sample of 145,439 businesses from Cameroon's 2018 business census finds that firm size, mobile-money use, education and proximity are associated with e-commerce adoption. This is observational evidence, not proof that a particular SaaS will sell: https://publication.aercafricalibrary.org/handle/123456789/4090
- The Cameroon Economic Policy Institute's State of Entrepreneurship report (2024/2025, published January 2026) describes a large informal sector and financing constraints for SMEs: https://camepi.org/report-state-of-entrepreneurship-cameroon-2024-2025/
- A World Bank Cameroon digital economy diagnostic notes infrastructure, reliability, affordability and trust constraints for digital businesses: https://pubdocs.worldbank.org/en/379941605627277587/DE4A-Cameroon-Country-Diagnostic-Jun-26.pdf

Implication: keep the first product lightweight, usable on phones, tolerant of manual workflows, and useful before deep integrations exist.

## Competitor snapshot

| Product | Public pricing observed | Strengths | Opening for ChatBoost |
|---|---:|---|---|
| Manychat | Free; Essential $14/mo; Pro $29/mo; Business $69/mo; Advanced $139/mo (pricing page captured 17 Nov 2026) | Social messaging automations, channels, broadcasts and AI conversations | Focus on order / inventory / quote tracking and local business workflows rather than only automations |
| Tidio | Free; Starter about $24.17/mo; Growth from about $49.17/mo; Plus $300/mo; Lyro AI add-on from about $32.50/mo (pricing page captured 17 Nov 2026) | Website live chat, helpdesk, AI support agent and flows | Simpler sales operations for microbusinesses, bilingual setup and local-currency pricing |
| respond.io | Starter $79/mo; Growth $159/mo; Advanced $279/mo (pricing page captured 17 Nov 2026) | Omnichannel inbox, team workflows, AI agents, API and reporting | Much lower entry price and simple lead-to-order workflow for small operators |
| WATI | Growth / Pro / Business tiers; public page notes per-message charges and some pricing dynamically loaded | WhatsApp Business API, broadcasts, automation, team inbox and ecommerce integrations | Avoid WhatsApp-only lock-in; support website leads and manual social lead capture before channel approvals |

Official pricing pages:
- Manychat: https://manychat.com/pricing
- Tidio: https://www.tidio.com/pricing/
- respond.io: https://respond.io/pricing
- WATI: https://www.wati.io/en/pricing/

## Proposed positioning

**ChatBoost AI: the simple AI-powered business desk that turns customer enquiries into organized sales.**

Promise only outcomes the product can support:
- Keep customer enquiries, quotes, orders and follow-ups in one workspace.
- Draft replies and promotional content in English or French.
- Track products, stock and payment status.
- Use AI to draft or answer based on business-approved information, with human review and handoff.
- Export business records.

Do not claim that ChatBoost can automatically read private Facebook / Instagram / WhatsApp inboxes until the relevant official APIs, permissions, reviews and customer connections are implemented.

## Pricing hypothesis to validate

These are test prices, not validated willingness-to-pay or final offers.

Cameroon:
- Free trial / Demo: limited sample workspace.
- Solo: 5,000–7,500 FCFA/month for one operator, basic leads, products, quotes and orders.
- Business: 12,500–20,000 FCFA/month for team seats, follow-up reminders, AI drafting quota and reports.
- Growth: 30,000–50,000 FCFA/month for multiple operators, more AI usage, exports and advanced workflows.

International:
- Starter: $9–$15/month.
- Business: $29–$49/month.
- Growth: $79–$99/month.

Pricing needs customer interviews, cost modelling (AI, messaging, hosting, payment fees), and a local payment-method test. Never sell unlimited AI usage at a fixed price until unit economics are measured.

## MVP sequence

### Phase 1 — usable sales desk
- Workspace and user authentication.
- Contacts / leads.
- Products and stock quantities.
- Quotes and orders with payment status (manual reconciliation).
- Follow-up tasks and notes.
- Dashboard totals and CSV export.
- English / French interface.
- Responsive, low-bandwidth UI.

### Phase 2 — AI features
- Business profile and approved knowledge sources.
- AI reply drafting, product descriptions and campaign drafts.
- Lead qualification and suggested next action.
- AI usage quotas, cost tracking, prompt safety and human review.

### Phase 3 — integrations and scale
- Official WhatsApp Cloud API integration (opt-in, approved templates and policy compliance).
- Meta Messenger / Instagram integrations subject to app review and permissions.
- Mobile Money payment-provider integrations after commercial/API access.
- Subscription billing and signed webhooks after merchant eligibility is confirmed.
- Multi-tenant monitoring, backups, audit logs and data export/deletion.

## Validation before scaling

Interview at least 15 businesses across 3 segments. Ask how they currently track enquiries, lost leads, stock, payment confirmations and follow-ups; request examples of the last 10 enquiries and where they were lost. Offer a paid pilot only after demonstrating the actual workflow. Measure weekly active businesses, enquiries tracked, follow-up completion, orders created, conversion, churn, AI cost per workspace and support time.

## Risks and honesty
- Desk research does not prove demand or forecast revenue.
- Competitor pricing changes frequently and can include usage or messaging fees.
- WhatsApp / Meta integrations require official APIs, permissions, customer consent and platform-policy compliance.
- Cameroon payment-provider API access and international SaaS merchant settlement must be separately verified.
- The existing repository is a starter app, not yet a production multi-tenant platform.
