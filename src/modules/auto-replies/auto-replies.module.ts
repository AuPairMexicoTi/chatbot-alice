import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import {
  AUTO_REPLY_REPOSITORY,
} from './application/ports/auto-reply.repository';
import { CreateAutoReplyUseCase } from './application/use-cases/create-auto-reply.use-case';
import { ListAutoRepliesUseCase } from './application/use-cases/list-auto-replies.use-case';
import { ResolveAutoReplyUseCase } from './application/use-cases/resolve-auto-reply.use-case';
import { InMemoryAutoReplyRepository } from './infrastructure/repositories/in-memory-auto-reply.repository';
import { PrismaAutoReplyRepository } from './infrastructure/repositories/prisma-auto-reply.repository';
import { AutoRepliesController } from './presentation/auto-replies.controller';

@Module({
  controllers: [AutoRepliesController],
  providers: [
    ResolveAutoReplyUseCase,
    CreateAutoReplyUseCase,
    ListAutoRepliesUseCase,
    {
      provide: AUTO_REPLY_REPOSITORY,
      inject: [ConfigService, PrismaService],
      useFactory: (
        configService: ConfigService,
        prismaService: PrismaService,
      ) =>
        configService.get<string>('app.nodeEnv') === 'test'
          ? new InMemoryAutoReplyRepository()
          : new PrismaAutoReplyRepository(prismaService),
    },
  ],
  exports: [AUTO_REPLY_REPOSITORY, ResolveAutoReplyUseCase],
})
export class AutoRepliesModule {}
