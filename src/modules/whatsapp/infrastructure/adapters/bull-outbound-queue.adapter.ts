import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import {
  OutboundQueuePort,
  QueueOutboundJobInput,
} from '../../application/ports/queue.port';

@Injectable()
export class BullOutboundQueueAdapter implements OutboundQueuePort {
  constructor(
    @InjectQueue('whatsapp-outbound') private readonly queue: Queue,
  ) {}

  async enqueue(input: QueueOutboundJobInput): Promise<void> {
    await this.queue.add('send-whatsapp-outbound', input, {
      jobId: input.messageId,
    });
  }
}
