import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { DATA_RETENTION_REPOSITORY } from './application/ports/data-retention.repository';
import { RunDataRetentionUseCase } from './application/use-cases/run-data-retention.use-case';
import { DATA_RETENTION_QUEUE } from './infrastructure/data-retention.queue';
import { DataRetentionProcessor } from './infrastructure/processors/data-retention.processor';
import { PrismaDataRetentionRepository } from './infrastructure/repositories/prisma-data-retention.repository';
import { DataRetentionScheduler } from './infrastructure/schedulers/data-retention.scheduler';

@Module({
  imports: [BullModule.registerQueue({ name: DATA_RETENTION_QUEUE })],
  providers: [
    RunDataRetentionUseCase,
    DataRetentionProcessor,
    DataRetentionScheduler,
    {
      provide: DATA_RETENTION_REPOSITORY,
      useClass: PrismaDataRetentionRepository,
    },
  ],
})
export class DataRetentionModule {}
