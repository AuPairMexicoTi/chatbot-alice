import { Handoff as PrismaHandoff } from '@generated/prisma';
import { Handoff } from '@modules/handoff/domain/handoff.entity';

export class PrismaHandoffMapper {
  static toDomain(record: PrismaHandoff): Handoff {
    return {
      id: record.id,
      conversationId: record.conversationId,
      status: record.status,
      reason: record.reason,
      assignedAgentId: record.assignedAgentId,
      requestedAt: record.requestedAt,
      acceptedAt: record.acceptedAt,
      closedAt: record.closedAt,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }
}
