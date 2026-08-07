# AGENTS.md

## Summary

`chatbot-alice` is ALICE's NestJS backend, integrated with WhatsApp, OpenAI, PostgreSQL, Redis, and BullMQ under a hexagonal architecture.

## Stack

- NestJS
- Strict TypeScript
- pnpm
- Prisma + PostgreSQL
- Redis + BullMQ
- OpenAI Responses API
- Jest

## Rules

- Use `pnpm` only.
- Do not use `npm` or `npx`.
- Do not add secrets.
- AI must not access the DB directly.
- Use the Responses API, not Chat Completions.
- Use mock providers in tests.
- Respect the `alc_` table prefix.
- Do not add microservices or n8n without an explicit architectural decision.
- Do not use `any`.
- Do not ignore TypeScript or ESLint errors.
- Do not modify applied migrations.

## Architecture

- Layers: `presentation -> application -> domain`
- `infrastructure -> application/domain`
- `domain` must not import NestJS, Prisma, Redis, BullMQ, or external SDKs.

## Commands

- `pnpm prisma:generate`
- `pnpm lint:check`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm check`

## Migrations and docs

- Create new migrations; do not rewrite applied ones.
- Update README and docs when configuration or architecture changes.

## Testing

- Run `pnpm check`.
- Clearly report any tests that were not executed or any real blocker.

## Definition of Done

- The code compiles.
- ESLint passes.
- TypeScript passes.
- Tests pass.
- No secrets were added.
- Layer dependencies are respected.
- Documentation was updated.
