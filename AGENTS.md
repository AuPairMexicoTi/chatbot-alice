# AGENTS.md

## Resumen

`chatbot-alice` es el backend NestJS de ALICE, integrado con WhatsApp, OpenAI, PostgreSQL, Redis y BullMQ bajo arquitectura hexagonal.

## Stack

- NestJS
- TypeScript estricto
- pnpm
- Prisma + PostgreSQL
- Redis + BullMQ
- OpenAI Responses API
- Jest

## Reglas

- Usa solo `pnpm`.
- No uses `npm` ni `npx`.
- No agregues secretos.
- La IA no accede directo a DB.
- Usa Responses API, no Chat Completions.
- En pruebas usa proveedores mock.
- Respeta el prefijo `alc_` en tablas.
- No agregues microservicios ni n8n sin decisión arquitectónica explícita.
- No uses `any`.
- No ignores errores de TypeScript o ESLint.
- No modifiques migraciones aplicadas.

## Arquitectura

- Capas: `presentation -> application -> domain`
- `infrastructure -> application/domain`
- `domain` no importa NestJS, Prisma, Redis, BullMQ ni SDKs externos.

## Comandos

- `pnpm prisma:generate`
- `pnpm lint:check`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm check`

## Migraciones y docs

- Genera migraciones nuevas; no reescribas las ya aplicadas.
- Actualiza README y docs cuando cambie configuración o arquitectura.

## Pruebas

- Ejecuta `pnpm check`.
- Reporta claramente cualquier prueba no ejecutada o bloqueo real.

## Definition of Done

- El código compila.
- ESLint pasa.
- TypeScript pasa.
- Las pruebas pasan.
- No se agregaron secretos.
- Las capas respetan sus dependencias.
- La documentación fue actualizada.
