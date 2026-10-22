import { Inject, Injectable } from '@nestjs/common';
import {
  CONVERSATION_QUERY_PORT,
  ConversationQueryPort,
  ListConversationsFilters,
  Paginated,
} from '../ports/conversation-query.port';
import { ConversationListItem } from '../read-models/conversation-list-item.read-model';

@Injectable()
export class ListConversationsUseCase {
  constructor(
    @Inject(CONVERSATION_QUERY_PORT)
    private readonly conversationQueryPort: ConversationQueryPort,
  ) {}

  async execute(
    filters: ListConversationsFilters,
  ): Promise<Paginated<ConversationListItem>> {
    return this.conversationQueryPort.list(filters);
  }
}
