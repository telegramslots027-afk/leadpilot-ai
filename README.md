# ChatBoost AI

ChatBoost AI is being developed as a mobile-first, bilingual business sales desk for Cameroon and international small businesses.

## Product direction

The product aims to bring customer enquiries, contacts, follow-ups, product catalogue, stock, orders, simple reporting and AI-assisted marketing / reply drafting into one workspace. The first wedge is helping small businesses turn enquiries into tracked sales.

## Current repository contents

- Responsive marketing website and interactive FAQ demo chat.
- Interactive sample business dashboard at `/dashboard` (sample data only; browser-session changes are not persisted).
- Early-access lead form and server-side validation.
- Existing Supabase lead storage endpoint and initial lead schema.
- Proposed multi-tenant platform schema at `supabase/platform-schema.sql`.
- Cameroon and global competitor / pricing research at `docs/market-research-2026-11.md`.
- Health-check endpoint and Render deployment blueprint.

## Important: what is and is not live

The dashboard is an interactive product preview. Its sample contacts, products, orders, metrics and marketing drafts are not saved to a customer account. The new platform SQL is a design foundation and has not been applied to a live database. Customer authentication, tenant provisioning, production CRUD APIs, persistent workspace data, billing, channel integrations and security testing are not complete. Do not collect customer business data or charge subscriptions yet.

The public GitHub repository contains no credentials. Never commit API keys, database passwords or service-role keys. Configure secrets only in a trusted host's environment settings.

## Stack

- Next.js App Router
- React and TypeScript
- Supabase Postgres / Auth (planned)
- Optional OpenAI API for AI replies (server-side only)
- Render or another Node.js host

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The public chat demo uses a limited built-in knowledge base when no AI key is configured. To enable AI responses, add `OPENAI_API_KEY` and optionally set `OPENAI_MODEL` in the server environment. API usage is billed separately by the AI provider; a ChatGPT subscription does not include API credits.

## Database setup

- `supabase/schema.sql` is the original lead-capture schema.
- `supabase/platform-schema.sql` is the proposed multi-tenant product schema for future authenticated workspaces.

Do not run the platform schema in production without review and an onboarding / membership-provisioning implementation. Keep service-role credentials server-only. Do not create permissive anonymous policies.

## Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/telegramslots027-afk/leadpilot-ai)

A `render.yaml` Blueprint is included. The one-click link opens Render, where you sign in, connect GitHub, review the service and approve deployment. The Blueprint uses a paid Starter web-service plan in Frankfurt; check the current monthly charge in Render before confirming. The AI and database keys are optional for the public demo, so the site can start without them. AI replies require a server-side OpenAI API key; persistent lead capture requires Supabase configuration. Deployment and production runtime testing have not yet been completed.

## Research and pricing

See `docs/market-research-2026-11.md` for competitor positioning, observed public prices, Cameroon market evidence, pricing hypotheses and a staged product roadmap. Proposed prices are hypotheses to validate with real businesses, not confirmed market rates.

## Before launch

- Implement Supabase Auth and secure workspace onboarding.
- Implement tenant-scoped server-side CRUD with authorization on every operation.
- Add rate limiting, abuse controls, audit logs and monitoring.
- Add privacy notice, terms, data retention and deletion workflows.
- Implement and test AI usage quotas and cost tracking.
- Integrate WhatsApp / Meta only through official approved APIs and permissions.
- Verify payment-provider eligibility, settlement and signed webhook flows.
- Add automated tests, backups and a security review.
- Conduct paid pilots and validate pricing before scaling.

Do not promise customers features or integrations that are not implemented.
