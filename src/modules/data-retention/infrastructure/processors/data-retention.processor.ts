import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { RunDataRetentionUseCase } from '../../application/use-cases/run-data-retention.use-case';
import { DATA_RETENTION_QUEUE } from '../data-retention.queue';

@Processor(DATA_RETENTION_QUEUE)
export class DataRetentionProcessor extends WorkerHost {
  private readonly logger = new Logger(DataRetentionProcessor.name);

  constructor(private readonly useCase: RunDataRetentionUseCase) {
    super();
  }

  async process(): Promise<void> {
    const report = await this.useCase.execute();

    this.logger.log({ msg: 'Retencion de datos finalizada', ...report });
  }
}
