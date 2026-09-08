# Flujo del Chatbot — Au Pair México

> Documento de especificación para implementación del chatbot conversacional de Au Pair México. Basado en el guion original (PDF) **+ diagrama de flujo del becario (v3 - con mensajes, draw.io)**. Pensado para pasarse directamente a un asistente de IA/desarrollador y que implemente la lógica de estados y mensajes.
>
> 🟡 = mensaje textual del **guion original** (PDF). 🟠 = mensaje **sugerido por el becario en el diagrama**, no estaba en el guion — validar redacción final con negocio/marketing antes de producción.

---

## 1. Resumen del bot

- **Objetivo:** captar y calificar leads interesados en el programa Au Pair, guiarlos por información de países disponibles, explicar el proceso y derivarlos a un asesor humano.
- **Tipo de interacción:** menú por opciones numeradas/botones (no NLP libre), con un router que interpreta la respuesta del usuario en cada paso.
- **Diferencia clave vs. la v1 de este documento:** el diagrama del becario agrega **manejo de errores, reintentos, límite de intentos con escalamiento automático a asesor humano, atajos globales (palabras clave) y cierre de conversación** — todo esto no estaba en el guion original y es necesario para que el bot sea robusto en producción.
- **Integración sugerida:** conectar el evento final "Ya llené mi perfil" al [[aupair-lead-management|sistema de leads]] existente (Laravel 8 + React/MUI) para crear/actualizar el lead y notificar al asesor asignado.

---

## 2. Reglas globales (aplican en cualquier punto de la conversación)

Estas reglas están documentadas en el diagrama como "notas globales" y deberían implementarse como un **intent-matcher previo** a la lógica de cada estado (no solo en el menú principal, aunque el diagrama las dibuja explícitamente conectadas ahí):

| Entrada del usuario                  | Acción                                                       |
| ------------------------------------ | ------------------------------------------------------------ |
| `asesor` / `humano` / `ayuda`        | Transferir a asesor humano (`TRANSFERIR_ASESOR`)             |
| `menu` / `inicio`                    | Regresar al menú principal (`MENU_PRINCIPAL`)                |
| `salir` / `cancelar`                 | Despedida y cierre de conversación (`DESPEDIDA`)             |
| Audio / imagen / ubicación / sticker | Pedir texto y reenviar las opciones vigentes del paso actual |
| Sin respuesta 24h                    | Enviar recordatorio                                          |
| Sin respuesta 48h más (72h total)    | Cierre por inactividad                                       |
| 3 intentos fallidos en un mismo paso | Transferir automáticamente a asesor humano                   |

> ⚠️ **Nota de implementación:** en el diagrama, los atajos de `asesor` y `salir` están dibujados explícitamente solo desde el router del menú principal (`dMenu`). Para que funcionen como "en cualquier punto de la conversación" (como dice la nota), hay que implementarlos como un middleware/interceptor global que corra antes de la lógica de cada estado, no repetir la rama en cada nodo de decisión.

---

## 3. Modelo de estados (máquina de estados)

```
ESTADOS:
  INICIO
  MENU_PRINCIPAL
  PAISES_DISPONIBLES
  FICHA_PAIS (Alemania | Bélgica | EE.UU. | Francia | Italia | Países Bajos | Suiza)
  QUE_HACE_AUPAIR
  PROCESO_APLICACION
  QUIERO_APLICAR
  CONFIRMACION_ASESOR
  TRANSFERIR_ASESOR       ← nuevo (handoff por keyword o por 3 fallos)
  DESPEDIDA               ← nuevo (cierre por keyword salir/cancelar)
  FIN (3 variantes: seguimiento por asesor / asesor humano continúa / conversación cerrada)
```

### Diagrama de flujo (texto)

