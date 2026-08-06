import { Inject, Injectable } from '@nestjs/common';
import { OUTBOUND_QUEUE_PORT, OutboundQueuePort } from '../ports/queue.port';

@Injectable()
export class QueueOutboundMessageUseCase {
  constructor(
    @Inject(OUTBOUND_QUEUE_PORT)
    private readonly outboundQueuePort: OutboundQueuePort,
  ) {}

  async execute(messageId: string): Promise<void> {
    await this.outboundQueuePort.enqueue({ messageId });
  }
}
