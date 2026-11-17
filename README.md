# ChatBoost AI

ChatBoost AI is an early-stage SaaS MVP for website customer conversations and lead capture.

## Current MVP

- Responsive product landing page.
- Interactive product demo chat.
- Rule-based demo responses when no AI key is configured.
- Optional OpenAI-compatible chat completion integration.
- Early-access lead form with server-side validation.
- Supabase lead storage endpoint and SQL schema.
- Health-check endpoint and Render deployment blueprint.

## Stack

- Next.js App Router
- React and TypeScript
- Supabase (Postgres lead storage)
- Optional OpenAI API for AI responses
- Render or another Node.js host

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The chat demo works without an AI key using a limited built-in knowledge base. To enable AI responses, add `OPENAI_API_KEY` and optionally set `OPENAI_MODEL` in the server environment. API usage is billed separately by the AI provider; a ChatGPT subscription does not include API credits.

## Configure lead storage

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to the server environment.
5. Never expose the service-role key in browser code or a `NEXT_PUBLIC_` variable.

Until Supabase is configured, the lead form returns a setup message and does not pretend that a lead was saved.

## Deploy on Render

A `render.yaml` Blueprint is included.

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Node version: 22
- Health check: `/api/health`
- Set the secret environment variables in the Render dashboard when prompted.

## Important scope and production checklist

This is a demo/MVP foundation, not a finished multi-tenant SaaS or a production-ready customer-support platform. It does not yet include customer authentication, separate workspaces, configurable knowledge bases, conversation persistence, human-agent inboxes, subscription checkout, Paddle webhooks, usage metering, rate limiting, or admin roles.

Before accepting real customer data or payments, implement and test:
- Authentication and tenant-level data isolation.
- Server-side authorization on every customer data operation.
- Rate limiting, abuse controls, spam protection and monitoring.
- Privacy notice, terms, data retention and deletion workflows.
- Paddle checkout and signed webhook verification.
- Subscription entitlements and cancellation handling.
- Automated tests, backups and security review.

Do not promise customers features that are not implemented.
