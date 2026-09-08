import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  CreateMessageInput,
  MessageRepository,
} from '@modules/messaging/application/ports/message.repository';
import {
  Message,
  MessageStatus,
} from '@modules/messaging/domain/message.entity';
import { PrismaMessageMapper } from '../mappers/prisma-message.mapper';

@Injectable()
export class PrismaMessageRepository implements MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateMessageInput): Promise<Message> {
    const record = await this.prisma.message.create({ data: input });
    return PrismaMessageMapper.toDomain(record);
  }

  async listRecentByConversationId(
    conversationId: string,
    limit: number,
  ): Promise<Message[]> {
    const records = await this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return records.reverse().map(PrismaMessageMapper.toDomain);
  }

  async findById(id: string): Promise<Message | null> {
    const record = await this.prisma.message.findUnique({ where: { id } });
    return record ? PrismaMessageMapper.toDomain(record) : null;
  }

  async updateStatus(
    id: string,
    status: MessageStatus,
    providerMessageId?: string,
  ): Promise<Message> {
    const record = await this.prisma.message.update({
      where: { id },
      data: {
        status,
        ...(providerMessageId === undefined ? {} : { providerMessageId }),
      },
    });
    return PrismaMessageMapper.toDomain(record);
  }
}
