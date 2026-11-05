import { ConfigService } from '@nestjs/config';
import { DataRetentionConfig } from '@config/data-retention.config';
import {
  ConversationPurgeCounts,
  DataRetentionRepository,
} from '../ports/data-retention.repository';
import { RunDataRetentionUseCase } from './run-data-retention.use-case';

const now = new Date('2027-04-12T09:00:00.000Z');
const conversationCutoff = new Date('2026-10-12T09:00:00.000Z');
const webhookCutoff = new Date('2027-03-13T09:00:00.000Z');
const emptyBatch = { conversations: 0, messages: 0, contacts: 0 };

const buildConfig = (
  overrides: Partial<DataRetentionConfig> = {},
): DataRetentionConfig => ({
  enabled: true,
  dryRun: false,
  conversationMonths: 6,
  webhookDays: 30,
  batchSize: 2,
  ...overrides,
});

const buildRepository = (
  webhookBatches: number[] = [],
  conversationBatches: ConversationPurgeCounts[] = [],
) => {
  const nextWebhookBatch = [...webhookBatches];
  const nextConversationBatch = [...conversationBatches];

  return {
    previewConversationPurge: jest.fn(() =>
      Promise.resolve({ conversations: 3, messages: 9, contacts: 2 }),
    ),
    countWebhookEventsCreatedBefore: jest.fn(() => Promise.resolve(7)),
    purgeWebhookEventBatch: jest.fn(() =>
      Promise.resolve(nextWebhookBatch.shift() ?? 0),
    ),
    purgeConversationBatch: jest.fn(() =>
      Promise.resolve(nextConversationBatch.shift() ?? emptyBatch),
    ),
  } satisfies DataRetentionRepository;
};

const buildUseCase = (
  repository: DataRetentionRepository,
  config: DataRetentionConfig,
) =>
  new RunDataRetentionUseCase(repository, {
    getOrThrow: () => config,
  } as unknown as ConfigService);

describe('RunDataRetentionUseCase', () => {
  it('does not touch the repository while disabled', async () => {
    const repository = buildRepository();

    const report = await buildUseCase(
      repository,
      buildConfig({ enabled: false }),
    ).execute(now);

    expect(report.mode).toBe('DISABLED');
    expect(repository.previewConversationPurge).not.toHaveBeenCalled();
    expect(repository.countWebhookEventsCreatedBefore).not.toHaveBeenCalled();
    expect(repository.purgeConversationBatch).not.toHaveBeenCalled();
    expect(repository.purgeWebhookEventBatch).not.toHaveBeenCalled();
  });

  it('only reports what it would delete in dry-run mode', async () => {
    const repository = buildRepository();

    const report = await buildUseCase(
      repository,
      buildConfig({ dryRun: true }),
    ).execute(now);

    expect(report).toMatchObject({
      mode: 'DRY_RUN',
      webhookEvents: 7,
      conversations: 3,
      messages: 9,
      contacts: 2,
    });
    expect(repository.previewConversationPurge).toHaveBeenCalledWith(
      conversationCutoff,
    );
    expect(repository.countWebhookEventsCreatedBefore).toHaveBeenCalledWith(
      webhookCutoff,
    );
    expect(repository.purgeConversationBatch).not.toHaveBeenCalled();
    expect(repository.purgeWebhookEventBatch).not.toHaveBeenCalled();
  });

  it('purges every batch until nothing is left and adds up the totals', async () => {
    const repository = buildRepository(
      [2, 1],
      [
        { conversations: 2, messages: 6, contacts: 2 },
        { conversations: 1, messages: 4, contacts: 0 },
      ],
    );

    const report = await buildUseCase(repository, buildConfig()).execute(now);

    expect(report).toMatchObject({
      mode: 'PURGE',
      webhookEvents: 3,
      conversations: 3,
      messages: 10,
      contacts: 2,
    });
    expect(repository.purgeWebhookEventBatch).toHaveBeenCalledTimes(3);
    expect(repository.purgeWebhookEventBatch).toHaveBeenCalledWith(
      webhookCutoff,
      2,
    );
    expect(repository.purgeConversationBatch).toHaveBeenCalledTimes(3);
    expect(repository.purgeConversationBatch).toHaveBeenCalledWith(
      conversationCutoff,
      2,
    );
  });

  it('stops right away when nothing is eligible', async () => {
    const repository = buildRepository();

    const report = await buildUseCase(repository, buildConfig()).execute(now);

    expect(report).toMatchObject({
      webhookEvents: 0,
      conversations: 0,
      messages: 0,
      contacts: 0,
    });
    expect(repository.purgeWebhookEventBatch).toHaveBeenCalledTimes(1);
    expect(repository.purgeConversationBatch).toHaveBeenCalledTimes(1);
  });
});
