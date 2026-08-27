# Plan: Motor de Flujo Conversacional (ALICE)

## Objetivo

Definir la estructura técnica que permite representar un flujo conversacional
dentro de `chatbot-alice`: **nodos, transiciones, condiciones, estados** y la
**estrategia de recuperación de contexto por conversación**, sin acoplar el
dominio a la infraestructura y respetando la arquitectura hexagonal / monolito
modular vigente.

Referencia de negocio: `chatbot_aupair_flujo.json` (flujo Au Pair México v3), un
export tipo diagrama con `nodes` y `edges` que este diseño debe poder
representar de forma canónica.

## Criterios de aceptación y dónde se cubren

| Criterio | Sección |
| --- | --- |
| Cómo se representan nodos y transiciones | [2. Modelo de definición del flujo](#2-modelo-de-definición-del-flujo) |
| Cómo se almacena el estado actual de la conversación | [3. Estado de la conversación](#3-estado-de-la-conversación) |
| Persistencia y recuperación del estado por usuario (paso actual + datos capturados) | [3.4 Contrato de persistencia y recuperación del estado](#34-contrato-de-persistencia-y-recuperación-del-estado) |
| Lógica de recorrido: mostrar el mensaje del paso, evaluar respuestas y dirigir a la rama siguiente | [4. Algoritmo del motor (dominio puro)](#4-algoritmo-del-motor-dominio-puro) |
| Carga e implementación de los textos del guion oficial (bienvenida, continuidad, cierre, error) | [6. Contenido del guion oficial](#6-contenido-del-guion-oficial-carga-e-implementación-de-textos) |
| Comportamiento de reinicio, abandono, retoma y fallback | [5. Ciclo de vida: reinicio / abandono / retoma / fallback](#5-ciclo-de-vida-reinicio--abandono--retoma--fallback) |
| Compatibilidad con la arquitectura actual | [1. Encaje arquitectónico](#1-encaje-arquitectónico) y [7. Impacto en el código existente](#7-impacto-en-el-código-existente) |

---

## 1. Encaje arquitectónico

### 1.1 Módulo nuevo

```
src/modules/conversation-flow/
  domain/
    flow-definition.ts          # tipos puros: FlowDefinition, FlowNode, FlowTransition, FlowCondition
    flow-state.entity.ts        # entidad ConversationFlowState (sin dependencias externas)
    flow-effect.ts              # efectos declarativos (SEND_MESSAGE, REQUEST_HANDOFF, ...)
    flow-engine.ts              # servicio de dominio PURO: advance(definition, state, input) => StepResult
  application/
    ports/
      flow-definition.repository.ts
      conversation-flow-state.repository.ts
      flow-transition-log.repository.ts
      intent-classifier.port.ts        # opcional (v2), con mock por defecto
    use-cases/
      advance-conversation-flow.use-case.ts
      reset-conversation-flow.use-case.ts
      run-flow-maintenance.use-case.ts  # recordatorio / cierre por inactividad
  infrastructure/
    repositories/
      prisma-conversation-flow-state.repository.ts
      in-memory-conversation-flow-state.repository.ts
      prisma-flow-definition.repository.ts
      in-memory-flow-definition.repository.ts
    cache/
      redis-flow-state.cache.ts
    loaders/
      json-flow-definition.loader.ts   # carga y valida el JSON canónico al boot
    jobs/
      flow-maintenance.processor.ts     # BullMQ
  presentation/                          # opcional / fase posterior (admin de definiciones)
  conversation-flow.module.ts
```

Reglas respetadas:

- `domain` no importa NestJS, Prisma, Redis, BullMQ ni SDKs. `FlowEngine` son
  funciones puras que reciben datos y devuelven `{ nextState, effects[] }`.
- `application` define puertos con tokens `Symbol` (patrón ya usado en el repo).
- `infrastructure -> application/domain`; los adaptadores implementan los puertos.
- Sin microservicios ni n8n nuevos (ADR 0001). El motor vive dentro del monolito.
- Prefijo `alc_` en tablas nuevas.
- Repos in-memory para tests (patrón `persistence/infrastructure/repositories`).

### 1.2 Punto de integración

El motor se inserta en `ProcessInboundWhatsAppMessageUseCase`
(`src/modules/whatsapp/application/use-cases/process-inbound-whatsapp-message.use-case.ts`),
entre la persistencia del mensaje inbound y el fallback de IA:

```
inbound persistido
   -> ¿existe ConversationFlowState ACTIVE/WAITING_INPUT?
        SÍ  -> AdvanceConversationFlowUseCase  (el flujo "posee" la conversación)
        NO  -> ResolveAutoReplyUseCase (FAQ por palabra clave)
            -> si no hay match: bootstrap del flujo en el nodo de entrada
            -> AdvanceConversationFlowUseCase
   -> si el motor falla o el nodo delega en IA: GenerateConversationReplyUseCase
```

`AdvanceConversationFlowUseCase` produce **efectos declarativos** que se ejecutan
con los casos de uso ya existentes:

| Efecto | Ejecutor existente |
| --- | --- |
| `SEND_MESSAGE` | `messageRepository.create(OUTBOUND, QUEUED)` + `QueueOutboundMessageUseCase` |
| `REQUEST_HANDOFF` | `RequestHumanHandoffUseCase` (ya pone `Conversation.status = WAITING_HUMAN`) |
| `CLOSE_CONVERSATION` | `conversationRepository.updateStatus(CLOSED)` |
| `SCHEDULE_REMINDER` / `CANCEL_REMINDER` | job BullMQ retardado (`flow-maintenance`) |
| `SET_VARIABLE` | ya aplicado dentro del `nextState` |

Así el dominio queda libre de infraestructura y se reutiliza todo el wiring
actual de colas y handoff.

---

## 2. Modelo de definición del flujo

### 2.1 Fuente y versionado

- Los flujos se **autoran como JSON canónico** (no se interpreta el export de
  draw.io en runtime; un script offline lo transforma al esquema canónico).
- Se persisten en `alc_flow_definitions` con `key` + `version` + `status`
  (`DRAFT` / `PUBLISHED` / `ARCHIVED`) + `graph` (JSON) + `checksum`.
- Al boot, `JsonFlowDefinitionLoader` valida el grafo (ids únicos, `entryNodeId`
  existe, todo `transition.to` apunta a un nodo real, no hay nodos huérfanos) y
  lo cachea en memoria.
- Cada `ConversationFlowState` queda **anclado a `flowKey` + `flowVersion`**: una
  publicación nueva no rompe conversaciones en curso.

### 2.2 Esquema canónico (tipos de dominio)

```ts
interface FlowDefinition {
  key: string;
  version: number;
  locale: string;                 // 'es-MX'
  entryNodeId: string;
  globals: FlowGlobals;
  nodes: FlowNode[];
}

interface FlowGlobals {
  maxAttemptsPerNode: number;      // 3 (Notas globales del diagrama)
  maxChainedHops: number;          // 20: guarda anti-bucle al encadenar nodos sin input
  reminderAfter: string;           // '24h' sin respuesta -> recordatorio
  closeAfter: string;              // '48h' tras el recordatorio -> cierre
  nonTextBehavior: 'REPROMPT';     // audio/imagen/ubicación/sticker -> pedir texto
  interceptors: GlobalInterceptor[]; // palabras clave activas en cualquier punto
}

interface GlobalInterceptor {
  match: string[];                 // ['asesor', 'humano', 'ayuda']
  action:
    | { kind: 'GOTO'; nodeId: string; keepVariables: boolean }  // 'menu' / 'inicio'
    | { kind: 'HANDOFF'; reason: string }                       // 'asesor'
    | { kind: 'CLOSE'; nodeId: string };                        // 'salir' / 'cancelar'
}

interface FlowNode {
  id: string;
  type: 'MESSAGE' | 'PROMPT' | 'DECISION' | 'ACTION' | 'TERMINAL';
  content?: string;               // texto exacto del guion; soporta {{variable}}
  imageUrl?: string;
  expects?: 'TEXT' | 'OPTION' | 'NONE';
  onEnter?: FlowEffectSpec[];     // efectos al entrar (enviar mensaje, llamar tool)
  transitions: FlowTransition[];  // evaluadas por prioridad ascendente
  retry?: {
    max?: number;                 // default: globals.maxAttemptsPerNode
    fallbackContent?: string;     // mensaje de reintento
    onExhausted: string;          // nodeId | 'HANDOFF'
  };
  terminal?: { outcome: 'CLOSED' | 'AWAITING_HUMAN' };
}

interface FlowTransition {
  id: string;
  to: string;                     // nodeId destino
  priority: number;               // menor = se evalúa antes
  when: FlowCondition;
  setVariables?: Record<string, string>;
}

type FlowCondition =
  | { kind: 'ALWAYS' }
  | { kind: 'EQUALS'; value: string; normalize?: boolean }
  | { kind: 'ONE_OF'; values: string[] }
  | { kind: 'REGEX'; pattern: string; flags?: string }
  | { kind: 'VARIABLE'; name: string; op: 'eq' | 'neq' | 'gte' | 'lte'; value: string | number }
  | { kind: 'ATTEMPTS_GTE'; value: number }
  | { kind: 'INTENT'; intent: string }   // opcional v2, vía IntentClassifierPort
  | { kind: 'FALLBACK' };                 // gana solo si nada más matcheó
```

- **Nodos** = `FlowNode`. Tipos: `MESSAGE` (informa y avanza), `PROMPT` /
  `DECISION` (espera input y ramifica), `ACTION` (efecto lateral sin input, p. ej.
  `start`), `TERMINAL` (cierre o handoff).
- **Transiciones** = aristas dirigidas embebidas en el nodo origen, ordenadas por
  `priority`. La normalización de texto (minúsculas, sin acentos, colapso de
  espacios) reutiliza la lógica ya presente en `ResolveAutoReplyUseCase`.
- **Condiciones** = `FlowCondition` tipada y evaluada por una función pura
  `evaluate(condition, ctx): boolean`, con `ctx = { normalizedText, rawText,
  messageType, attempts, variables, now }`.

### 2.3 Mapeo del diagrama Au Pair al esquema

| Elemento del JSON | Representación canónica |
| --- | --- |
| `start` "Inicio" | `ACTION`, `entryNodeId`, transición `ALWAYS -> menu` |
| `menu` + `menuNote` | `DECISION`, `content` = texto de `menuNote`, `expects: 'OPTION'` |
| aristas `dMenu` con label `1..4` | transiciones `EQUALS "1" -> n2`, ... `"4" -> n6` |
| labels `asesor / ayuda / humano`, `salir / cancelar` | `globals.interceptors` (además de transiciones locales) |
| `fbMenu` + `dMenuRetry` (`intentos >= 3?`) | `menu.retry = { max: 3, fallbackContent: fbMenuNote, onExhausted: 'HANDOFF' }` |
| fichas `cAle..cSui` + notas | nodos `MESSAGE` con `content` de cada `*Note`, transición a `dPais2` |
| `dPais` "Selecciona país" | `DECISION` con `ONE_OF`/`REGEX` por país + `FALLBACK` a retry |
| `dPais2` / `d4` / `d5` / `d6` "Aplicar / Regresar (máx 3)" | `DECISION` con `retry.onExhausted: 'HANDOFF'` |
| `handoffAsesor` -> `endHandoff` | `TERMINAL { outcome: 'AWAITING_HUMAN' }` + efecto `REQUEST_HANDOFF` |
| `despedida` -> `endDespedida` | `TERMINAL { outcome: 'CLOSED' }` + efecto `CLOSE_CONVERSATION` |
| Notas globales (24h / 48h / 3 intentos / multimedia) | `globals` |

Conclusión: el diagrama es representable sin pérdida.

---

## 3. Estado de la conversación

### 3.1 Fuente de verdad: PostgreSQL

Nueva migración (no se tocan migraciones aplicadas). Se añade una relación en
`Conversation` y dos tablas nuevas + un enum.

```prisma
enum FlowStateStatus {
  ACTIVE          // en curso, no espera input (nodos MESSAGE/ACTION encadenados)
  WAITING_INPUT   // esperando respuesta del usuario en un DECISION/PROMPT
  AWAITING_HUMAN  // derivado a asesor
  COMPLETED       // terminó en un TERMINAL de cierre
  ABANDONED       // cerrado por inactividad
}

enum FlowDefinitionStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model ConversationFlowState {
  id                String          @id @default(uuid())
  conversationId    String          @unique @map("conversation_id")
  flowKey           String          @map("flow_key")
  flowVersion       Int             @map("flow_version")
  currentNodeId     String          @map("current_node_id")
  previousNodeId    String?         @map("previous_node_id")
  status            FlowStateStatus @default(ACTIVE)
  attempts          Int             @default(0)   // fallos consecutivos en currentNode
  variables         Json                            // slots recolectados
  archivedVariables Json?           @map("archived_variables") // snapshot al abandonar
  lastInteractionAt DateTime        @map("last_interaction_at")
  reminderSentAt    DateTime?       @map("reminder_sent_at")
  conversation      Conversation    @relation(fields: [conversationId], references: [id], onDelete: Restrict)
  createdAt         DateTime        @default(now()) @map("created_at")
  updatedAt         DateTime        @updatedAt @map("updated_at")

  @@index([status, lastInteractionAt], map: "idx_alc_conversation_flow_states_status_last_interaction")
  @@map("alc_conversation_flow_states")
}

model FlowTransitionLog {   // append-only: auditoría, analítica y depuración de "retoma"
  id             String   @id @default(uuid())
  conversationId String   @map("conversation_id")
  fromNodeId     String?  @map("from_node_id")
  toNodeId       String   @map("to_node_id")
  matchedRule    String?  @map("matched_rule")   // transition.id | 'INTERCEPTOR' | 'RETRY' | 'RESET'
  inputText      String?  @map("input_text")
  reason         String                            // 'MATCH' | 'FALLBACK' | 'RETRY_EXHAUSTED' | 'RESUME' | 'ABANDON'
  createdAt      DateTime @default(now()) @map("created_at")

  @@index([conversationId, createdAt], map: "idx_alc_flow_transition_logs_conversation_created_at")
  @@map("alc_flow_transition_logs")
}

model FlowDefinition {
  id          String               @id @default(uuid())
  key         String
  version     Int
  status      FlowDefinitionStatus  @default(DRAFT)
  graph       Json
  checksum    String
  createdAt   DateTime              @default(now()) @map("created_at")
  publishedAt DateTime?             @map("published_at")

  @@unique([key, version])
  @@map("alc_flow_definitions")
}
```

Diseño clave:

- **1 estado activo por conversación** (`conversationId @unique`). El historial de
  posiciones vive en `FlowTransitionLog`, no en la fila de estado.
- `attempts` es el contador de fallos consecutivos del nodo actual (para el
  fallback de 3 intentos). Se pone a `0` en cada transición exitosa.
- `variables` guarda los slots (`selectedCountry`, `profileSubmitted`, ...) para
  interpolar `content` y para condiciones `VARIABLE`.
- `Conversation.status` (`OPEN` / `WAITING_HUMAN` / `CLOSED`) sigue siendo el
  estado macro; `FlowStateStatus` es el estado fino del flujo. El motor los
  mantiene coherentes vía efectos (`REQUEST_HANDOFF`, `CLOSE_CONVERSATION`).

### 3.2 Acelerador: Redis (opcional, write-through)

- Clave `flow:state:{conversationId}` con el `ConversationFlowState` serializado,
  TTL deslizante (p. ej. 30 min).
- Lectura: Redis -> Postgres -> (si no existe) bootstrap en `entryNodeId`.
- Escritura: siempre a Postgres (verdad) y de forma best-effort a Redis. Si Redis
  cae, el motor sigue funcionando contra Postgres (patrón de `RedisService`
  actual con `maxRetriesPerRequest: 1`).

### 3.3 "Contexto" de la conversación = 3 capas

1. **Posición determinista**: `currentNodeId` + `previousNodeId` + `attempts`.
2. **Memoria estructurada**: `variables` (slots) + `archivedVariables`.
3. **Contexto conversacional**: historial de mensajes ya disponible vía
   `messageRepository.listRecentByConversationId` (lo usa hoy
   `GenerateConversationReplyUseCase`); se pasa a la IA solo en nodos que
   delegan en IA o en el fallback de error.

### 3.4 Contrato de persistencia y recuperación del estado

Historia de implementación: *guardar y recuperar el estado conversacional por
usuario, de forma que cada conversación conserve el paso actual del flujo y los
datos capturados hasta ese momento.*

"Por usuario" se materializa como **por conversación**: `Contact` (teléfono /
`externalId`) → `Conversation` → un único `ConversationFlowState`
(`conversationId @unique`). `getOrCreateByContactId` (ya existente) garantiza una
conversación estable por contacto.

#### 3.4.1 Puerto (application)

```ts
export interface NewConversationFlowState {
  conversationId: string;
  flowKey: string;
  flowVersion: number;
  currentNodeId: string;
  variables: Record<string, JsonValue>;
}

export interface ConversationFlowStateRepository {
  findByConversationId(conversationId: string): Promise<ConversationFlowState | null>;
  create(input: NewConversationFlowState): Promise<ConversationFlowState>;
  /** upsert por conversationId; concurrencia optimista con `updatedAt` */
  save(state: ConversationFlowState): Promise<ConversationFlowState>;
}

export const CONVERSATION_FLOW_STATE_REPOSITORY = Symbol(
  'CONVERSATION_FLOW_STATE_REPOSITORY',
);
```

Adaptadores: `PrismaConversationFlowStateRepository` (verdad) e
`InMemoryConversationFlowStateRepository` (tests), siguiendo el patrón de
`src/modules/persistence/infrastructure/repositories`.

#### 3.4.2 Servicio de carga/guardado (`FlowStateService`, application)

```
load(conversationId): ConversationFlowState | null
  1. cache.get('flow:state:{conversationId}')      -> hit  => return
  2. repo.findByConversationId(conversationId)     -> found => cache.set; return
  3. return null                                    (el llamador decide bootstrap)

persist(state):
  next = repo.save(state)          // Postgres = fuente de verdad
  cache.set('flow:state:{id}', next, ttl=30m)   // best-effort; si Redis cae, se ignora
  return next

bootstrap(conversationId, definition):
  return persist(repo.create({
    conversationId,
    flowKey: definition.key,
    flowVersion: definition.version,
    currentNodeId: definition.entryNodeId,
    variables: {},
  }))   // previousNodeId=null, status=ACTIVE, attempts=0, lastInteractionAt=now
```

#### 3.4.3 Datos capturados (`variables`)

- Cada transición aplica `setVariables` y cada `onEnter` de captura hace *merge*
  sobre `state.variables` (nunca reemplazo total): `variables = { ...prev,
  ...captured }`.
- Los datos parciales **sobreviven al fallback**: un `attempts++` por no-match no
  toca `variables`. Solo el reinicio duro (`reiniciar`) y el abandono mueven
  `variables` a `archivedVariables`.
- Ejemplo Au Pair: `selectedCountry` se fija en la transición `dPais -> cAle`;
  `profileSubmitted` en `d6 -> n7`; ambos quedan disponibles para interpolar
  `content` (`{{selectedCountry}}`) y para condiciones `VARIABLE`.

#### 3.4.4 Actualización según el tipo de movimiento

| Movimiento | Efecto en el estado |
| --- | --- |
| **Avanzar** (transición normal, incl. aristas "hacia atrás" del grafo como `dPais2 -> menu`) | `previousNodeId = currentNodeId`; `currentNodeId = transition.to`; `attempts = 0`; merge `setVariables`; `status = ACTIVE \| WAITING_INPUT \| COMPLETED`. |
| **Retroceder** (interceptor `atras` / `regresar`) | `GOTO` a `previousNodeId` (un nivel; si es `null`, a `entryNodeId`); `keepVariables: true`; `attempts = 0`; log `reason='BACK'`, `matchedRule='INTERCEPTOR'`. Historia profunda multi-nivel: fuera de v1 — el rastro completo está en `alc_flow_transition_logs` si se necesita reconstruir. |
| **Escalar** (efecto `REQUEST_HANDOFF`: interceptor `asesor`, `retry.onExhausted`, o nodo terminal de handoff) | `status = AWAITING_HUMAN`; `currentNodeId` se conserva (permite retomar tras el handoff); se cancelan los jobs de mantenimiento; `RequestHumanHandoffUseCase` pone `Conversation.status = WAITING_HUMAN`. |
| **Cerrar** (terminal de despedida / abandono) | `status = COMPLETED \| ABANDONED`; `variables -> archivedVariables`; `CLOSE_CONVERSATION`. |

Cada `persist` va acompañado de un `FlowTransitionLogRepository.append(...)` en la
misma unidad lógica de trabajo, de modo que el paso actual y su historia quedan
siempre consistentes.

#### 3.4.5 Conversaciones nuevas vs. reanudadas

```
onInboundMessage(conversationId, message):
  state = flowStateService.load(conversationId)

  if state == null:                      # CONVERSACIÓN NUEVA
      state = flowStateService.bootstrap(conversationId, definition)
      emit(SEND_MESSAGE(entryNode.content))       # Bienvenida + menú
      # el mismo mensaje entrante se procesa a continuación contra el nodo de entrada

  else if state.status in (COMPLETED, ABANDONED):   # REANUDACIÓN tras cierre
      archive(state.variables); state = flowStateService.bootstrap(...)   # reinicio (§5.1)

  else:                                  # REANUDACIÓN en curso (§5.3)
      age = now - state.lastInteractionAt
      if age >= closeWindow: treat as abandono -> reinicio
      else if age >= reminderAfter: emit(SEND_MESSAGE("Retomamos donde lo dejaste:")) ; re-enviar currentNode.content
      # si age < reminderAfter -> retoma silenciosa

  result = FlowEngine.advance(definition, state, toInput(message))
  result.nextState.lastInteractionAt = now
  flowStateService.persist(result.nextState)
  flowTransitionLogRepo.append(result.log)
  execute(result.effects)
  rescheduleMaintenanceJobs(result.nextState)
```

#### 3.4.6 Concurrencia (dos mensajes casi simultáneos)

- Preferente: procesar el inbound **en orden por conversación** usando la cola
  BullMQ existente con clave/`groupId = conversationId` (FIFO por conversación).
- Defensa adicional: `save` usa concurrencia optimista sobre `updatedAt`; si
  detecta escritura concurrente, recarga y reintenta `advance` una vez.
- La caché Redis nunca es fuente de verdad: ante duda, se relee de Postgres.

#### 3.4.7 Cobertura de los criterios de aceptación

| Criterio | Mecanismo |
| --- | --- |
| Identificar en qué paso va cada conversación | `alc_conversation_flow_states.current_node_id` con `conversation_id @unique`; `load()` lo resuelve en O(1). |
| El estado se conserva entre mensajes sucesivos | Postgres = verdad + `persist()` write-through tras cada mensaje; Redis solo acelera. |
| Actualización al avanzar / retroceder / escalar | Tabla de §3.4.4; toda mutación pasa por `FlowEngine.advance` → `persist` + log. |
| Conversaciones nuevas y reanudadas | `bootstrap()` para nuevas; ramas de reanudación de §3.4.5 + §5.3 (retoma) y §5.1 (reinicio). |

---

## 4. Algoritmo del motor (dominio puro)

`FlowEngine.advance(definition, state, input): StepResult`

```
StepResult = { nextState: ConversationFlowState; effects: FlowEffect[]; log: FlowTransitionLog }
```

Pasos:

1. **Construir contexto** `ctx` a partir de `input` (texto, texto normalizado,
   `messageType`, `attempts`, `variables`, `now`).
2. **Interceptores globales**: si `normalizedText` matchea un `globals.interceptor`
   -> aplicar su acción (`GOTO` / `HANDOFF` / `CLOSE`), `attempts = 0`, emitir el
   mensaje del nodo destino, `return`.
3. **Entrada no textual**: si `messageType != TEXT` y `currentNode.expects` es
   `TEXT`/`OPTION` -> emitir reprompt (`content` vigente), **sin** incrementar
   `attempts`, `return`.
4. **Evaluar transiciones** de `currentNode` por `priority` ascendente,
   ignorando `FALLBACK`. Empate de `priority` -> gana el orden de declaración en
   la definición (estable). La primera cuyo `when` pasa:
   - `previousNodeId = currentNodeId`; `currentNodeId = transition.to`;
     `attempts = 0`; aplicar `setVariables`.
   - Ejecutar `onEnter` del nodo destino + emitir `SEND_MESSAGE(content)`
     (ver §4.1 para la resolución del texto).
   - Si destino `TERMINAL` -> `status = COMPLETED | AWAITING_HUMAN` + efecto de
     cierre/handoff.
   - Si destino espera input -> `status = WAITING_INPUT` + `SCHEDULE_REMINDER`.
   - Si destino es `MESSAGE`/`ACTION` sin `expects` -> `status = ACTIVE` y se
     encadena internamente (`ALWAYS` / condiciones sobre `variables`) hasta llegar
     a un nodo que espera input o a un terminal. **Guarda anti-bucle**: máximo
     `globals.maxChainedHops` (p. ej. 20) por mensaje; si se excede, error de
     definición -> fallback de motor (§5.4 nivel 3).
5. **Ningún match** (respuesta fuera de flujo) -> `attempts++`.
   - Si `attempts >= (currentNode.retry.max ?? globals.maxAttemptsPerNode)` ->
     seguir `retry.onExhausted` (`'HANDOFF'` por defecto): `status =
     AWAITING_HUMAN` + `REQUEST_HANDOFF`. `reason = 'RETRY_EXHAUSTED'`.
   - Si no -> tomar la transición `FALLBACK` explícita si existe; si no, emitir
     reprompt con `retry.fallbackContent` + reenviar `currentNode.content`.
     `status = WAITING_INPUT`. `reason = 'FALLBACK'`.
6. Devolver `nextState`, `effects`, `log`. La capa de aplicación **persiste**
   (`ConversationFlowStateRepository.save` + `FlowTransitionLogRepository.append`)
   y **ejecuta los efectos**.

`advance` **no hace E/S**: no lee repos, colas ni relojes del sistema. Todo lo
que necesita entra por `definition`, `state` e `input` (incluido `input.now`), y
todo lo que produce sale como `nextState` + `effects` declarativos. Esto la hace
pura, determinística y testeable con tablas de casos.

### 4.1 Resolución del mensaje a mostrar

El motor nunca escribe en WhatsApp; solo emite `SEND_MESSAGE`. El texto se
resuelve, en orden:

1. `node.content` (texto inline de la definición; en Au Pair es el literal de las
   notas del diagrama). Reprompt/retoma reenvían este mismo `content`.
2. Interpolación de `{{variable}}` con `state.variables` (p. ej.
   `{{selectedCountry}}`). Variable ausente -> cadena vacía + warning en log.
3. `node.imageUrl` opcional -> el efecto lleva `type: 'IMAGE'` (igual que hoy en
   `ProcessInboundWhatsAppMessageUseCase` con auto-replies con imagen).

El "mensaje correcto según el paso actual" sale siempre de `currentNodeId`: al
avanzar se emite el `content` del destino; en fallback/retoma se reemite el
`content` del nodo actual.

### 4.2 Cierre del flujo

Un nodo `TERMINAL` define su salida con `terminal.outcome`:

| `outcome` | `FlowStateStatus` | `Conversation.status` | Efectos |
| --- | --- | --- | --- |
| `CLOSED` | `COMPLETED` | `CLOSED` | `SEND_MESSAGE(despedida)` + `CLOSE_CONVERSATION` + cancelar jobs de mantenimiento |
| `AWAITING_HUMAN` | `AWAITING_HUMAN` | `WAITING_HUMAN` | `SEND_MESSAGE(confirmación)` + `REQUEST_HANDOFF` + cancelar jobs |

Tras un terminal, un inbound nuevo re-arranca el flujo (§3.4.5): `COMPLETED` ->
reinicio en `entryNodeId`; `AWAITING_HUMAN` -> lo maneja el asesor y el motor no
responde salvo interceptor explícito. Mapeo Au Pair: `endDespedida` -> `CLOSED`;
`endHandoff` / `end` -> `AWAITING_HUMAN`.

### 4.3 Cobertura de los criterios de aceptación

| Criterio | Mecanismo |
| --- | --- |
| Avance determinístico entre nodos | `advance` sin E/S (§4); transiciones ordenadas por `priority` + orden de declaración; sin `INTENT` en v1. Tests golden sobre `aupair.flow.json`. |
| Ramas condicionales según la respuesta | `FlowCondition` tipada (§2.2) evaluada por `evaluate(condition, ctx)`; paso 4 toma la primera que pasa. Cubre labels `1..4`, país, `aplicar`/`regresar`. |
| Respuestas fuera de flujo con fallback controlado | Paso 3 (no textual, sin gastar intento) + paso 5 (`FALLBACK` / reprompt, `attempts++`, `onExhausted` a los 3) + §5.4 nivel 3 (error de motor -> IA). |
| Cierre al llegar a una salida definida | §4.2: `TERMINAL` -> `COMPLETED`/`AWAITING_HUMAN` + `CLOSE_CONVERSATION`/`REQUEST_HANDOFF`; jobs cancelados. |

---

## 5. Ciclo de vida: reinicio / abandono / retoma / fallback

### 5.1 Reinicio (reinicio)

Disparadores:

- Comando explícito: interceptor `menu` / `inicio` (`GOTO` al nodo `menu`,
  `keepVariables: true`), o `reiniciar` (`GOTO` a `entryNodeId`,
  `keepVariables: false`).
- Retroceso de un nivel: interceptor `atras` / `regresar` (`GOTO`
  `previousNodeId`, `keepVariables: true`) — ver §3.4.4. No confundir con
  "Regresar al menú" del guion, que es `GOTO menu`.
- Expiración por abandono (ver 5.2): se arranca de nuevo en `entryNodeId`.
- Llegada de un mensaje nuevo con `status COMPLETED`: se crea un
  `ConversationFlowState` nuevo en `entryNodeId` (la conversación se reabre;
  `Conversation.status` vuelve a `OPEN`).

Efecto: `currentNodeId` = destino, `previousNodeId = null` (o el anterior si es
`GOTO menu`), `attempts = 0`, log `reason = 'RESET'`, emitir el mensaje del nodo
destino. Retención de `variables`: **configurable por interceptor** (`GOTO menu`
las conserva; `reiniciar` las limpia moviéndolas a `archivedVariables`).

### 5.2 Abandono (abandono)

Basado en las Notas globales del diagrama (24h / +48h):

- Al entrar en `WAITING_INPUT` se programan **jobs BullMQ retardados por
  conversación** (más baratos y precisos que un sweep periódico):
  - `flow:reminder:{conversationId}` a `+globals.reminderAfter` (24h).
  - `flow:close:{conversationId}` a `+globals.reminderAfter + globals.closeAfter`
    (72h totales).
- Cada inbound **cancela y reprograma** esos jobs.
- `flow:reminder` (`RunFlowMaintenanceUseCase`): si el estado sigue en
  `WAITING_INPUT` y `lastInteractionAt` no cambió -> `SEND_MESSAGE` recordatorio,
  set `reminderSentAt`.
- `flow:close`: si sigue inactivo -> `status = ABANDONED`, `variables` ->
  `archivedVariables`, efecto `CLOSE_CONVERSATION` (`Conversation.status =
  CLOSED`), log `reason = 'ABANDON'`. Opcionalmente `SEND_MESSAGE` de cierre por
  inactividad.
- Guardas anti-carrera: el handler compara `lastInteractionAt` / `status`
  actuales antes de actuar (idempotente).

### 5.3 Retoma (retoma)

Cuando llega un inbound y ya existe `ConversationFlowState`:

- Se calcula `age = now - lastInteractionAt`.
- `age < reminderAfter` (24h): retoma silenciosa. Se procesa el input contra
  `currentNode` con `advance`. Si el input no encaja pero el usuario claramente
  "vuelve", el `FALLBACK` reenvía el prompt vigente. Log `reason = 'RESUME'`.
- `reminderAfter <= age < closeWindow`: retoma con **reorientación**: efecto
  `SEND_MESSAGE` "Retomamos donde lo dejaste:" + reenviar `content` del
  `currentNode`, luego procesar input. Se limpia `reminderSentAt`.
- `age >= closeWindow` pero el job de cierre aún no corrió: se trata como
  abandono -> reinicio en `entryNodeId` (5.1), conservando `archivedVariables`.
- Siempre: cancelar/reprogramar los jobs de mantenimiento y actualizar
  `lastInteractionAt`.

### 5.4 Fallback

Tres niveles, de más específico a más general:

1. **Fallback de nodo (no-match)**: input no satisface ninguna transición ->
   `attempts++`, reprompt con `retry.fallbackContent`. Al alcanzar el máximo
   (`3`) -> `retry.onExhausted` (handoff por defecto). Cubre `fbMenu` /
   `dMenuRetry`, `fbPais` / `dPaisRetry`, `d4` / `d5` / `d6` del diagrama.
2. **Fallback de entrada no textual**: audio / imagen / ubicación / sticker ->
   reprompt pidiendo texto y reenviando las opciones vigentes, sin gastar
   intento (`globals.nonTextBehavior = 'REPROMPT'`).
3. **Fallback de motor / definición**: no hay `FlowDefinition` publicada, el
   grafo no valida, `currentNodeId` ya no existe en la versión anclada, o
   `advance` lanza -> se delega en `GenerateConversationReplyUseCase` (IA) y se
   registra el incidente. La conversación no se bloquea nunca.

Además, nodos concretos pueden marcar `type: 'ACTION'` con `onEnter` que llame a
un tool o, explícitamente, `delegateToAi: true` para respuestas abiertas dentro
del flujo.

---

## 6. Contenido del guion oficial (carga e implementación de textos)

Historia de implementación: *cargar los mensajes, respuestas, variantes y textos
del guion oficial para que ALICE responda conforme al flujo y con el contenido
esperado por negocio.*

### 6.1 Dónde viven los textos

- El texto de cada nodo (`content`) vive **inline en la definición del flujo**
  (misma fuente, mismo versionado que el grafo), persistido en
  `alc_flow_definitions.graph` y cacheado en memoria al boot.
- Las **notas amarillas** del diagrama (`*Note` con "Mensaje:") se transcriben
  **fielmente** — son el guion oficial. Se normaliza solo la ortografía (tildes,
  `ñ`, signos `¿` `¡`); cualquier cambio de redacción o estructura requiere visto
  bueno de negocio. Las **notas naranjas** ("Mensaje sugerido") se marcan
  `origin: 'SUGGESTED'` y requieren aprobación antes de `status = PUBLISHED`.
- Interpolación `{{variable}}` con `state.variables` (p. ej.
  `{{selectedCountry}}`); variable ausente -> cadena vacía + warning (§4.1).
- `locale` a nivel de `FlowDefinition`; selección por `flowKey` + `locale`
  (`Conversation.locale`, hoy `es-MX`). Otro idioma = otra definición con los
  mismos `nodeId`.
- Las `alc_auto_replies` siguen como FAQ global por palabra clave (interceptor
  previo al flujo); no se migran a este modelo.

### 6.2 Estructura del texto por nodo (con variantes)

```ts
interface FlowMessage {
  content: string;                 // texto base (guion oficial)
  imageUrl?: string;
  origin: 'OFFICIAL' | 'SUGGESTED'; // amarilla vs naranja
  variants?: {
    reprompt?: string;             // reintento tras respuesta inválida
    resume?: string;               // reorientación al retomar (§5.3)
    reminder?: string;             // recordatorio 24h (§5.2)
    timeoutClose?: string;         // cierre por inactividad 48h
  };
}
```

`node.content` es `FlowMessage.content`; `retry.fallbackContent` por defecto usa
`variants.reprompt` (si no, reenvía `content`). Así una sola pieza de contenido
por nodo concentra todas sus formas.

### 6.3 Catálogo de mensajes del flujo Au Pair (fuente en el JSON)

| Categoría | Nodo / momento | Fuente en `chatbot_aupair_flujo.json` |
| --- | --- | --- |
| **Bienvenida** | `menu` (entrada) | `menuNote` (oficial) |
| Contenido de paso | `n2` países / `n4` qué hace / `n5` proceso / `n6` aplicar | `n2Note`, `n4Note`, `n5Note`, `n6Note` (oficial) |
| Contenido de paso | fichas `cAle`…`cSui` | `cAleNote`…`cSuiNote` (oficial) |
| Confirmación | `n7` asesor asignado | `n7Note` (oficial) |
| **Continuidad** | reprompt menú / país | `fbMenuNote`, `fbPaisNote` (sugerido) |
| **Continuidad** | retoma / recordatorio 24h | sugerido nuevo (no está en el guion) |
| **Cierre** | `despedida` | `despedidaNote` (sugerido) |
| **Cierre** | handoff a humano | `handoffNote` (sugerido) |
| **Error** | opción no reconocida | `fbMenuNote` / `fbPaisNote` (sugerido) |
| **Error** | entrada no textual (audio/imagen/…) | Notas globales del `legend` — texto a redactar |
| **Error** | 3 intentos -> asesor | reutiliza `handoffNote` |
| Reglas globales | interceptores `asesor`/`menu`/`salir`, 24h/48h, 3 intentos | nodo `legend` |

Todo texto marcado "sugerido" o "a redactar" pasa por revisión de negocio antes
de publicar. Los **textos literales** de cada mensaje están en el
[Apéndice A](#apéndice-a-textos-predefinidos-que-se-enviarán).

### 6.4 Proceso de carga

1. Script offline `scripts/import-flow.ts`: transforma el export del diagrama al
   JSON canónico, emparejando cada nodo con su `*Note` vía las aristas
   `node -> *Note` y clasificando `origin` por tipo de nota.
2. Pase de **normalización ortográfica** (tildes, `ñ`, `¿` `¡`) sobre los textos
   importados; salida versionada en el repo: `flows/aupair.es-MX.flow.json`
   (revisable en PR, diff legible = revisión editorial de negocio).
3. Seed / migración de datos: `alc_flow_definitions` (`key='aupair'`,
   `version=N`, `status='DRAFT'`, `checksum`).
4. Publicación: `status='PUBLISHED'` + `publishedAt` tras aprobación de negocio.
   Las conversaciones en curso siguen ancladas a su versión (§2.1).
5. Fixture de test `test/fixtures/flow/aupair.flow.json` = misma definición, para
   los tests golden del motor.

### 6.5 Tono y validación de contenido

- **Fidelidad**: `flows/aupair.es-MX.flow.json` es la referencia aprobada (guion
  con ortografía normalizada); un test compara el `content` cargado contra ese
  archivo. Los cambios de redacción se hacen en ese archivo vía PR, no en el
  código.
- **Guía de tono** (voz de marca ALICE, "hermana mayor", cercana, motivadora) se
  documenta junto al flujo; aplica a los textos `SUGGESTED`.
- **Lint de contenido** en el loader: sin `content` vacío en nodos `MESSAGE`,
  toda `{{variable}}` referenciada existe como slot posible, longitud compatible
  con WhatsApp, placeholders resueltos (`[link de perfilacion]` debe sustituirse
  por una variable/config real antes de publicar).

### 6.6 Cobertura de los criterios de aceptación

| Criterio | Mecanismo |
| --- | --- |
| Los textos del flujo quedan implementados | `content` inline por nodo en `flows/aupair.es-MX.flow.json` -> `alc_flow_definitions`, cargado al boot. |
| Las respuestas corresponden al paso correcto | Cada `FlowMessage` está atado a su `nodeId`; el motor emite el `content` de `currentNodeId` (§4.1); test de emparejamiento 1:1 con las notas del diagrama. |
| Se respeta el tono y contenido de negocio | Transcripción literal de notas amarillas + `origin`; gate de aprobación antes de `PUBLISHED`; guía de tono + test de fidelidad. |
| Bienvenida, continuidad, cierre y error | Catálogo §6.3 con las cuatro categorías cubiertas y su fuente; `variants` (§6.2) para reprompt/resume/reminder/timeoutClose. |

---

## 7. Impacto en el código existente

| Archivo | Cambio |
| --- | --- |
| `prisma/schema.prisma` | + enums `FlowStateStatus`, `FlowDefinitionStatus`; + modelos `ConversationFlowState`, `FlowTransitionLog`, `FlowDefinition`; + relación en `Conversation`. Migración nueva. |
| `src/modules/conversations/domain/conversation.entity.ts` | sin cambios (el estado de flujo es entidad aparte). |
| `process-inbound-whatsapp-message.use-case.ts` | insertar resolución de flujo (sección 1.2). Sus specs con mocks se amplían. |
| `src/modules/whatsapp/whatsapp.module.ts` / `src/app.module.ts` | importar `ConversationFlowModule`. |
| `src/modules/persistence/...` | + repos Prisma/in-memory + mappers para las tablas nuevas (patrón existente). |
| `src/shared/infrastructure/queue/queue.constants.ts` | + cola/known jobs `flow-maintenance`. |
| `scripts/import-flow.ts` (nuevo) | transforma el export del diagrama al JSON canónico (§6.4). |
| `flows/aupair.es-MX.flow.json` (nuevo) | definición versionada del guion oficial, revisable en PR. |
| `docs/architecture.md`, `docs/adr/0005-conversation-flow-engine.md` (nuevo) | documentar la decisión y el diagrama. |

Nada de esto rompe capas: `domain` sigue sin dependencias externas; los
adaptadores nuevos solo implementan puertos.

---

## 8. Estrategia de pruebas (mock providers, sin Meta/OpenAI reales)

- **Unit / dominio**: `FlowEngine.advance` con tablas de casos sobre una fixture
  del flujo Au Pair (`test/fixtures/flow/aupair.flow.json`): camino feliz
  1→país→ficha→aplicar→perfil, cada `FALLBACK`, agotamiento de 3 intentos →
  handoff, interceptores `menu`/`salir`/`asesor`, entrada no textual.
- **Application**: casos de uso con `in-memory` repos + `in-memory` queue +
  `MockWhatsAppGateway` / `MockAiGateway` ya existentes.
- **Ciclo de vida**: tests de `RunFlowMaintenanceUseCase` con reloj inyectable
  (recordatorio a 24h, cierre a 72h, idempotencia).
- `pnpm check` (lint + typecheck + test + build) antes de cerrar.

---

## 9. Fases de implementación

1. **Esquema + dominio**: migración, tipos `FlowDefinition`, `FlowEngine` puro,
   fixture del flujo Au Pair, unit tests golden.
2. **Persistencia**: repos Prisma + in-memory, mappers, caché Redis write-through,
   ciclo de vida del estado (bootstrap / save / load).
3. **Integración**: enganche en `ProcessInboundWhatsAppMessageUseCase`, ejecución
   de efectos con los casos de uso existentes, interceptores globales.
4. **Inactividad**: jobs BullMQ `flow-maintenance` (recordatorio / cierre),
   reprogramación por inbound.
5. **Definiciones + contenido**: `scripts/import-flow.ts`, `flows/aupair.es-MX.flow.json`
   con los textos del guion (§6), loader + validación + lint de contenido +
   versionado + `alc_flow_definitions`; tests de fidelidad de texto; gate de
   aprobación de negocio -> `PUBLISHED`. ADR 0005 + `docs/architecture.md`.
6. **(v2, opcional)** condiciones `INTENT` vía `IntentClassifierPort` con mock por
   defecto para clasificación difusa de opciones.

---

## 10. Decisiones abiertas (a confirmar antes de la fase 1)

1. **Orden de resolución**: ¿flujo primero siempre, o `auto-reply` → flujo →
   IA? Propuesta: si hay `FlowState` activo, el flujo manda; si no, `auto-reply`
   → bootstrap del flujo → IA.
2. **Retención de `variables` en reinicio**: propuesta = conservar en `GOTO menu`,
   archivar en `reiniciar` y en abandono.
3. **`INTENT` en v1**: propuesta = diferir; v1 100% determinista.
4. **Ventanas de inactividad**: 24h recordatorio / +48h cierre (del diagrama);
   configurables por `globals`.
5. **Jobs por conversación vs sweep periódico**: propuesta = jobs retardados por
   conversación.
6. **Almacén de contenido**: propuesta = inline en la definición (no tabla
   aparte de mensajes).

---

## Apéndice A. Textos predefinidos que se enviarán

Textos de las notas de `chatbot_aupair_flujo.json` (`origin: OFFICIAL`, notas
amarillas) y borradores `origin: SUGGESTED` (notas naranjas / huecos del guion)
para revisión de negocio. La ortografía **ya está normalizada** respecto al
export del diagrama: se añadieron tildes, `ñ` y signos de apertura (`¿` `¡`), sin
alterar el contenido ni la estructura. El texto de abajo es el que se carga en
`flows/aupair.es-MX.flow.json`; cualquier cambio de redacción posterior pasa por
el gate editorial (§6.5).

Convención WhatsApp: `[1]`, `[Aplicar]` se renderizan como texto; cuando la
plataforma lo permita se mapean a *interactive list / buttons* sin cambiar el
copy.

### A.1 Bienvenida y menú

**`menu`** · categoría `bienvenida` · `OFFICIAL` (`menuNote`)

```
¡Hola! Te damos la bienvenida a Au Pair México.
Ser Au Pair es un reto personal increíble: vivir en el extranjero, perfeccionar un idioma, cuidar a los niños de una familia y reinventarte como persona. Avalados por IAPA y WYSE Travel Confederation.
¿Cómo te gustaría comenzar tu aventura hoy?
[1] Países disponibles
[2] ¿Qué hace una Au Pair?
[3] Proceso general de aplicación
[4] ¡Ya quiero aplicar!
```

### A.2 Contenido por paso del menú

**`n2`** (opción 1, lista de países) · `paso` · `OFFICIAL` (`n2Note`)

```
¡Excelente elección! Contamos con 7 destinos increíbles en Europa y Norteamérica.
Elige el país que más te llame la atención: Alemania, Bélgica, Estados Unidos, Francia, Italia, Países Bajos, Suiza.
```

**`n4`** (opción 2, qué hace una Au Pair) · `paso` · `OFFICIAL` (`n4Note`)

```
¡Serás la hermana mayor del hogar!
Apoyarás a la familia anfitriona en el cuidado de los pequeños y compartirás tu cultura todos los días.
```

**`n5`** (opción 3, proceso de aplicación) · `paso` · `OFFICIAL` (`n5Note`)

```
¿Qué sigue? ¡Tu proceso!
1. Completa tu expediente: entrega tu documentación y cumple requisitos.
2. Elige una familia: haz match con tu familia ideal.
3. Tramita tu visa: despídete de tus amigos.
4. Disfruta la experiencia: vive el mejor año de tu vida.
```

**`n6`** (opción 4, quiero aplicar) · `paso` · `OFFICIAL` (`n6Note`)

```
¡Tu aventura ya comenzó! Necesitamos conocer tu perfil. Cuéntame de ti en el siguiente link: {{profileLink}}
[1] Ya llené mi perfil / Hablar con asesor
[2] Regresar al menú principal
```

> `{{profileLink}}` sustituye al placeholder `[link de perfilacion]` del guion;
> se resuelve desde config (`app.config`) o variable de flujo antes de publicar.

### A.3 Fichas de país

Todas terminan con `[Aplicar] / [Regresar al menú]` · `paso` · `OFFICIAL`.

**`cAle` — Alemania** (`cAleNote`)

```
Alemania
Duración: 12 meses | 35 hrs/semana.
Beneficios: alimentación y alojamiento, apoyo de 370 EUR/mes (280 apoyo + 90 curso), seguro médico, vuelos incluidos, 1.5 días de descanso/semana, 4 semanas de vacaciones, certificado y supervisión.
Requisitos: mujer soltera sin hijos (18-26 años), prepa terminada.
[Aplicar] / [Regresar al menú]
```

**`cBel` — Bélgica** (`cBelNote`)

```
Bélgica
Duración: 12 meses | 20 hrs/semana.
Beneficios: alimentación y alojamiento, apoyo de 450 EUR/mes, apoyo para curso de idioma (neerlandés, alemán o francés), seguro médico, hasta 2 semanas de vacaciones, certificado y supervisión continua.
Requisitos: mujer soltera sin hijos (18-25 años), prepa terminada.
[Aplicar] / [Regresar al menú]
```

**`cUsa` — Estados Unidos** (`cUsaNote`)

```
Estados Unidos
Duración: 12 meses | 45 hrs/semana.
Beneficios: alimentación y alojamiento, apoyo de 783 USD/mes, seguro de gastos médicos, vuelos incluidos, 1.5 días de descanso/semana, 2 semanas de vacaciones al año, certificado y supervisión continua.
Requisitos: mujer soltera sin hijos (18-26 años), prepa terminada.
[Aplicar] / [Regresar al menú]
```

**`cFra` — Francia** (`cFraNote`)

```
Francia
Duración: 12 meses | 35 hrs/semana + 2 babysitting al mes.
Beneficios: alimentación y alojamiento, apoyo de 320 EUR/mes, seguro de gastos médicos, 1.5 días de descanso/semana, 2 semanas de vacaciones al año, certificado y supervisión.
Requisitos: mujer soltera sin hijos (18-26 años), prepa terminada.
[Aplicar] / [Regresar al menú]
```

**`cIta` — Italia** (`cItaNote`)

```
Italia
Duración: 3 meses | 30 hrs/semana.
Beneficios: alimentación y alojamiento, apoyo de 280 a 320 EUR/mes, 1.5 días de descanso/semana, certificado y supervisión.
Requisitos: mujer soltera sin hijos (18-28 años), inglés B2/C1 o italiano A2, manejar estándar, saber nadar (opcional), experiencia con niños menores de 2 años. Solo no fumadoras.
[Aplicar] / [Regresar al menú]
```

**`cNlb` — Países Bajos** (`cNlbNote`)

```
Países Bajos
Duración: 12 meses | 30 hrs/semana.
Beneficios: alimentación y alojamiento, apoyo de 320 a 340 EUR/mes, seguro de gastos médicos, 1.5 días de descanso/semana, 2 semanas de vacaciones, certificado y supervisión.
Requisitos: mujer soltera sin hijos (18-25 años).
[Aplicar] / [Regresar al menú]
```

**`cSui` — Suiza** (`cSuiNote`)

```
Suiza
Duración: 12 meses | 30 hrs/semana + 2 babysitting al mes.
Beneficios: alimentación y alojamiento, apoyo de 600 a 700 CHF/mes, 50% de apoyo en seguro médico, apoyo para estudiar el idioma, 1.5 días de descanso, 4 semanas de vacaciones, certificado y supervisión.
Requisitos: mujer soltera sin hijos (18-25 años), NACIONALIDAD EUROPEA OBLIGATORIA.
[Aplicar] / [Regresar al menú]
```

### A.4 Confirmación de asesor

**`n7`** (perfil listo -> asesor asignado) · `cierre` · `OFFICIAL` (`n7Note`)

```
¡Excelente! Tu asesor asignado se pondrá en contacto contigo por este medio o por llamada telefónica. ¡Activa tus notificaciones!
```

### A.5 Continuidad y error

**`menu` › `variants.reprompt`** (opción de menú no reconocida) · `error` · `SUGGESTED` (`fbMenuNote`)

```
No entendí tu respuesta. Por favor elige una opción válida del menú: 1, 2, 3 o 4.
```

**`dPais` › `variants.reprompt`** (país no reconocido) · `error` · `SUGGESTED` (`fbPaisNote`)

```
No reconocí ese país. Elige uno de la lista: Alemania, Bélgica, Estados Unidos, Francia, Italia, Países Bajos o Suiza.
```

**`dPais2` / `d4` / `d5` / `d6` › `variants.reprompt`** (no es Aplicar ni Regresar) · `error` · `SUGGESTED` (a redactar)

```
No entendí. Responde "aplicar" para continuar con tu registro o "menú" para volver al inicio.
```

**Entrada no textual** (audio / imagen / ubicación / sticker) · `error` · `SUGGESTED` (regla global del `legend`, a redactar)

```
Por ahora solo puedo leer mensajes de texto. Escríbeme tu respuesta y te reenvío las opciones.
```

**Retoma / reorientación** (`variants.resume`, tras >24h) · `continuidad` · `SUGGESTED` (a redactar)

```
Retomamos donde lo dejaste. {{stepPrompt}}
```

> `{{stepPrompt}}` = `content` del nodo actual, que se reenvía a continuación.

**Recordatorio 24h** (`variants.reminder`) · `continuidad` · `SUGGESTED` (regla global, a redactar)

```
Sigo por aquí para ayudarte con tu aventura como Au Pair. Cuando quieras, retomamos donde nos quedamos.
```

**Cierre por inactividad 48h** (`variants.timeoutClose`) · `cierre` · `SUGGESTED` (regla global, a redactar)

```
Cerré esta conversación por inactividad. Escríbeme "hola" cuando quieras retomar tu proceso. ¡Aquí estaré!
```

### A.6 Cierres del flujo

**`handoffAsesor` / terminal `AWAITING_HUMAN`** · `cierre` · `SUGGESTED` (`handoffNote`)

```
Listo, te voy a comunicar con un asesor humano. En breve te contactará por este medio o por llamada. ¡Activa tus notificaciones!
```

**`despedida` / terminal `CLOSED`** · `cierre` · `SUGGESTED` (`despedidaNote`)

```
¡Gracias por tu tiempo! Si en otro momento quieres retomar tu aventura como Au Pair, aquí estaré. ¡Que tengas un excelente día!
```

### A.7 Reglas globales (nodo `legend`, no son mensajes)

Se implementan como `globals` (§2.2), no como texto enviado:

- `asesor` / `humano` / `ayuda` -> transferir a asesor humano.
- `menu` / `inicio` -> regresar al menú principal.
- `salir` / `cancelar` -> despedida y cierre.
- Audio / imagen / ubicación / sticker -> pedir texto y reenviar las opciones vigentes.
- Sin respuesta 24h -> recordatorio; 48h más -> cierre por inactividad.
- Máximo 3 intentos fallidos por paso -> transferir automáticamente a asesor humano.

### A.8 Esqueleto de `flows/aupair.es-MX.flow.json` (extracto)

```json
{
  "key": "aupair",
  "version": 1,
  "locale": "es-MX",
  "entryNodeId": "menu",
  "globals": {
    "maxAttemptsPerNode": 3,
    "maxChainedHops": 20,
    "reminderAfter": "24h",
    "closeAfter": "48h",
    "nonTextBehavior": "REPROMPT",
    "interceptors": [
      { "match": ["asesor", "humano", "ayuda"], "action": { "kind": "HANDOFF", "reason": "USER_REQUEST" } },
      { "match": ["menu", "inicio"], "action": { "kind": "GOTO", "nodeId": "menu", "keepVariables": true } },
      { "match": ["salir", "cancelar"], "action": { "kind": "CLOSE", "nodeId": "despedida" } }
    ]
  },
  "nodes": [
    {
      "id": "menu",
      "type": "DECISION",
      "expects": "OPTION",
      "message": {
        "origin": "OFFICIAL",
        "content": "¡Hola! Te damos la bienvenida a Au Pair México.\nSer Au Pair es un reto personal increíble: vivir en el extranjero, perfeccionar un idioma, cuidar a los niños de una familia y reinventarte como persona. Avalados por IAPA y WYSE Travel Confederation.\n¿Cómo te gustaría comenzar tu aventura hoy?\n[1] Países disponibles\n[2] ¿Qué hace una Au Pair?\n[3] Proceso general de aplicación\n[4] ¡Ya quiero aplicar!",
        "variants": { "reprompt": "No entendí tu respuesta. Por favor elige una opción válida del menú: 1, 2, 3 o 4." }
      },
      "retry": { "max": 3, "onExhausted": "HANDOFF" },
      "transitions": [
        { "id": "menu-1", "priority": 10, "to": "n2", "when": { "kind": "EQUALS", "value": "1" } },
        { "id": "menu-2", "priority": 10, "to": "n4", "when": { "kind": "EQUALS", "value": "2" } },
        { "id": "menu-3", "priority": 10, "to": "n5", "when": { "kind": "EQUALS", "value": "3" } },
        { "id": "menu-4", "priority": 10, "to": "n6", "when": { "kind": "EQUALS", "value": "4" } }
      ]
    }
  ]
}
```

El resto de nodos (`n2`, `n4`, `n5`, `n6`, `cAle`…`cSui`, `n7`, `dPais`,
`dPais2`, `d4`, `d5`, `d6`, `handoffAsesor`, `despedida`, terminales) sigue el
mismo patrón con los textos de A.1–A.6.
