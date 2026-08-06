import { Injectable } from '@nestjs/common';
import { ConversationRepository } from '@modules/conversations/application/ports/conversation.repository';
import {
  Conversation,
  ConversationStatus,
} from '@modules/conversations/domain/conversation.entity';
import { InMemoryStore } from './in-memory.store';

@Injectable()
export class InMemoryConversationRepository implements ConversationRepository {
  constructor(private readonly store: InMemoryStore) {}

  async getOrCreateByContactId(
    contactId: string,
    locale: string,
  ): Promise<Conversation> {
    const existing = [...this.store.conversations.values()].find(
      (conversation) =>
        conversation.contactId === contactId &&
        conversation.status !== 'CLOSED',
    );

    if (existing) {
      return existing;
    }

    const now = new Date();
    const conversation: Conversation = {
      id: this.store.nextId(),
      contactId,
      status: 'OPEN',
      locale,
      createdAt: now,
      updatedAt: now,
    };
    this.store.conversations.set(conversation.id, conversation);
    return conversation;
  }

  async findById(id: string): Promise<Conversation | null> {
    return this.store.conversations.get(id) ?? null;
  }

  async updateStatus(
    id: string,
    status: ConversationStatus,
  ): Promise<Conversation> {
    const conversation = this.store.conversations.get(id);
    if (!conversation) {
      throw new Error(`Conversation ${id} not found`);
    }

    const updated: Conversation = {
      ...conversation,
      status,
      updatedAt: new Date(),
    };
    this.store.conversations.set(id, updated);
    return updated;
  }
}
