import { Inject, Injectable, Logger } from '@nestjs/common';
import { JsonValue } from '@shared/domain/types/json.type';
import {
  ParsedWhatsAppStatusUpdate,
  WhatsAppWebhookParser,
} from '@modules/whatsapp/infrastructure/parsers/whatsapp-webhook.parser';
import {
  INBOUND_QUEUE_PORT,
  InboundQueuePort,
} from '@modules/whatsapp/application/ports/queue.port';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '@modules/messaging/application/ports/message.repository';
import {
  WEBHOOK_EVENT_REPOSITORY,
  WebhookEventRepository,
} from '../ports/webhook-event.repository';

@Injectable()
export class ReceiveWhatsAppWebhookUseCase {
  private readonly logger = new Logger(ReceiveWhatsAppWebhookUseCase.name);

  constructor(
    private readonly parser: WhatsAppWebhookParser,
    @Inject(WEBHOOK_EVENT_REPOSITORY)
    private readonly webhookEventRepository: WebhookEventRepository,
    @Inject(INBOUND_QUEUE_PORT)
    private readonly inboundQueuePort: InboundQueuePort,
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
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

    // Un callback de estatus (sent/delivered/read/failed) no es un mensaje
    // nuevo de la candidata -- no hay nada que el flujo guiado deba evaluar,
    // asi que no se encola para ProcessInboundWhatsAppMessageUseCase. Solo
    // "failed" nos importa: reconciliar el Message saliente para que deje de
    // quedarse marcado SENT para siempre cuando Meta lo rechaza despues de
    // aceptarlo (ver meta-whatsapp.gateway.ts -- el 200 inicial no garantiza
    // la entrega real).
    if (parsed.statusUpdate) {
      if (parsed.statusUpdate.status === 'failed') {
        await this.reconcileFailedDelivery(parsed.statusUpdate);
      }
      await this.webhookEventRepository.updateStatus(event.id, 'PROCESSED');
      return { accepted: true, idempotent: false };
    }

    await this.inboundQueuePort.enqueue({
      webhookEventId: event.id,
      externalId: parsed.externalId,
    });
    await this.webhookEventRepository.updateStatus(event.id, 'QUEUED');

    return { accepted: true, idempotent: false };
  }

  private async reconcileFailedDelivery(
    update: ParsedWhatsAppStatusUpdate,
  ): Promise<void> {
    const message = await this.messageRepository.findByProviderMessageId(
      update.providerMessageId,
    );

    if (!message) {
      this.logger.warn({
        providerMessageId: update.providerMessageId,
        errorCode: update.errorCode,
        errorTitle: update.errorTitle,
        msg: 'Meta reportó un mensaje saliente rechazado que no se encontró por provider_message_id',
      });
      return;
    }

    await this.messageRepository.updateStatus(message.id, 'FAILED', undefined, {
      failure_code: update.errorCode,
      failure_title: update.errorTitle,
    });

    this.logger.warn({
      messageId: message.id,
      conversationId: message.conversationId,
      providerMessageId: update.providerMessageId,
      errorCode: update.errorCode,
      errorTitle: update.errorTitle,
      msg: 'Meta rechazó la entrega de un mensaje saliente',
    });
  }
}
