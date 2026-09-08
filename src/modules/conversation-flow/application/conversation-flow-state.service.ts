import { Inject, Injectable } from '@nestjs/common';
import {
  CONVERSATION_FLOW_STATE_REPOSITORY,
  ConversationFlowStateRepository,
} from './ports/conversation-flow-state.repository';
import { ConversationFlowEngine } from '../domain/conversation-flow.engine';
import { aupairFlowDefinition } from '../domain/aupair-flow.definition';
import { FlowInput, FlowResult } from '../domain/conversation-flow.types';
import { InMemoryConversationFlowStateRepository } from '../infrastructure/repositories/in-memory-conversation-flow-state.repository';

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
  ) {}

  async advance(conversationId: string, input: FlowInput): Promise<FlowResult> {
    const record = await this.repository.findByConversationId(conversationId);
    const shouldRestart =
      !record ||
      record.state.status !== 'ACTIVE' ||
      this.now().getTime() - record.updatedAt.getTime() >=
        this.inactivityTimeoutMs;
    const result = shouldRestart
      ? this.engine.start(aupairFlowDefinition)
      : this.engine.advance(aupairFlowDefinition, record.state, input);
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
