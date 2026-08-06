# chatbot-alice

ALICE significa `Artificial Labile Intelligence Cybernetic Existence`.

Backend NestJS para un chatbot empresarial orientado a WhatsApp Business Cloud API, con arquitectura hexagonal, colas asíncronas, PostgreSQL, Prisma y proveedores mock para desarrollo local.

## Estado actual

Base funcional inicial del monolito modular. El arranque local usa proveedores mock de IA y WhatsApp por defecto.

## Requisitos

- Node.js 22
- pnpm 11
- Docker

## Comandos principales

```bash
pnpm install
pnpm docker:up
pnpm prisma:generate
pnpm db:migrate --name initial_schema
pnpm start:dev
```

Validación completa:

```bash
pnpm check
```

## Endpoints iniciales

- `http://localhost:3000/api/v1`
- `http://localhost:3000/docs`
- `http://localhost:3000/api/v1/health/live`
- `http://localhost:3000/api/v1/health/ready`
- `GET /api/v1/webhooks/whatsapp`
- `POST /api/v1/webhooks/whatsapp`

## Variables de entorno

Archivos versionados:

- `.env.example`
- `.env.test`
- `.env.production.example`

Para desarrollo local existe `.env` con proveedores mock. No se requiere API key real de OpenAI ni credenciales reales de Meta para levantar la aplicación.

## Arquitectura

- Monolito modular.
- Capas por módulo: `domain`, `application`, `infrastructure`, `presentation`.
- El dominio no depende de NestJS, Prisma, Redis, BullMQ ni SDKs externos.
- La IA no accede directamente a la base de datos.
- El flujo de webhook persiste primero y responde rápido; el trabajo pesado va a cola.

Flujo resumido:

```text
Webhook HTTP
  -> verificación/firma
  -> persistencia de evento
  -> cola inbound
  -> procesamiento
  -> mensaje inbound
  -> IA
  -> mensaje outbound
  -> cola outbound
  -> WhatsApp
```

## Stack

- NestJS
- TypeScript estricto
- pnpm
- Prisma + PostgreSQL
- Redis + BullMQ
- OpenAI Responses API
- Swagger
- Pino
- Jest
- Docker

## Convenciones

- Prefijo de tablas: `alc_`
- Package manager único: `pnpm`
- No usar `npm` ni `npx`
- No agregar secretos al repositorio
- Convención de commits:

```text
[TYPE] modulo - Descripción breve

Motivo:
Explicación del motivo.

Cambios:
- Cambio uno.
- Cambio dos.
```

Tipos sugeridos: `INIT`, `ADD`, `UPDATE`, `FIX`, `REFACTOR`, `DOCS`, `TEST`, `CHORE`.

## Seguridad

- Helmet
- CORS por allowlist
- Rate limiting global
- Redacción de secretos en logs
- Firma HMAC opcional de webhook
- Idempotencia de webhook
- Procesamiento asíncrono

## Troubleshooting

- Si `pnpm` bloquea scripts, aprueba únicamente los paquetes necesarios.
- Si Docker no está disponible, ejecuta al menos `pnpm prisma:generate`.
- Si faltan Postgres o Redis, `health/ready` responderá error.

## Documentación adicional

- `docs/architecture.md`
- `docs/adr/`
- `AGENTS.md`
- `AGENT.md`
- `CLAUDE.md`
