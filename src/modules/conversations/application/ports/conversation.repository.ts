import {
  Conversation,
  ConversationStatus,
} from '../../domain/conversation.entity';

export interface ConversationRepository {
  getOrCreateByContactId(
    contactId: string,
    locale: string,
  ): Promise<Conversation>;
  findById(id: string): Promise<Conversation | null>;
  updateStatus(id: string, status: ConversationStatus): Promise<Conversation>;
}

export const CONVERSATION_REPOSITORY = Symbol('CONVERSATION_REPOSITORY');