```
[INICIO] → [MENU_PRINCIPAL]

[MENU_PRINCIPAL] (mensaje de bienvenida)
 └─ router "dMenu": interpreta 1-4 / asesor / menu / salir / no reconocido
     ├─ 1 → [PAISES_DISPONIBLES]
     ├─ 2 → [QUE_HACE_AUPAIR]
     ├─ 3 → [PROCESO_APLICACION]
     ├─ 4 → [QUIERO_APLICAR]
     ├─ "asesor/ayuda/humano" → [TRANSFERIR_ASESOR]
     ├─ "salir/cancelar" → [DESPEDIDA]
     └─ no reconocido → feedback + intentos+1
           ├─ intentos < 3 → reintenta [MENU_PRINCIPAL]
           └─ intentos >= 3 → [TRANSFERIR_ASESOR]

[PAISES_DISPONIBLES] (lista de 7 países)
 └─ decisión "dPais": país válido / no reconocido
     ├─ país válido → [FICHA_PAIS: <país>]
     └─ no reconocido → feedback + intentos+1
           ├─ intentos < 3 → reintenta [PAISES_DISPONIBLES]
           └─ intentos >= 3 → [TRANSFERIR_ASESOR]

[FICHA_PAIS: <cualquiera de los 7>]
 └─ decisión compartida "dPais2": Aplicar / Regresar / no reconocido (misma lógica para los 7 países)
     ├─ Aplicar → [QUIERO_APLICAR]
     ├─ Regresar → [MENU_PRINCIPAL]
     └─ no reconocido → intentos+1
           ├─ intentos < 3 → reintenta en la misma ficha
           └─ intentos >= 3 → [TRANSFERIR_ASESOR]

[QUE_HACE_AUPAIR]
 └─ decisión "d4": Aplicar / Regresar / no reconocido (máx 3 intentos)
     ├─ Aplicar → [QUIERO_APLICAR]
     ├─ Regresar → [MENU_PRINCIPAL]
     └─ 3 fallos → [TRANSFERIR_ASESOR]

[PROCESO_APLICACION]
 └─ decisión "d5": Aplicar / Regresar / no reconocido (máx 3 intentos)
     ├─ Aplicar → [QUIERO_APLICAR]
     ├─ Regresar → [MENU_PRINCIPAL]
     └─ 3 fallos → [TRANSFERIR_ASESOR]

[QUIERO_APLICAR] (pide perfil + link)
 └─ decisión "d6": [1] Perfil listo/hablar asesor · [2] Regresar / no reconocido (máx 3 intentos)
     ├─ [1] → [CONFIRMACION_ASESOR]
     ├─ [2] → [MENU_PRINCIPAL]
     └─ 3 fallos → [TRANSFERIR_ASESOR]

[CONFIRMACION_ASESOR] → [FIN: seguimiento por asesor]

[TRANSFERIR_ASESOR] → [FIN: asesor humano continúa la conversación]

[DESPEDIDA] → [FIN: conversación cerrada]
```

**Nota de diseño (se mantiene de la v1):** las 7 fichas de país y sus 3 "hermanas" (Qué hace una Au Pair / Proceso / footer de decisión) comparten estructura de mensaje y de decisión — conviene implementarlas como un solo template + una sola máquina de "decisión con reintentos" parametrizable, no 7-10 copias del mismo código.

---

## 4. Contenido de cada mensaje

### 4.1 Bienvenida y Menú Principal (`MENU_PRINCIPAL`) 🟡

```
¡Hola! 👋✨ Te damos la bienvenida a Au Pair Mexico ✈️💖.

Ser Au Pair es un reto personal increíble 🌟: es vivir en el extranjero 🌍,
perfeccionar un idioma 🗣, cuidar los niños de una familia 👨‍👩‍👧 y reinventarte
como persona 🌱.

Estamos avalados por IAPA (International Au Pair Association) 🤝 y WYSE Travel
Confederation 🛡.

¿Cómo te gustaría comenzar tu aventura hoy? 🎒 Selecciona una opción del menú 👇:
```

| Opción | Texto                               | Va a               |
| ------ | ----------------------------------- | ------------------ |
| 1      | 🌍 Países Disponibles 🗺             | PAISES_DISPONIBLES |
| 2      | 👧 ¿Qué hace una Au Pair? 🧸        | QUE_HACE_AUPAIR    |
| 3      | 📋 Proceso General de Aplicación 🚀 | PROCESO_APLICACION |
| 4      | ✨ ¡Ya quiero aplicar! 📝💖         | QUIERO_APLICAR     |

**Feedback de opción no reconocida** 🟠 (sugerido, no en guion original):

> "No entendí tu respuesta. Por favor elige una opción válida del menú: 1, 2, 3 o 4."

---

### 4.2 Países disponibles (`PAISES_DISPONIBLES`) 🟡

```
¡Excelente elección! 🎉 Contamos con 7 destinos increíbles en Europa 🌍 y
Norteamérica 🌎 para nuestros programas. 🗺✨

Elige el país que más te llame la atención para ver todos sus detalles 🔎,
requisitos 📝 y beneficios 🎁:
```

Opciones: Alemania 🥨 · Bélgica 🍫 · Estados Unidos 🗽 · Francia 🥐 · Italia 🍕 · Países Bajos 🌷 · Suiza 🏔

**Feedback de país no reconocido** 🟠:

> "No reconocí ese país. Elige uno de la lista: Alemania, Bélgica, Estados Unidos, Francia, Italia, Países Bajos o Suiza."

