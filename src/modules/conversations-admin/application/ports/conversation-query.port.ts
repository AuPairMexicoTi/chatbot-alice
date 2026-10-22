import { ConversationListItem } from '../read-models/conversation-list-item.read-model';
import { ConversationDetail } from '../read-models/conversation-detail.read-model';
import { MessageItem } from '../read-models/message-item.read-model';
import { FlowStateItem } from '../read-models/flow-state.read-model';
import { ConversationStatusValue } from '../read-models/conversation-status.type';

export interface ListConversationsFilters {
  search?: string;
  status?: ConversationStatusValue;
  dateFrom?: Date;
  dateTo?: Date;
  assignedAdvisorId?: string;
  page: number;
  limit: number;
}

export interface Paginated<T> {
  data: T[];
  total: number;
}

export interface ConversationQueryPort {
  list(
    filters: ListConversationsFilters,
  ): Promise<Paginated<ConversationListItem>>;
  findById(conversationId: string): Promise<ConversationDetail | null>;
  listMessages(
    conversationId: string,
    page: number,
    limit: number,
  ): Promise<Paginated<MessageItem>>;
  getFlowState(conversationId: string): Promise<FlowStateItem | null>;
}

export const CONVERSATION_QUERY_PORT = Symbol('CONVERSATION_QUERY_PORT');
