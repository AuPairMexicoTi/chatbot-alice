import { Injectable } from '@nestjs/common';
import {
  CreateWebhookEventInput,
  WebhookEventRepository,
} from '@modules/webhooks/application/ports/webhook-event.repository';
import {
  WebhookEvent,
  WebhookStatus,
} from '@modules/webhooks/domain/webhook-event.entity';
import { InMemoryStore } from './in-memory.store';

@Injectable()
export class InMemoryWebhookEventRepository implements WebhookEventRepository {
  constructor(private readonly store: InMemoryStore) {}

  async findByExternalId(externalId: string): Promise<WebhookEvent | null> {
    return (
      [...this.store.webhooks.values()].find(
        (webhook) => webhook.externalId === externalId,
      ) ?? null
    );
  }

  async create(input: CreateWebhookEventInput): Promise<WebhookEvent> {
    const now = new Date();
    const event: WebhookEvent = {
      id: this.store.nextId(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    this.store.webhooks.set(event.id, event);
    return event;
  }

  async updateStatus(id: string, status: WebhookStatus): Promise<WebhookEvent> {
    const webhook = this.store.webhooks.get(id);
    if (!webhook) {
      throw new Error(`Webhook ${id} not found`);
    }

    const updated: WebhookEvent = {
      ...webhook,
      status,
      updatedAt: new Date(),
    };
    this.store.webhooks.set(id, updated);
    return updated;
  }
}
