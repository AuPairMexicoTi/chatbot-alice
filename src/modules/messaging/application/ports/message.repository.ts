import {
  Message,
  MessageDirection,
  MessageStatus,
  MessageType,
} from '../../domain/message.entity';

export interface CreateMessageInput {
  conversationId: string;
  direction: MessageDirection;
  type: MessageType;
  providerMessageId: string | null;
  text: string | null;
  status: MessageStatus;
  metadata: Record<string, string | number | boolean | null>;
}

export interface MessageRepository {
  create(input: CreateMessageInput): Promise<Message>;
  listRecentByConversationId(
    conversationId: string,
    limit: number,
  ): Promise<Message[]>;
  findById(id: string): Promise<Message | null>;
  updateStatus(
    id: string,
    status: MessageStatus,
    providerMessageId?: string,
  ): Promise<Message>;
}

export const MESSAGE_REPOSITORY = Symbol('MESSAGE_REPOSITORY');
