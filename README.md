# chatbot-alice

ALICE stands for `Artificial Labile Intelligence Cybernetic Existence`.

NestJS backend for an enterprise chatbot connected to the WhatsApp Business Cloud API, using hexagonal architecture, asynchronous queues, PostgreSQL, Prisma, and pluggable AI providers for local development and production.

## Current status

Initial functional foundation of the modular monolith. Local startup uses mock AI and WhatsApp providers by default.

## Requirements

- Node.js 22
- pnpm 11
- Docker

## Main commands

```bash
pnpm install
pnpm docker:up
pnpm prisma:generate
pnpm db:migrate --name initial_schema
pnpm start:dev
```

Full validation:

```bash
pnpm check
```

## Initial endpoints

- `http://localhost:3000/api/v1`
- `http://localhost:3000/docs`
- `http://localhost:3000/api/v1/health/live`
- `http://localhost:3000/api/v1/health/ready`
- `GET /api/v1/webhooks/whatsapp`
- `POST /api/v1/webhooks/whatsapp`

## Environment variables

Versioned files:

- `.env.example`
- `.env.test`
- `.env.production.example`

For local development, `.env` is provided with mock providers. No real OpenAI, Gemini, or Meta credentials are required to start the application.

AI provider selection:

- `AI_PROVIDER=mock|openai|gemini`
- `AI_MODEL=<provider-model-name>`
- `OPENAI_API_KEY` only when `AI_PROVIDER=openai`
- `GEMINI_API_KEY` only when `AI_PROVIDER=gemini`

## Deterministic replies

Predetermined replies can be resolved before AI.

- Entries live in `alc_auto_replies`
- They can be edited with `pnpm db:studio`
- Matching runs before `AiGateway`
- If an active rule matches, ALICE replies without consuming AI tokens

## Architecture

- Modular monolith.
- Per-module layers: `domain`, `application`, `infrastructure`, `presentation`.
- The domain does not depend on NestJS, Prisma, Redis, BullMQ, or external SDKs.
- AI does not access the database directly.
- The webhook flow persists first and responds quickly; heavy work is sent to queues.

Summary flow:

```text
HTTP Webhook
  -> verification/signature
  -> event persistence
  -> inbound queue
  -> processing
  -> inbound message
  -> AI
  -> outbound message
  -> outbound queue
  -> WhatsApp
```

## Stack

- NestJS
- Strict TypeScript
- pnpm
- Prisma + PostgreSQL
- Redis + BullMQ
- OpenAI Responses API
- Swagger
- Pino
- Jest
- Docker

## Conventions

- Table prefix: `alc_`
- Single package manager: `pnpm`
- Do not use `npm` or `npx`
- Do not add secrets to the repository
- Commit convention:

```text
[TYPE] module - Short description

Reason:
Explain the reason.

Changes:
- Change one.
- Change two.
```

Suggested types: `INIT`, `ADD`, `UPDATE`, `FIX`, `REFACTOR`, `DOCS`, `TEST`, `CHORE`.

## Security

- Helmet
- Allowlist-based CORS
- Global rate limiting
- Secret redaction in logs
- Optional webhook HMAC signature
- Webhook idempotency
- Asynchronous processing

## Troubleshooting

- If `pnpm` blocks scripts, approve only the packages that are actually required.
- If Docker is not available, run at least `pnpm prisma:generate`.
- If Postgres or Redis are missing, `health/ready` will return an error.

## Additional documentation

- `docs/architecture.md`
- `docs/adr/`
- `AGENTS.md`
- `AGENT.md`
- `CLAUDE.md`
