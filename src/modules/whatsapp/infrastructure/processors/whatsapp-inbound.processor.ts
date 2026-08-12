import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { JsonValue } from '@shared/domain/types/json.type';
import {
  WEBHOOK_EVENT_REPOSITORY,
  WebhookEventRepository,
} from '@modules/webhooks/application/ports/webhook-event.repository';
import { WhatsAppWebhookParser } from '../parsers/whatsapp-webhook.parser';
import { ProcessInboundWhatsAppMessageUseCase } from '../../application/use-cases/process-inbound-whatsapp-message.use-case';

@Processor('whatsapp-inbound')
export class WhatsAppInboundProcessor extends WorkerHost {
  constructor(
    @Inject(WEBHOOK_EVENT_REPOSITORY)
    private readonly webhookEventRepository: WebhookEventRepository,
    private readonly whatsAppWebhookParser: WhatsAppWebhookParser,
    private readonly processInboundWhatsAppMessageUseCase: ProcessInboundWhatsAppMessageUseCase,
  ) {
    super();
  }

  async process(
    job: Job<{ webhookEventId: string; externalId: string }>,
  ): Promise<void> {
    const webhookEvent = await this.webhookEventRepository.findById(
      job.data.webhookEventId,
    );

    if (!webhookEvent) {
      return;
    }

    await this.webhookEventRepository.updateStatus(webhookEvent.id, 'PROCESSING');

    try {
      const parsed = this.whatsAppWebhookParser.parse(
        webhookEvent.payload as JsonValue,
      );

      await this.processInboundWhatsAppMessageUseCase.execute(parsed);
      await this.webhookEventRepository.updateStatus(webhookEvent.id, 'PROCESSED');
    } catch (error) {
      await this.webhookEventRepository.updateStatus(webhookEvent.id, 'FAILED');
      throw error;
    }
  }
}
