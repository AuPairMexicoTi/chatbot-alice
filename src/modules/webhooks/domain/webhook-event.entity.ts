import { JsonValue } from '@shared/domain/types/json.type';

export type WebhookStatus =
  'RECEIVED' | 'QUEUED' | 'PROCESSING' | 'PROCESSED' | 'FAILED' | 'IGNORED';

export interface WebhookEvent {
  id: string;
  externalId: string;
  provider: 'WHATSAPP';
  eventType: string;
  status: WebhookStatus;
  payload: JsonValue;
  headers: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}
