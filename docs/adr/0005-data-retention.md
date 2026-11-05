# 0005 Data Retention

Estado: Aprobado

Contexto: ALICE guarda todos los mensajes y cada webhook de Meta sin límite de tiempo. El dump de producción del 4 de noviembre de 2026 pesó 116 MB tras unas 3.5 semanas de operación real: 86 MB en `alc_webhook_events` (80 % de sus filas son avisos de estado que la aplicación no usa) y 19 MB en `alc_messages`. Ese ritmo equivale a unos 2.7 GB al año.

Decisión: Un job diario de BullMQ borra de forma irreversible:

- Webhooks con más de 30 días, en cualquier estado. Se borran por fecha porque no tienen llave foránea hacia conversaciones.
- Conversaciones sin actividad durante 6 meses, con sus mensajes y demás hijos, en lotes transaccionales.
- El contacto, cuando se borra su última conversación.

La inactividad se mide con `alc_conversations.updated_at`, no con `status`: ninguna conversación llega a `CLOSED` y las que quedan en `WAITING_HUMAN` tampoco salen de ese estado, así que filtrar por estado impediría borrarlas. Los plazos, el modo simulación y el tamaño de lote se configuran con variables `RETENTION_*`.

Consecuencias positivas:

- El almacenamiento se estabiliza en unos 450 MB al volumen de noviembre de 2026.
- No quedan datos personales de quien lleva 6 meses inactivo, salvo en respaldos.

Consecuencias negativas:

- El número y la fecha de último contacto se pierden, salvo lo que exista en el CRM.
- Los avisos de entrega fallida solo se conservan 30 días.
- Un contacto que sigue escribiendo conserva toda su conversación, aunque tenga mensajes con más de 6 meses.
- El disco no baja solo: Postgres reutiliza el espacio y recuperarlo requiere `VACUUM FULL`.
- Los dumps conservan estos datos hasta que se eliminen.

Alternativas consideradas:

- Tabla histórica de números y fechas de último contacto: descartada, no hay un uso definido.
- Borrar los webhooks junto con su conversación: durarían al menos 6 meses, no cubriría los eventos sin conversación y repetiría texto que ya está en `alc_messages`.
- Dejar de guardar los avisos de estado: reduciría cerca de 145 MB adicionales, pero queda fuera de este alcance.
