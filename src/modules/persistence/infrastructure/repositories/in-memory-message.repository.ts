import { Injectable } from '@nestjs/common';
import {
  CreateMessageInput,
  MessageRepository,
} from '@modules/messaging/application/ports/message.repository';
import {
  Message,
  MessageStatus,
} from '@modules/messaging/domain/message.entity';
import { InMemoryStore } from './in-memory.store';

@Injectable()
export class InMemoryMessageRepository implements MessageRepository {
  constructor(private readonly store: InMemoryStore) {}

  async create(input: CreateMessageInput): Promise<Message> {
    const now = new Date();
    const message: Message = {
      id: this.store.nextId(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    this.store.messages.set(message.id, message);
    return message;
  }

  async listRecentByConversationId(
    conversationId: string,
    limit: number,
  ): Promise<Message[]> {
    return [...this.store.messages.values()]
      .filter((message) => message.conversationId === conversationId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit)
      .reverse();
  }

  async findById(id: string): Promise<Message | null> {
    return this.store.messages.get(id) ?? null;
  }

  async updateStatus(
    id: string,
    status: MessageStatus,
    providerMessageId?: string,
  ): Promise<Message> {
    const message = this.store.messages.get(id);
    if (!message) {
      throw new Error(`Message ${id} not found`);
    }

    const updated: Message = {
      ...message,
      status,
      providerMessageId: providerMessageId ?? message.providerMessageId,
      updatedAt: new Date(),
    };
    this.store.messages.set(id, updated);
    return updated;
  }
}
