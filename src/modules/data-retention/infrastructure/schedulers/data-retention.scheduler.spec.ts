import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { DataRetentionScheduler } from './data-retention.scheduler';

const buildScheduler = (nodeEnv: string, enabled: boolean) => {
  const queue = {
    upsertJobScheduler: jest.fn(() => Promise.resolve()),
    removeJobScheduler: jest.fn(() => Promise.resolve(true)),
  };
  const configService = {
    get: () => nodeEnv,
    getOrThrow: () => ({ enabled }),
  };

  return {
    queue,
    scheduler: new DataRetentionScheduler(
      queue as unknown as Queue,
      configService as unknown as ConfigService,
    ),
  };
};

describe('DataRetentionScheduler', () => {
  it('schedules the daily job at 3 a.m. Mexico City time when enabled', async () => {
    const { queue, scheduler } = buildScheduler('production', true);

    await scheduler.onApplicationBootstrap();

    expect(queue.upsertJobScheduler).toHaveBeenCalledWith(
      'data-retention-daily',
      { pattern: '0 3 * * *', tz: 'America/Mexico_City' },
      { name: 'data-retention' },
    );
    expect(queue.removeJobScheduler).not.toHaveBeenCalled();
  });

  it('removes a previous schedule when disabled', async () => {
    const { queue, scheduler } = buildScheduler('production', false);

    await scheduler.onApplicationBootstrap();

    expect(queue.removeJobScheduler).toHaveBeenCalledWith(
      'data-retention-daily',
    );
    expect(queue.upsertJobScheduler).not.toHaveBeenCalled();
  });

  it('does not touch Redis during tests', async () => {
    const { queue, scheduler } = buildScheduler('test', true);

    await scheduler.onApplicationBootstrap();

    expect(queue.upsertJobScheduler).not.toHaveBeenCalled();
    expect(queue.removeJobScheduler).not.toHaveBeenCalled();
  });

  it('does not crash the app when Redis fails', async () => {
    const { queue, scheduler } = buildScheduler('production', true);
    queue.upsertJobScheduler.mockRejectedValueOnce(new Error('redis down'));

    await expect(scheduler.onApplicationBootstrap()).resolves.toBeUndefined();
  });
});
