import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { DataRetentionConfig } from '@config/data-retention.config';
import {
  DATA_RETENTION_CRON,
  DATA_RETENTION_JOB_NAME,
  DATA_RETENTION_QUEUE,
  DATA_RETENTION_SCHEDULER_ID,
  DATA_RETENTION_TIMEZONE,
} from '../data-retention.queue';

@Injectable()
export class DataRetentionScheduler implements OnApplicationBootstrap {
  private readonly logger = new Logger(DataRetentionScheduler.name);

  constructor(
    @InjectQueue(DATA_RETENTION_QUEUE) private readonly queue: Queue,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    if (this.configService.get<string>('app.nodeEnv') === 'test') {
      return;
    }

    const { enabled } =
      this.configService.getOrThrow<DataRetentionConfig>('dataRetention');

    // La programacion vive en Redis y sobrevive a los reinicios: apagar
    // RETENTION_ENABLED debe quitarla, no solo dejar de registrarla. Un fallo
    // aqui no debe tumbar el bot, que no depende de esta tarea para operar.
    try {
      if (enabled) {
        await this.queue.upsertJobScheduler(
          DATA_RETENTION_SCHEDULER_ID,
          { pattern: DATA_RETENTION_CRON, tz: DATA_RETENTION_TIMEZONE },
          { name: DATA_RETENTION_JOB_NAME },
        );
      } else {
        await this.queue.removeJobScheduler(DATA_RETENTION_SCHEDULER_ID);
      }
    } catch (error) {
      this.logger.error({
        err: error,
        msg: 'No se pudo actualizar la programacion de retencion de datos',
      });
    }
  }
}
