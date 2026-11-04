# Flujo del chatbot - Au Pair Mexico

Este es el flujo guiado vigente de ALICE, basado en el guion aprobado de Au
Pair Mexico. Todas las respuestas conservan los emojis y el tono indicados por
negocio.

```text
MENÚ PRINCIPAL
  1. ¿Qué hace una Au Pair?       -> explicación -> contactar / menú
  2. Requisitos para ser Au Pair  -> requisitos -> contactar / menú
  3. Proceso de aplicación        -> cinco pasos -> contactar / menú
  4. ¿Es seguro y confiable?      -> razones de confianza -> contactar / menú
  5. Contactar a mi asesor        -> handoff humano inmediato
```

## Reglas globales

- `asesor`, `humano` o `ayuda` en cualquier paso transfieren a un asesor.
- `menu` o `inicio` regresan al menú principal.
- `salir` o `cancelar` cierran la conversación con una despedida.
- Audio, imagen, ubicación, sticker o documento piden una respuesta de texto.
- Tres respuestas no reconocidas consecutivas en un paso transfieren a un
  asesor humano.
- Después de una transferencia o cierre, un mensaje posterior inicia el flujo
  de nuevo.

## Contactar a mi asesor y transferencia

**Contactar a mi asesor** (opción 5 del menú, o las palabras clave globales)
transfiere de inmediato a un asesor humano: ALICE ya no solicita nombre, edad,
correo, ciudad ni nivel de inglés antes de la transferencia.

Al ocurrir el handoff, ALICE llama a `CRM_ALICE_HANDOFFS_URL` (cuando está
configurado) con el teléfono de WhatsApp de la candidata. APM/CRM busca el
lead por teléfono (con el correo como respaldo si no lo encuentra) y es
responsable de asignar el asesor y abrir o continuar la atención humana en el
buzón de WhatsApp. Si APM no encuentra el lead, ALICE reinicia el flujo al
menú principal en vez de dejar a la candidata sin respuesta.

## Operación en WhatsApp

El flujo interpreta texto y números, por lo que funciona con mensajes de texto
sin ajustes adicionales en Meta. Si se habilitan listas o botones interactivos
en una futura mejora, el menú de cinco opciones debe ser una lista (los reply
buttons de WhatsApp admiten solamente tres opciones).

Una plantilla aprobada por Meta es necesaria para iniciar conversaciones o
enviar mensajes fuera de la ventana de atención de 24 horas; el flujo normal,
iniciado por un mensaje de la candidata, no necesita una plantilla nueva.
