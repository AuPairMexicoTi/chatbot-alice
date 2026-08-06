import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis;

  constructor(configService: ConfigService) {
    this.client = new Redis({
      host: configService.getOrThrow<string>('redis.host'),
      port: configService.getOrThrow<number>('redis.port'),
      db: configService.getOrThrow<number>('redis.db'),
      password: configService.get<string>('redis.password') || undefined,
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    });
  }

  getClient(): Redis {
    return this.client;
  }

  async ping(): Promise<string> {
    if (this.client.status === 'wait') {
      await this.client.connect();
    }

    return this.client.ping();
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client.status !== 'end') {
      await this.client.quit();
    }
  }
}
