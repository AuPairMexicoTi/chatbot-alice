import { Inject, Injectable } from '@nestjs/common';
import { JsonValue } from '@shared/domain/types/json.type';
import { WhatsAppWebhookParser } from '@modules/whatsapp/infrastructure/parsers/whatsapp-webhook.parser';
import {
  INBOUND_QUEUE_PORT,
  InboundQueuePort,
} from '@modules/whatsapp/application/ports/queue.port';
import {
  WEBHOOK_EVENT_REPOSITORY,
  WebhookEventRepository,
} from '../ports/webhook-event.repository';

@Injectable()
export class ReceiveWhatsAppWebhookUseCase {
  constructor(
    private readonly parser: WhatsAppWebhookParser,
    @Inject(WEBHOOK_EVENT_REPOSITORY)
    private readonly webhookEventRepository: WebhookEventRepository,
    @Inject(INBOUND_QUEUE_PORT)
    private readonly inboundQueuePort: InboundQueuePort,
  ) {}

  async execute(
    payload: JsonValue,
    headers: Record<string, string>,
  ): Promise<{ accepted: boolean; idempotent: boolean }> {
    const parsed = this.parser.parse(payload);
    const existing = await this.webhookEventRepository.findByExternalId(
      parsed.externalId,
    );

    if (existing) {
      return { accepted: true, idempotent: true };
    }

    const event = await this.webhookEventRepository.create({
      externalId: parsed.externalId,
      provider: 'WHATSAPP',
      eventType: parsed.eventType,
      status: 'RECEIVED',
      payload,
      headers,
    });

    await this.inboundQueuePort.enqueue({
      webhookEventId: event.id,
      externalId: parsed.externalId,
    });
    await this.webhookEventRepository.updateStatus(event.id, 'QUEUED');

    return { accepted: true, idempotent: false };
  }
}
