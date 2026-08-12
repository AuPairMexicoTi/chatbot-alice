import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import { AutoReplyRepository } from '../../application/ports/auto-reply.repository';
import { AutoReply } from '../../domain/auto-reply.entity';
import { PrismaAutoReplyMapper } from '../mappers/prisma-auto-reply.mapper';

@Injectable()
export class PrismaAutoReplyRepository implements AutoReplyRepository {
  constructor(private readonly prismaService: PrismaService) {}

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
}
