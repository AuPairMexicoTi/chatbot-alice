import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DATABASE_HEALTH, REDIS_HEALTH } from './application/ports/health.port';
import { HealthService } from './application/health.service';
import { DatabaseHealthService } from './infrastructure/database-health.service';
import { RedisHealthService } from './infrastructure/redis-health.service';
import { TestHealthService } from './infrastructure/test-health.service';
import { HealthController } from './presentation/health.controller';

@Module({
  controllers: [HealthController],
  providers: [
    HealthService,
    {
      provide: DATABASE_HEALTH,
      inject: [ConfigService, DatabaseHealthService],
      useFactory: (
        configService: ConfigService,
        databaseHealthService: DatabaseHealthService,
      ) =>
        configService.get<string>('app.nodeEnv') === 'test'
          ? new TestHealthService('database')
          : databaseHealthService,
    },
    {
      provide: REDIS_HEALTH,
      inject: [ConfigService, RedisHealthService],
      useFactory: (
        configService: ConfigService,
        redisHealthService: RedisHealthService,
      ) =>
        configService.get<string>('app.nodeEnv') === 'test'
          ? new TestHealthService('redis')
          : redisHealthService,
    },
    DatabaseHealthService,
    RedisHealthService,
  ],
})
export class HealthModule {}
