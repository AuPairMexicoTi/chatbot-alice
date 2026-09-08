import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@generated/prisma';
import {
  CreateWebhookEventInput,
  WebhookEventRepository,
} from '@modules/webhooks/application/ports/webhook-event.repository';
import {
  WebhookEvent,
  WebhookStatus,
} from '@modules/webhooks/domain/webhook-event.entity';
import { PrismaWebhookEventMapper } from '../mappers/prisma-webhook-event.mapper';

@Injectable()
export class PrismaWebhookEventRepository implements WebhookEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<WebhookEvent | null> {
    const record = await this.prisma.webhookEvent.findUnique({ where: { id } });
    return record ? PrismaWebhookEventMapper.toDomain(record) : null;
  }

  async findByExternalId(externalId: string): Promise<WebhookEvent | null> {
    const record = await this.prisma.webhookEvent.findUnique({
      where: { externalId },
    });
    return record ? PrismaWebhookEventMapper.toDomain(record) : null;
  }

  async create(input: CreateWebhookEventInput): Promise<WebhookEvent> {
    const payload =
      input.payload === null
        ? Prisma.JsonNull
        : (input.payload as Prisma.InputJsonValue);
    const record = await this.prisma.webhookEvent.create({
      data: { ...input, payload },
    });
    return PrismaWebhookEventMapper.toDomain(record);
  }

  async updateStatus(id: string, status: WebhookStatus): Promise<WebhookEvent> {
    const record = await this.prisma.webhookEvent.update({
      where: { id },
      data: { status },
    });
    return PrismaWebhookEventMapper.toDomain(record);
  }
}
