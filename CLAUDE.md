Read AGENTS.md before making any changes.
AGENTS.md is the canonical source of repository instructions.

- Project: ALICE backend for WhatsApp and AI workflows.
- Architecture: modular monolith with hexagonal boundaries.
- Stack: NestJS, TypeScript, pnpm, Prisma, PostgreSQL, Redis, BullMQ.
- Main commands: `pnpm prisma:generate`, `pnpm test`, `pnpm build`, `pnpm check`.
- Use pnpm only.
- Tests must use mock providers, never real Meta or OpenAI services.
- Do not modify applied migrations.
- Do not couple the domain to infrastructure.
- Do not add secrets.
- Run `pnpm check` before finishing.
- Update docs when architecture or configuration changes.
