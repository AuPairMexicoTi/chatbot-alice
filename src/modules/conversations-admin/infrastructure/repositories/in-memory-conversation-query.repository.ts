import { Injectable } from '@nestjs/common';
import {
  ConversationQueryPort,
  ListConversationsFilters,
  ListMessagesOptions,
  MessagesPage,
  Paginated,
} from '../../application/ports/conversation-query.port';
import { ConversationListItem } from '../../application/read-models/conversation-list-item.read-model';
import { ConversationDetail } from '../../application/read-models/conversation-detail.read-model';
import { MessageItem } from '../../application/read-models/message-item.read-model';
import { FlowStateItem } from '../../application/read-models/flow-state.read-model';

// Implementacion en memoria usada solo en tests (NODE_ENV=test), para no
// pegarle a Postgres -- ver conversations-admin.module.ts.
@Injectable()
export class InMemoryConversationQueryRepository implements ConversationQueryPort {
  constructor(
    private readonly conversations: ConversationDetail[] = [],
    private readonly messagesByConversationId: Record<
      string,
      MessageItem[]
    > = {},
    private readonly flowStatesByConversationId: Record<
      string,
      FlowStateItem
    > = {},
  ) {}

  async list(
    filters: ListConversationsFilters,
  ): Promise<Paginated<ConversationListItem>> {
    const items: ConversationListItem[] = this.conversations
      .filter((c) => !filters.status || c.status === filters.status)
      .map((c) => ({
        id: c.id,
        contactId: c.contact.id,
        contactName: c.contact.name,
        phoneNumber: c.contact.phoneNumber,
        status: c.status,
        waitingOnHuman: c.waitingOnHuman,
        lastMessage: null,
        lastMessageAt: null,
        assignedAdvisorId: c.assignedAdvisorId,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      }));

    const start = (filters.page - 1) * filters.limit;

    return {
      data: items.slice(start, start + filters.limit),
      total: items.length,
    };
  }

  async findById(conversationId: string): Promise<ConversationDetail | null> {
    return this.conversations.find((c) => c.id === conversationId) ?? null;
  }

  async listMessages(
    conversationId: string,
    options: ListMessagesOptions,
  ): Promise<MessagesPage<MessageItem>> {
    const { before, limit } = options;
    const items = this.messagesByConversationId[conversationId] ?? [];
    const filtered = before ? items.filter((m) => m.createdAt < before) : items;
    const sorted = [...filtered].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    return {
      data: sorted.slice(0, limit).reverse(),
      hasMore: sorted.length > limit,
    };
  }

  async getFlowState(conversationId: string): Promise<FlowStateItem | null> {
    return this.flowStatesByConversationId[conversationId] ?? null;
  }
}
