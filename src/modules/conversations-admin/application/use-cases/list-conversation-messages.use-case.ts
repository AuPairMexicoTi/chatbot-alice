import { Inject, Injectable } from '@nestjs/common';
import { ApplicationError } from '@shared/domain/errors/application.error';
import {
  CONVERSATION_QUERY_PORT,
  ConversationQueryPort,
  ListMessagesOptions,
  MessagesPage,
} from '../ports/conversation-query.port';
import { MessageItem } from '../read-models/message-item.read-model';

@Injectable()
export class ListConversationMessagesUseCase {
  constructor(
    @Inject(CONVERSATION_QUERY_PORT)
    private readonly conversationQueryPort: ConversationQueryPort,
  ) {}

  async execute(
    conversationId: string,
    options: ListMessagesOptions,
  ): Promise<MessagesPage<MessageItem>> {
    const conversation =
      await this.conversationQueryPort.findById(conversationId);

    if (!conversation) {
      throw new ApplicationError(
        'CONVERSATION_NOT_FOUND',
        'Conversation not found',
        404,
      );
    }

    return this.conversationQueryPort.listMessages(conversationId, options);
  }
}