---

### 4.3 Fichas por país (`FICHA_PAIS`) 🟡

Cada ficha sigue la misma plantilla:

```
¡[frase gancho del país]!

⏱️ Duración: [X] | [Y] horas semanales ⏰ [+ extras si aplica]
🎁 Beneficios: [lista]
📋 Requisitos: [lista]

📌 Nota: Aplican requisitos adicionales de perfil que evaluaremos contigo
durante tu proceso inicial. 🌟

¿Estás lista para el siguiente paso? 🤔✈️ Selecciona una opción:
  🚀 ¡Ya quiero aplicar!
  🔙 Regresar al menú principal
```

**Tabla de datos por país** (fuente única de verdad — ideal como JSON/tabla en BD, no hardcodeado por duplicado):

| País              | Duración | Hrs/sem                | Apoyo económico             | Edad  | Requisitos extra                                                                                             |
| ----------------- | -------- | ---------------------- | --------------------------- | ----- | ------------------------------------------------------------------------------------------------------------ |
| 🇩🇪 Alemania       | 12 meses | 35                     | €370/mes (€280 + €90 curso) | 18–26 | Mujer soltera sin hijos, prepa terminada                                                                     |
| 🇧🇪 Bélgica        | 12 meses | 20                     | €450/mes                    | 18–25 | Mujer soltera sin hijos, prepa terminada, apoyo idioma (NL/DE/FR)                                            |
| 🇺🇸 Estados Unidos | 12 meses | 45                     | $783 USD/mes                | 18–26 | Mujer soltera sin hijos, prepa terminada                                                                     |
| 🇫🇷 Francia        | 12 meses | 35 + 2 babysitting/mes | €320/mes                    | 18–26 | Mujer soltera sin hijos, prepa terminada                                                                     |
| 🇮🇹 Italia         | 3 meses  | 30                     | €280–320/mes                | 18–28 | Inglés B2/C1 o italiano A2, manejo estándar, natación (opcional), experiencia con niños <2 años, no fumadora |
| 🇳🇱 Países Bajos   | 12 meses | 30                     | €320–340/mes                | 18–25 | Mujer soltera sin hijos                                                                                      |
| 🇨🇭 Suiza          | 12 meses | 30 + 2 babysitting/mes | 600–700 CHF/mes             | 18–25 | **Nacionalidad europea obligatoria**                                                                         |

Beneficios comunes a todos: alimentación y alojamiento, seguro médico (variable por país), certificado Au Pair, supervisión continua. Vacaciones y vuelos incluidos varían por país.

**Decisión compartida "Aplicar / Regresar"** (misma lógica para las 7 fichas, con reintentos — ver sección 3).

---

### 4.4 ¿Qué hace una Au Pair? (`QUE_HACE_AUPAIR`) 🟡

```
👧 ¿Qué hace una Au Pair? 💖🧸

¡Serás la hermana mayor del hogar! 🏡 Apoyarás a la familia anfitriona en el
cuidado de los pequeños 👶 y ¡compartirás tu cultura todos los días! 🌎✨

¿Estás lista para el siguiente paso? 🤔✈️ Selecciona una opción:
  🚀 ¡Ya quiero aplicar!
  🔙 Regresar al menú principal
```

---

### 4.5 Proceso general de aplicación (`PROCESO_APLICACION`) 🟡

```
🚀 ¿Qué sigue? ¡Tu proceso! 🗺✈️

1️⃣ Completa tu expediente: 📂 Entrega toda tu documentación y cumple con
   los requisitos.
2️⃣ Elige una familia: 👨‍👩‍👧 Haz match con tu familia ideal.
3️⃣ Tramita tu visa: 🛂 Es momento de tramitarla e irte despidiendo de tus
   amigos.
4️⃣ ¡Disfruta la experiencia! 🎉 Vive el mejor año de tu vida.

¿Estás lista para el siguiente paso? 🤔✈️ Selecciona una opción:
  🚀 ¡Ya quiero aplicar!
  🔙 Regresar al menú principal
```

---

### 4.6 Ya quiero aplicar (`QUIERO_APLICAR`) 🟡

```
¡Tu aventura ya comenzó! ✈️🤔
Necesitamos conocer tu perfil 🌟.

Cuéntanos de ti en el siguiente link ⏱️
👉 [Inserta aquí tu link de perfilación] 🔗
```

| Opción | Texto                                           | Va a                |
| ------ | ----------------------------------------------- | ------------------- |
| 1      | ✅ Ya llené mi perfil / 💬 Hablar con un Asesor | CONFIRMACION_ASESOR |
| 2      | 🏠 Regresar al menú principal                   | MENU_PRINCIPAL      |

