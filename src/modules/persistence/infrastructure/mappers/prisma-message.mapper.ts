import { Message as PrismaMessage, Prisma } from '@generated/prisma';
import { Message } from '@modules/messaging/domain/message.entity';

const mapMetadata = (
  value: Prisma.JsonValue,
): Record<string, string | number | boolean | null> => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string | number | boolean | null] =>
        typeof entry[1] === 'string' ||
        typeof entry[1] === 'number' ||
        typeof entry[1] === 'boolean' ||
        entry[1] === null,
    ),
  );
};

export class PrismaMessageMapper {
  static toDomain(record: PrismaMessage): Message {
    return {
      id: record.id,
      conversationId: record.conversationId,
      direction: record.direction,
      type: record.type,
      providerMessageId: record.providerMessageId,
      text: record.text,
      status: record.status,
      metadata: mapMetadata(record.metadata),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }
}
