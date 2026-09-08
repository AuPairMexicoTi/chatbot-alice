import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ConversationFlowStateService } from '@modules/conversation-flow/application/conversation-flow-state.service';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '@modules/messaging/application/ports/message.repository';
import { QueueOutboundMessageUseCase } from '../use-cases/queue-outbound-message.use-case';

type InactivityJob = { conversationId: string; stage: 'REMINDER' | 'CLOSE' };
const queueName = 'conversation-inactivity';
const reminderDelayMs = 2 * 60 * 60 * 1000;
const closeDelayMs = 60 * 60 * 1000;

@Injectable()
export class ConversationInactivityService {
  constructor(
    @InjectQueue(queueName) private readonly queue: Queue<InactivityJob>,
    private readonly flowStateService: ConversationFlowStateService,
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    private readonly queueOutboundMessageUseCase: QueueOutboundMessageUseCase,
  ) {}

  async schedule(conversationId: string): Promise<void> {
    await this.cancel(conversationId);
    await this.queue.add(
      'conversation-inactivity',
      { conversationId, stage: 'REMINDER' },
      {
        delay: reminderDelayMs,
      jobId: `inactivity-reminder-${conversationId}`,
      },
    );
  }

  async cancel(conversationId: string): Promise<void> {
    for (const stage of ['reminder', 'close']) {
      const job = await this.queue.getJob(`inactivity-${stage}-${conversationId}`);
      await job?.remove();
    }
  }

  async process(job: InactivityJob): Promise<void> {
    if (job.stage === 'REMINDER') {
      await this.send(
        job.conversationId,
        'Hola 😊 ¿Sigues interesada en conocer nuestros programas de Au Pair?',
      );
      await this.queue.add(
        'conversation-inactivity',
        { conversationId: job.conversationId, stage: 'CLOSE' },
        {
          delay: closeDelayMs,
        jobId: `inactivity-close-${job.conversationId}`,
        },
      );
      return;
    }
    if (await this.flowStateService.closeForInactivity(job.conversationId)) {
      await this.send(
        job.conversationId,
        'Cerramos esta conversación por ahora. Si quieres retomarla, mándame *Hola* y con gusto continuamos contigo. 💖',
      );
    }
  }

  private async send(conversationId: string, text: string): Promise<void> {
    const message = await this.messageRepository.create({
      conversationId,
      direction: 'OUTBOUND',
      type: 'TEXT',
      providerMessageId: null,
      text,
      status: 'QUEUED',
      metadata: { responseSource: 'CONVERSATION_INACTIVITY' },
    });
    await this.queueOutboundMessageUseCase.execute(message.id);
  }
}
