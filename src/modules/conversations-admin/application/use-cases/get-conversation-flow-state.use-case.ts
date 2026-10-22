import { Inject, Injectable } from '@nestjs/common';
import { ApplicationError } from '@shared/domain/errors/application.error';
import {
  CONVERSATION_QUERY_PORT,
  ConversationQueryPort,
} from '../ports/conversation-query.port';
import { FlowStateItem } from '../read-models/flow-state.read-model';

@Injectable()
export class GetConversationFlowStateUseCase {
  constructor(
    @Inject(CONVERSATION_QUERY_PORT)
    private readonly conversationQueryPort: ConversationQueryPort,
  ) {}

  async execute(conversationId: string): Promise<FlowStateItem | null> {
    const conversation =
      await this.conversationQueryPort.findById(conversationId);

    if (!conversation) {
      throw new ApplicationError(
        'CONVERSATION_NOT_FOUND',
        'Conversation not found',
        404,
      );
    }

    return this.conversationQueryPort.getFlowState(conversationId);
  }
}
