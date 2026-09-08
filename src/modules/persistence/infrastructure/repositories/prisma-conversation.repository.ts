import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConversationRepository } from '@modules/conversations/application/ports/conversation.repository';
import {
  Conversation,
  ConversationStatus,
} from '@modules/conversations/domain/conversation.entity';
import { PrismaConversationMapper } from '../mappers/prisma-conversation.mapper';

@Injectable()
export class PrismaConversationRepository implements ConversationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateByContactId(
    contactId: string,
    locale: string,
  ): Promise<Conversation> {
    const existing = await this.prisma.conversation.findFirst({
      where: { contactId, status: { not: 'CLOSED' } },
      orderBy: { createdAt: 'desc' },
    });
    const record =
      existing ??
      (await this.prisma.conversation.create({
        data: { contactId, locale },
      }));
    return PrismaConversationMapper.toDomain(record);
  }

  async findById(id: string): Promise<Conversation | null> {
    const record = await this.prisma.conversation.findUnique({ where: { id } });
    return record ? PrismaConversationMapper.toDomain(record) : null;
  }

  async updateStatus(
    id: string,
    status: ConversationStatus,
  ): Promise<Conversation> {
    const record = await this.prisma.conversation.update({
      where: { id },
      data: { status },
    });
    return PrismaConversationMapper.toDomain(record);
  }
}
