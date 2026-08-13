import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import {
  AutoReplyRepository,
  CreateAutoReplyInput,
} from '../../application/ports/auto-reply.repository';
import { AutoReply } from '../../domain/auto-reply.entity';
import { PrismaAutoReplyMapper } from '../mappers/prisma-auto-reply.mapper';

@Injectable()
export class PrismaAutoReplyRepository implements AutoReplyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async listAll(): Promise<AutoReply[]> {
    const records = await this.prismaService.autoReply.findMany({
      orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
    });

    return records.map(PrismaAutoReplyMapper.toDomain);
  }

  async listActiveByLocale(locale: string): Promise<AutoReply[]> {
    const records = await this.prismaService.autoReply.findMany({
      where: {
        isActive: true,
        OR: [{ locale }, { locale: null }],
      },
      orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
    });

    return records.map(PrismaAutoReplyMapper.toDomain);
  }

  async create(input: CreateAutoReplyInput): Promise<AutoReply> {
    const record = await this.prismaService.autoReply.create({
      data: {
        key: input.key,
        title: input.title,
        matchType: input.matchType,
        patterns: input.patterns,
        responseText: input.responseText,
        responseImageUrl: input.responseImageUrl,
        priority: input.priority,
        isActive: input.isActive,
        locale: input.locale,
      },
    });

    return PrismaAutoReplyMapper.toDomain(record);
  }
}
