# Arquitectura de chatbot-alice

## Contexto

ALICE es un backend NestJS para procesar webhooks de WhatsApp, persistir conversaciones y generar respuestas con proveedores de IA desacoplados.

## Contenedores

```text
[WhatsApp Cloud / Mock]
          |
          v
     [NestJS API]
      |   |    |
      |   |    +--> [OpenAI / Mock]
      |   +-------> [Redis + BullMQ]
      +-----------> [PostgreSQL + Prisma]
```

## Capas

```text
presentation -> application -> domain
infrastructure -> application/domain
```

## Flujo de webhook

```text
GET verify -> token check
POST event -> raw body + firma -> persistencia -> cola inbound -> procesamiento
```

## Persistencia y colas

- Prisma para tablas `alc_*`.
- Redis para colas inbound/outbound.
- Idempotencia por `external_id` de webhook.

## Seguridad

- Helmet
- CORS allowlist
- Rate limiting
- Firma HMAC opcional
- Redacción de secretos

## Crecimiento

El monolito modular reduce complejidad inicial. Separar workers tendría sentido cuando el throughput de colas requiera escalado independiente del API HTTP.
