import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { BullModule } from '@nestjs/bullmq';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigurationModule } from '@config/configuration.module';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from '@shared/infrastructure/logging/logger.module';
import { PrismaModule } from '@shared/infrastructure/database/prisma/prisma.module';
import { RedisService } from '@shared/infrastructure/redis/redis.service';
import { CorrelationIdInterceptor } from '@shared/presentation/interceptors/correlation-id.interceptor';
import { GlobalExceptionFilter } from '@shared/presentation/filters/global-exception.filter';
import { RequestContextMiddleware } from '@shared/presentation/middleware/request-context.middleware';
import { ValidationPipe } from '@nestjs/common';
import { RootModule } from '@modules/root/root.module';
import { HealthModule } from '@modules/health/health.module';
import { AutoRepliesModule } from '@modules/auto-replies/auto-replies.module';
import { WebhooksModule } from '@modules/webhooks/webhooks.module';

@Module({
  imports: [
    ConfigurationModule,
    LoggerModule,
    PrismaModule,
    RootModule,
    HealthModule,
    AutoRepliesModule,
    WebhooksModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.getOrThrow<string>('redis.host'),
          port: configService.getOrThrow<number>('redis.port'),
          db: configService.getOrThrow<number>('redis.db'),
          password: configService.get<string>('redis.password') || undefined,
        },
        prefix: configService.getOrThrow<string>('redis.prefix'),
        defaultJobOptions: {
          attempts: configService.getOrThrow<number>('redis.attempts'),
          backoff: {
            type: 'exponential',
            delay: configService.getOrThrow<number>('redis.backoffMs'),
          },
          removeOnComplete: 25,
          removeOnFail: 100,
        },
      }),
    }),
  ],
  providers: [
    RedisService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CorrelationIdInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
