# 0004 Asynchronous Webhooks

Estado: Aprobado

Contexto: El webhook no debe esperar la latencia de IA ni el envío outbound.

Decisión: Persistir y encolar, responder rápido, y procesar por BullMQ.

Consecuencias positivas:

- Menor latencia HTTP.
- Mejor resiliencia.

Consecuencias negativas:

- Mayor complejidad operacional.

Alternativas consideradas:

- Procesamiento síncrono completo en el controlador.
