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
    // La bandeja de conversaciones admin ordena por Conversation.updatedAt
    // (ver prisma-conversation-query.repository.ts) esperando que refleje
    // la actividad real -- sin este touch, updatedAt solo cambia por
    // updateStatus() y la lista termina ordenada por creacion/cambio de
    // estado en vez de por el ultimo mensaje.
    const [, record] = await this.prisma.$transaction([
      this.prisma.conversation.update({
        where: { id: input.conversationId },
        data: { updatedAt: new Date() },
      }),
      this.prisma.message.create({ data: input }),
    ]);
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
    return records
      .reverse()
      .map((record) => PrismaMessageMapper.toDomain(record));
  }

  async findById(id: string): Promise<Message | null> {
    const record = await this.prisma.message.findUnique({ where: { id } });
    return record ? PrismaMessageMapper.toDomain(record) : null;
  }

  async findByProviderMessageId(
    providerMessageId: string,
  ): Promise<Message | null> {
    const record = await this.prisma.message.findFirst({
      where: { providerMessageId },
      orderBy: { createdAt: 'desc' },
    });
    return record ? PrismaMessageMapper.toDomain(record) : null;
  }

  async updateStatus(
    id: string,
    status: MessageStatus,
    providerMessageId?: string,
    metadataPatch?: Record<string, string | number | boolean | null>,
  ): Promise<Message> {
    // Json no soporta merge parcial en una sola escritura -- se lee el
    // metadata actual para no perder lo que ya traia (ej. responseSource)
    // al agregarle el motivo del rechazo.
    const metadata:
      Record<string, string | number | boolean | null> | undefined =
      metadataPatch
        ? {
            ...((
              await this.prisma.message.findUniqueOrThrow({
                where: { id },
              })
            ).metadata as Record<string, string | number | boolean | null>),
            ...metadataPatch,
          }
        : undefined;

    const record = await this.prisma.message.update({
      where: { id },
      data: {
        status,
        ...(providerMessageId === undefined ? {} : { providerMessageId }),
        ...(metadata === undefined ? {} : { metadata }),
      },
    });
    return PrismaMessageMapper.toDomain(record);
  }
}
