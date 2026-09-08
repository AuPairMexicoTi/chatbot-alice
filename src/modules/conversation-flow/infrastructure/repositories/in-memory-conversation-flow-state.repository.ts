import {
  ConversationFlowStateRecord,
  ConversationFlowStateRepository,
} from '../../application/ports/conversation-flow-state.repository';
import { FlowState } from '../../domain/conversation-flow.types';

export class InMemoryConversationFlowStateRepository implements ConversationFlowStateRepository {
  private readonly states = new Map<string, ConversationFlowStateRecord>();

  async findByConversationId(
    conversationId: string,
  ): Promise<ConversationFlowStateRecord | null> {
    return this.states.get(conversationId) ?? null;
  }

  async save(conversationId: string, state: FlowState): Promise<void> {
    this.states.set(conversationId, { state, updatedAt: new Date() });
  }
}
