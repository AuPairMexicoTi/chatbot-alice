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
import { InMemoryConversationFlowStateRepository } from '../infrastructure/repositories/in-memory-conversation-flow-state.repository';
import { APM_LEADS_PORT, ApmLeadsPort } from './ports/apm-leads.port';

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
    @Inject(APM_LEADS_PORT)
    private readonly apmLeadsPort?: ApmLeadsPort,
  ) {}

  async advance(
    conversationId: string,
    input: FlowInput,
    phoneNumber?: string,
  ): Promise<FlowResult> {
    const record = await this.repository.findByConversationId(conversationId);
    const shouldRestart =
      !record ||
      record.state.status !== 'ACTIVE' ||
      this.now().getTime() - record.updatedAt.getTime() >=
        this.inactivityTimeoutMs;
    const definition = await this.flowDefinitionRepository.getDefinition();
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
    let result = this.engine.advance(definition, currentState, input);
    if (result.state.nodeId === 'profiling-link') {
      if (!phoneNumber)
        throw new Error('Phone number is required to create an APM lead');
      if (!this.apmLeadsPort)
        throw new Error('APM leads port is not configured');
      const values = result.state.variables;
      const lead = await this.apmLeadsPort.createOrFind({
        name: values.name,
        age: Number(values.age),
        phone: phoneNumber,
        email: values.email,
        city: values.city,
        englishLevel: values.englishLevel,
      });
      result = this.engine.present(definition, {
        ...result.state,
        variables: { ...values, profilingLink: lead.profilingLink },
      });
    }
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
