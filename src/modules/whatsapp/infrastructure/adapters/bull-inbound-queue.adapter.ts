import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import {
  InboundQueuePort,
  QueueInboundJobInput,
} from '../../application/ports/queue.port';

@Injectable()
export class BullInboundQueueAdapter implements InboundQueuePort {
  constructor(@InjectQueue('whatsapp-inbound') private readonly queue: Queue) {}

  async enqueue(input: QueueInboundJobInput): Promise<void> {
    await this.queue.add('process-whatsapp-inbound', input, {
      jobId: input.externalId,
    });
  }
}
