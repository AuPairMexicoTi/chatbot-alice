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

// La bandeja admin abre cada hilo mostrando los mensajes mas recientes (como
// WhatsApp) y carga hacia atras al hacer scroll hacia arriba -- paginacion
// por cursor (keyset) en vez de pagina/total: sin `before` trae el ultimo
// bloque, con `before` trae el bloque anterior a esa fecha. `hasMore` se
// calcula pidiendo un registro de mas, sin necesitar un COUNT(*) aparte que
// ademas quedaria desactualizado si llegan mensajes nuevos mientras se mira
// el hilo.
export interface MessagesPage<T> {
  data: T[];
  hasMore: boolean;
}

export interface ListMessagesOptions {
  before?: Date;
  limit: number;
}

export interface ConversationQueryPort {
  list(
    filters: ListConversationsFilters,
  ): Promise<Paginated<ConversationListItem>>;
  findById(conversationId: string): Promise<ConversationDetail | null>;
  listMessages(
    conversationId: string,
    options: ListMessagesOptions,
  ): Promise<MessagesPage<MessageItem>>;
  getFlowState(conversationId: string): Promise<FlowStateItem | null>;
}

export const CONVERSATION_QUERY_PORT = Symbol('CONVERSATION_QUERY_PORT');
