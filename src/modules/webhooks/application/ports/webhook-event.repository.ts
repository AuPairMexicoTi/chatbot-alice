import { JsonValue } from '@shared/domain/types/json.type';
import { WebhookEvent, WebhookStatus } from '../../domain/webhook-event.entity';

export interface CreateWebhookEventInput {
  externalId: string;
  provider: 'WHATSAPP';
  eventType: string;
  status: WebhookStatus;
  payload: JsonValue;
  headers: Record<string, string>;
}

export interface WebhookEventRepository {
  findByExternalId(externalId: string): Promise<WebhookEvent | null>;
  create(input: CreateWebhookEventInput): Promise<WebhookEvent>;
  updateStatus(id: string, status: WebhookStatus): Promise<WebhookEvent>;
}

export const WEBHOOK_EVENT_REPOSITORY = Symbol('WEBHOOK_EVENT_REPOSITORY');
