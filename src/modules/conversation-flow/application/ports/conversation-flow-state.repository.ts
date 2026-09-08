import { FlowState } from '../../domain/conversation-flow.types';

export type ConversationFlowStateRecord = {
  state: FlowState;
  updatedAt: Date;
};

export interface ConversationFlowStateRepository {
  findByConversationId(
    conversationId: string,
  ): Promise<ConversationFlowStateRecord | null>;
  save(conversationId: string, state: FlowState): Promise<void>;
}

export const CONVERSATION_FLOW_STATE_REPOSITORY = Symbol(
  'CONVERSATION_FLOW_STATE_REPOSITORY',
);
