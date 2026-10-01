import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import {
  AutoReplyRepository,
  CreateAutoReplyInput,
  UpdateAutoReplyInput,
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

  async findByKey(key: string): Promise<AutoReply | null> {
    const record = await this.prismaService.autoReply.findUnique({
      where: { key },
    });

    return record ? PrismaAutoReplyMapper.toDomain(record) : null;
  }

  async findById(id: string): Promise<AutoReply | null> {
    const record = await this.prismaService.autoReply.findUnique({
      where: { id },
    });

    return record ? PrismaAutoReplyMapper.toDomain(record) : null;
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

  async update(id: string, input: UpdateAutoReplyInput): Promise<AutoReply> {
    const record = await this.prismaService.autoReply.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.matchType !== undefined && { matchType: input.matchType }),
        ...(input.patterns !== undefined && { patterns: input.patterns }),
        ...(input.responseText !== undefined && {
          responseText: input.responseText,
        }),
        ...(input.responseImageUrl !== undefined && {
          responseImageUrl: input.responseImageUrl,
        }),
        ...(input.priority !== undefined && { priority: input.priority }),
        ...(input.isActive !== undefined && { isActive: input.isActive }),
        ...(input.locale !== undefined && { locale: input.locale }),
      },
    });

    return PrismaAutoReplyMapper.toDomain(record);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.autoReply.delete({ where: { id } });
  }
}
