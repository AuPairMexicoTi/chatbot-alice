import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ConversationInactivityService } from '../../application/services/conversation-inactivity.service';

@Processor('conversation-inactivity')
export class ConversationInactivityProcessor extends WorkerHost {
  constructor(private readonly service: ConversationInactivityService) {
    super();
  }
  async process(
    job: Job<{ conversationId: string; stage: 'REMINDER' | 'CLOSE' }>,
  ): Promise<void> {
    await this.service.process(job.data);
  }
}
