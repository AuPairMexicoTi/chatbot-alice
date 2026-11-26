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
import {
  FlowInput,
  FlowResult,
  FlowState,
} from '../domain/conversation-flow.types';
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
export const CONVERSATION_FLOW_AWAITING_HUMAN_RESET_MS = Symbol(
  'CONVERSATION_FLOW_AWAITING_HUMAN_RESET_MS',
);

const defaultInactivityTimeoutMs = 30 * 60 * 1000;
// AWAITING_HUMAN ("Esperando asesor") no debe reiniciarse por el timeout
// corto de ACTIVE (pensado para una sesion de menu, no para la espera de un
// asesor) pero tampoco debe quedarse asi para siempre: una candidata que
// vuelve semanas o meses despues ya no deberia seguir atrapada en los
// recordatorios de advanceWhileAwaitingAdvisor (ver
// ConversationFlowEngine), que ademas se queda en silencio total despues
// del segundo recordatorio (fallbackStreak >= 3). Pasado este plazo sin
// actividad se trata como abandonada y vuelve al menu principal.
const defaultAwaitingHumanResetMs = 7 * 24 * 60 * 60 * 1000;

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
    @Inject(CONVERSATION_FLOW_AWAITING_HUMAN_RESET_MS)
    private readonly awaitingHumanResetMs: number = defaultAwaitingHumanResetMs,
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
    //
    // AWAITING_HUMAN (= "Esperando asesor") no reinicia con el timeout corto
    // de ACTIVE: antes, cualquier mensaje de una candidata ya transferida
    // volvia a mostrar el menu principal como si no tuviera asesor asignado
    // (bug real en produccion -- ver
    // ConversationFlowEngine.advanceWhileAwaitingAdvisor). Pero tampoco debe
    // quedarse asi para siempre -- pasado awaitingHumanResetMs (dias, no
    // minutos) sin que la candidata escriba, se trata como abandonada y
    // vuelve al menu principal igual que CLOSED.
    const shouldRestart =
      !record ||
      record.state.status === 'CLOSED' ||
      !definition.nodes[record.state.nodeId] ||
      (record.state.status === 'ACTIVE' &&
        this.now().getTime() - record.updatedAt.getTime() >=
          this.inactivityTimeoutMs) ||
      (record.state.status === 'AWAITING_HUMAN' &&
        this.now().getTime() - record.updatedAt.getTime() >=
          this.awaitingHumanResetMs);
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

  // Se llama tras un handoff a APM exitoso para que el link de WhatsApp del
  // asesor quede disponible en variables -- sin esto, el mensaje de espera
  // de advanceWhileAwaitingAdvisor() no podria ofrecer un contacto directo
  // en los fallbacks posteriores (el resultado del handoff solo existe en
  // ese momento, no se vuelve a pedir a APM en cada mensaje).
  async recordAdvisorContact(
    conversationId: string,
    state: FlowState,
    advisor: { whatsappLink?: string | null; name?: string | null },
  ): Promise<FlowState> {
    const nextState: FlowState = {
      ...state,
      variables: {
        ...state.variables,
        ...(advisor.whatsappLink
          ? { advisorWhatsAppLink: advisor.whatsappLink }
          : {}),
        ...(advisor.name ? { advisorName: advisor.name } : {}),
      },
    };
    await this.repository.save(conversationId, nextState);
    return nextState;
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