(Con reintentos si la opción no se reconoce — ver sección 3.)

---

### 4.7 Confirmación y transferencia al asesor (`CONFIRMACION_ASESOR`) 🟡

> Se activa **únicamente** si el usuario presiona "[1] Ya llené mi perfil ✅" en `QUIERO_APLICAR`.

```
¡Excelente! 🙌 Tu asesor asignado se pondrá en contacto contigo por este
medio o por llamada telefónica. 📞✨

¡Activa tus notificaciones! 🔔💖
```

→ Fin del flujo automatizado (seguimiento por asesor).

---

### 4.8 Transferencia a asesor humano (`TRANSFERIR_ASESOR`) 🟠 — nuevo, no estaba en el guion

Se dispara por:

- Palabra clave `asesor` / `humano` / `ayuda` en cualquier momento.
- 3 intentos fallidos consecutivos en cualquier paso de decisión.

```
Listo, te voy a comunicar con un asesor humano. En breve te contactará por
este medio o por llamada. ¡Activa tus notificaciones!
```

→ Fin: el asesor humano continúa la conversación (el bot deja de responder automáticamente en este hilo).

---

### 4.9 Despedida y cierre (`DESPEDIDA`) 🟠 — nuevo, no estaba en el guion

Se dispara por palabra clave `salir` / `cancelar`.

```
¡Gracias por tu tiempo! Si en otro momento quieres retomar tu aventura como
Au Pair, aquí estaré. ¡Que tengas un excelente día!
```

→ Fin: conversación cerrada.

---

## 5. Notas para implementación

1. **Botones vs. texto libre:** el guion usa emoji-bullets como opciones fijas (menú tipo WhatsApp Business API / botones interactivos). Si se implementa en WhatsApp, usar `interactive list message` o `reply buttons` según el límite de opciones (WhatsApp permite máx. 3 botones o hasta 10 en lista).
2. **Datos de países como configuración, no hardcode:** la tabla de la sección 4.3 debería vivir en una tabla/colección editable (para que marketing pueda actualizar montos de apoyo, requisitos, etc. sin tocar código).
3. **Plantilla única para fichas de país + decisión compartida:** las 7 fichas comparten estructura de mensaje Y la misma máquina de decisión "Aplicar/Regresar con reintentos" (nodo `dPais2` en el diagrama) — implementar como un solo componente parametrizado, no 7 copias.
4. **Contador de intentos por paso:** cada nodo de decisión (`dMenu`, `dPais`, `dPais2`, `d4`, `d5`, `d6`) necesita su propio contador de intentos fallidos en el estado de la conversación (ej. Redis/sesión), reseteado al entrar a un nuevo estado. Al llegar a 3, escalar automáticamente a `TRANSFERIR_ASESOR`.
5. **Middleware global de intención:** implementar la detección de `asesor/menu/salir` y de inputs no-texto (audio/imagen/ubicación/sticker) como un interceptor que corre **antes** de la lógica de cualquier estado, para que funcione "en cualquier punto de la conversación" tal como indica la nota del diagrama (y no solo desde el menú principal, que es donde está dibujado explícitamente).
6. **Inactividad:** requiere un job/cron o mecanismo de scheduling (ej. delayed jobs) para el recordatorio a las 24h y el cierre a las 48h adicionales sin respuesta.
7. **Link de perfilación:** ALICE lo solicita a APM después de guardar los datos mínimos del lead (`name`, `age`, `phone`, `email`, `city` y `englishLevel`). APM crea o reutiliza el lead y devuelve el enlace personalizado `/perfilacion/{leadId}`. ALICE muestra el enlace y las opciones `[1] Ya llené / Hablar con asesor` y `[2] Regresar`; la confirmación de asesor se envía solo tras elegir `[1]`.
8. **Placeholder de asesor:** falta definir la lógica de asignación de asesor (round robin, por país elegido, etc.) — no está especificada ni en el guion ni en el diagrama.
9. **Mensajes 🟠 pendientes de validar:** los mensajes de feedback de error, transferencia a asesor y despedida son sugerencias del becario, no vinieron en el guion original — conviene que negocio/marketing los revise y apruebe el tono antes de ir a producción.
10. **Conexión con backend existente:** el flujo de captación aquí descrito calza con el módulo de leads de [[aupair-lead-management]] (Laravel 8 + React/MUI en AWS) — evaluar si "Ya llené mi perfil" o el handoff a asesor disparan un webhook/evento contra ese sistema para marcar el lead como calificado y asignar asesor.
