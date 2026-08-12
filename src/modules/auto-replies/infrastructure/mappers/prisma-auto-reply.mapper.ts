import { AutoReply as PrismaAutoReply, Prisma } from '@generated/prisma/client';
import { AutoReply } from '../../domain/auto-reply.entity';

const mapPatterns = (value: Prisma.JsonValue): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (pattern): pattern is string => typeof pattern === 'string',
  );
};

export class PrismaAutoReplyMapper {
  static toDomain(record: PrismaAutoReply): AutoReply {
    return {
      id: record.id,
      key: record.key,
      title: record.title,
      matchType: record.matchType,
      patterns: mapPatterns(record.patterns),
      responseText: record.responseText,
      priority: record.priority,
      isActive: record.isActive,
      locale: record.locale,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }
}
