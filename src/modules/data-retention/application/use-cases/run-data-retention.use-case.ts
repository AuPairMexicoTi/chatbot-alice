import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataRetentionConfig } from '@config/data-retention.config';
import {
  buildRetentionCutoffs,
  RetentionCutoffs,
} from '../../domain/retention-cutoffs';
import {
  ConversationPurgeCounts,
  DATA_RETENTION_REPOSITORY,
  DataRetentionRepository,
} from '../ports/data-retention.repository';

export type DataRetentionReport = {
  mode: 'DISABLED' | 'DRY_RUN' | 'PURGE';
  cutoffs: RetentionCutoffs;
  webhookEvents: number;
} & ConversationPurgeCounts;

@Injectable()
export class RunDataRetentionUseCase {
  constructor(
    @Inject(DATA_RETENTION_REPOSITORY)
    private readonly repository: DataRetentionRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(now: Date = new Date()): Promise<DataRetentionReport> {
    const config =
      this.configService.getOrThrow<DataRetentionConfig>('dataRetention');
    const cutoffs = buildRetentionCutoffs(now, config);

    if (!config.enabled) {
      return {
        mode: 'DISABLED',
        cutoffs,
        webhookEvents: 0,
        conversations: 0,
        messages: 0,
        contacts: 0,
      };
    }

    if (config.dryRun) {
      const [webhookEvents, counts] = await Promise.all([
        this.repository.countWebhookEventsCreatedBefore(
          cutoffs.webhookEventsCreatedBefore,
        ),
        this.repository.previewConversationPurge(
          cutoffs.conversationsInactiveBefore,
        ),
      ]);
      return { mode: 'DRY_RUN', cutoffs, webhookEvents, ...counts };
    }

    const webhookEvents = await this.purgeWebhookEvents(
      cutoffs.webhookEventsCreatedBefore,
      config.batchSize,
    );
    const counts = await this.purgeConversations(
      cutoffs.conversationsInactiveBefore,
      config.batchSize,
    );

    return { mode: 'PURGE', cutoffs, webhookEvents, ...counts };
  }

  private async purgeWebhookEvents(
    createdBefore: Date,
    batchSize: number,
  ): Promise<number> {
    let total = 0;
    let deleted = 0;

    do {
      deleted = await this.repository.purgeWebhookEventBatch(
        createdBefore,
        batchSize,
      );
      total += deleted;
    } while (deleted > 0);

    return total;
  }

  private async purgeConversations(
    inactiveBefore: Date,
    batchSize: number,
  ): Promise<ConversationPurgeCounts> {
    const totals = { conversations: 0, messages: 0, contacts: 0 };
    let batch: ConversationPurgeCounts;

    do {
      batch = await this.repository.purgeConversationBatch(
        inactiveBefore,
        batchSize,
      );
      totals.conversations += batch.conversations;
      totals.messages += batch.messages;
      totals.contacts += batch.contacts;
    } while (batch.conversations > 0);

    return totals;
  }
}
