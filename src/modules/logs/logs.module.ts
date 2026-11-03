import { Module } from '@nestjs/common';
import { CrmSecretGuard } from '@shared/presentation/guards/crm-secret.guard';
import { LogsService } from './application/logs.service';
import { LogsController } from './presentation/logs.controller';

@Module({
  controllers: [LogsController],
  providers: [LogsService, CrmSecretGuard],
})
export class LogsModule {}
