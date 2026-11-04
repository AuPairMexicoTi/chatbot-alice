import { Inject, Injectable } from '@nestjs/common';
import {
  CONVERSATION_FLOW_STATE_REPOSITORY,
  ConversationFlowStateRepository,
} from './ports/conversation-flow-state.repository';
import {
  FLOW_DEFINITION_REPOSITORY,
  FlowDefinitionRepository,
} from './ports/flow-definition.repository';
import { ConversationFlowEngine } from '../domain/conversation-flow.engine';
import { aupairFlowDefinition } from '../domain/aupair-flow.definition';
import { FlowInput, FlowResult } from '../domain/conversation-flow.types';
import { parseMetaAdLeadFormCandidates } from '../domain/meta-ad-lead-form.parser';
import { InMemoryConversationFlowStateRepository } from '../infrastructure/repositories/in-memory-conversation-flow-state.repository';

// Respaldo usado cuando no se inyecta un FlowDefinitionRepository explícito
// (ej. en tests que construyen el servicio directamente) — mantiene el
// comportamiento previo a mover el flujo a la base de datos.
const staticFlowDefinitionRepository: FlowDefinitionRepository = {
  getDefinition: async () => aupairFlowDefinition,
  createNode: async () => {
    throw new Error('Static flow definition repository is read-only');
  },
  updateNode: async () => {
    throw new Error('Static flow definition repository is read-only');
  },
};

export const CONVERSATION_FLOW_INACTIVITY_TIMEOUT_MS = Symbol(
  'CONVERSATION_FLOW_INACTIVITY_TIMEOUT_MS',
);
export const CONVERSATION_FLOW_NOW = Symbol('CONVERSATION_FLOW_NOW');

const defaultInactivityTimeoutMs = 30 * 60 * 1000;

@Injectable()
export class ConversationFlowStateService {
  private readonly engine = new ConversationFlowEngine();
  constructor(
    @Inject(CONVERSATION_FLOW_STATE_REPOSITORY)
    private readonly repository: ConversationFlowStateRepository = new InMemoryConversationFlowStateRepository(),
    @Inject(CONVERSATION_FLOW_INACTIVITY_TIMEOUT_MS)
    private readonly inactivityTimeoutMs: number = defaultInactivityTimeoutMs,
    @Inject(CONVERSATION_FLOW_NOW)
    private readonly now: () => Date = () => new Date(),
    @Inject(FLOW_DEFINITION_REPOSITORY)
    private readonly flowDefinitionRepository: FlowDefinitionRepository = staticFlowDefinitionRepository,
  ) {}

  async advance(conversationId: string, input: FlowInput): Promise<FlowResult> {
    const record = await this.repository.findByConversationId(conversationId);
    const definition = await this.flowDefinitionRepository.getDefinition();
    // Un nodo guardado puede dejar de existir cuando la definicion cambia
    // (ver aupair-flow.definition.ts) -- sin este chequeo, una conversacion
    // ACTIVE parada en un nodo borrado haria crashear advance() al buscarlo.
    // Se trata igual que cualquier otra razon para reiniciar al menu.
    const shouldRestart =
      !record ||
      record.state.status !== 'ACTIVE' ||
      !definition.nodes[record.state.nodeId] ||
      this.now().getTime() - record.updatedAt.getTime() >=
        this.inactivityTimeoutMs;
    // La bienvenida de CRM se envía antes del primer mensaje entrante. Al
    // recibirlo, ya evaluamos su respuesta contra el menú en vez de reenviar
    // toda la bienvenida; un saludo explícito continúa mostrando el menú.
    const initialState = this.engine.start(definition).state;
    const currentState = shouldRestart
      ? initialState
      : {
          ...record.state,
          variables: record.state.variables,
        };

    // Los anuncios "Click to WhatsApp" de Meta precargan el primer mensaje
    // con un formulario (nombre/telefono/email/...) que el lead manda tal
    // cual sin haber leido el menu de bienvenida -- si es su primer turno,
    // se intenta reconocer ese formato y precargar lo que traiga antes de
    // evaluarlo (sin exito) como respuesta al menu. Ver
    // ConversationFlowEngine.enterFromAdLeadPrefill.
    const adLeadCandidates =
      shouldRestart && input.text
        ? parseMetaAdLeadFormCandidates(input.text)
        : null;
    const adLeadResult = adLeadCandidates
      ? this.engine.enterFromAdLeadPrefill(definition, adLeadCandidates)
      : null;

    const result =
      adLeadResult ?? this.engine.advance(definition, currentState, input);
    await this.repository.save(conversationId, result.state);
    return result;
  }

  // Red de seguridad para cuando el handoff a APM falla (ver
  // ProcessInboundWhatsAppMessageUseCase): reinicia el flujo al menu
  // principal y lo persiste, para que el lead siempre reciba una respuesta
  // en vez de quedarse sin contestacion.
  async restart(conversationId: string): Promise<FlowResult> {
    const definition = await this.flowDefinitionRepository.getDefinition();
    const result = this.engine.start(definition);
    await this.repository.save(conversationId, result.state);
    return result;
  }

  async closeForInactivity(conversationId: string): Promise<boolean> {
    const record = await this.repository.findByConversationId(conversationId);
    if (!record || record.state.status !== 'ACTIVE') return false;
    await this.repository.save(conversationId, {
      ...record.state,
      status: 'CLOSED',
    });
    return true;
  }
}
