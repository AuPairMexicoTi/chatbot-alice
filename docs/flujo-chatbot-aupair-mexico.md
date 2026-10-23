# Flujo del chatbot - Au Pair Mexico

Este es el flujo guiado vigente de ALICE, basado en el guion aprobado de Au
Pair Mexico. Todas las respuestas conservan los emojis y el tono indicados por
negocio.

```text
MENÚ PRINCIPAL
  1. ¿Qué hace una Au Pair?       -> explicación -> contactar / menú
  2. Requisitos para ser Au Pair  -> requisitos -> contactar / menú
  3. Proceso de aplicación        -> cinco pasos -> contactar / menú
  4. Contactar a mi asesor        -> enlace de perfilación
       1. Ya llené mi perfil      -> confirmación y handoff humano
       2. Regresar                -> menú principal
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

## Perfilación y transferencia

En **Contactar a mi asesor**, ALICE solicita nombre, edad (18 a 29 años),
correo, ciudad y nivel de inglés. Con el teléfono de WhatsApp, llama a APM para
crear o reutilizar el lead y recibe su enlace de perfilación único. ALICE no
crea el handoff hasta que la candidata confirma con la opción `1` que ya llenó
su perfil.

Al ocurrir el handoff, ALICE guarda la solicitud y llama a
`CRM_ALICE_HANDOFFS_URL` cuando está configurado. APM/CRM es responsable de
asignar el asesor y abrir o continuar la atención humana en el buzón de
WhatsApp.

## Operación en WhatsApp

El flujo interpreta texto y números, por lo que funciona con mensajes de texto
sin ajustes adicionales en Meta. Si se habilitan listas o botones interactivos
en una futura mejora, el menú de cuatro opciones debe ser una lista (los reply
buttons de WhatsApp admiten solamente tres opciones).

Una plantilla aprobada por Meta es necesaria para iniciar conversaciones o
enviar mensajes fuera de la ventana de atención de 24 horas; el flujo normal,
iniciado por un mensaje de la candidata, no necesita una plantilla nueva.
