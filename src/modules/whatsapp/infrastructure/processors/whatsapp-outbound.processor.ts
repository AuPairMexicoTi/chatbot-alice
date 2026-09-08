import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '@modules/messaging/application/ports/message.repository';
import { SendOutboundWhatsAppMessageUseCase } from '../../application/use-cases/send-outbound-whatsapp-message.use-case';

@Processor('whatsapp-outbound')
export class WhatsAppOutboundProcessor extends WorkerHost {
  private readonly logger = new Logger(WhatsAppOutboundProcessor.name);

  constructor(
    private readonly sendOutboundWhatsAppMessageUseCase: SendOutboundWhatsAppMessageUseCase,
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
  ) {
    super();
  }

  async process(job: Job<{ messageId: string }>): Promise<void> {
    try {
      await this.sendOutboundWhatsAppMessageUseCase.execute(job.data.messageId);
    } catch (error) {
      await this.messageRepository.updateStatus(job.data.messageId, 'FAILED');
      this.logger.error(
        `No se pudo enviar el mensaje de WhatsApp ${job.data.messageId}: ${
          error instanceof Error ? error.message : 'Error desconocido'
        }`,
      );
      throw error;
    }
  }
}
