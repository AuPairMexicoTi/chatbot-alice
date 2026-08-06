import { Conversation as PrismaConversation } from '@generated/prisma';
import { Conversation } from '@modules/conversations/domain/conversation.entity';

export class PrismaConversationMapper {
  static toDomain(record: PrismaConversation): Conversation {
    return {
      id: record.id,
      contactId: record.contactId,
      status: record.status,
      locale: record.locale,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }
}
