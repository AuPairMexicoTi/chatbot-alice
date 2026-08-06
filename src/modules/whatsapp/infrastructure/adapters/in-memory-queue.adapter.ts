import { Injectable } from '@nestjs/common';
import {
  InboundQueuePort,
  OutboundQueuePort,
  QueueInboundJobInput,
  QueueOutboundJobInput,
} from '../../application/ports/queue.port';

@Injectable()
export class InMemoryQueueAdapter
  implements InboundQueuePort, OutboundQueuePort
{
  readonly inboundJobs: QueueInboundJobInput[] = [];
  readonly outboundJobs: QueueOutboundJobInput[] = [];

  async enqueue(
    input: QueueInboundJobInput | QueueOutboundJobInput,
  ): Promise<void> {
    if ('webhookEventId' in input) {
      this.inboundJobs.push(input);
      return;
    }

    this.outboundJobs.push(input);
  }
}
