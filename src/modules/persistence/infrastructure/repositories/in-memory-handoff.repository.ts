import { Injectable } from '@nestjs/common';
import { HandoffRepository } from '@modules/handoff/application/ports/handoff.repository';
import { Handoff } from '@modules/handoff/domain/handoff.entity';
import { InMemoryStore } from './in-memory.store';

@Injectable()
export class InMemoryHandoffRepository implements HandoffRepository {
  constructor(private readonly store: InMemoryStore) {}

  async findOpenByConversationId(
    conversationId: string,
  ): Promise<Handoff | null> {
    return (
      [...this.store.handoffs.values()].find(
        (handoff) =>
          handoff.conversationId === conversationId &&
          handoff.status === 'OPEN',
      ) ?? null
    );
  }

  async create(
    conversationId: string,
    reason: string | null,
  ): Promise<Handoff> {
    const now = new Date();
    const handoff: Handoff = {
      id: this.store.nextId(),
      conversationId,
      status: 'OPEN',
      reason,
      assignedAgentId: null,
      requestedAt: now,
      acceptedAt: null,
      closedAt: null,
      createdAt: now,
      updatedAt: now,
    };
    this.store.handoffs.set(handoff.id, handoff);
    return handoff;
  }
}
