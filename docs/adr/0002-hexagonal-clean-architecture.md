# 0002 Hexagonal Clean Architecture

Estado: Aprobado

Contexto: El dominio no debe quedar acoplado a NestJS, Prisma ni proveedores externos.

Decisión: Separar `domain`, `application`, `infrastructure` y `presentation`, usando puertos con tokens explícitos.

Consecuencias positivas:

- Testabilidad.
- Cambio simple de adaptadores.

Consecuencias negativas:

- Más archivos y wiring.

Alternativas consideradas:

- Servicios NestJS acoplados directamente a SDKs y DB.
