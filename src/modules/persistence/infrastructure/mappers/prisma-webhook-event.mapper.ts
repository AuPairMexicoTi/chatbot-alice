import { WebhookEvent as PrismaWebhookEvent, Prisma } from '@generated/prisma';
import { JsonValue } from '@shared/domain/types/json.type';
import { WebhookEvent } from '@modules/webhooks/domain/webhook-event.entity';

const toHeaders = (value: Prisma.JsonValue): Record<string, string> => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] => typeof entry[1] === 'string',
    ),
  );
};

export class PrismaWebhookEventMapper {
  static toDomain(record: PrismaWebhookEvent): WebhookEvent {
    return {
      id: record.id,
      externalId: record.externalId,
      provider: 'WHATSAPP',
      eventType: record.eventType,
      status: record.status,
      payload: record.payload as JsonValue,
      headers: toHeaders(record.headers),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }
}
