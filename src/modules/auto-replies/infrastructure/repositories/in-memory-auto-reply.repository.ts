import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  AutoReplyRepository,
  CreateAutoReplyInput,
} from '../../application/ports/auto-reply.repository';
import { AutoReply } from '../../domain/auto-reply.entity';

@Injectable()
export class InMemoryAutoReplyRepository implements AutoReplyRepository {
  readonly autoReplies: AutoReply[];

  constructor(autoReplies: AutoReply[] = []) {
    this.autoReplies = autoReplies;
  }

  async listAll(): Promise<AutoReply[]> {
    return [...this.autoReplies].sort(
      (left, right) => right.priority - left.priority,
    );
  }

  async listActiveByLocale(locale: string): Promise<AutoReply[]> {
    return this.autoReplies
      .filter(
        (autoReply) =>
          autoReply.isActive &&
          (autoReply.locale === locale || autoReply.locale === null),
      )
      .sort((left, right) => right.priority - left.priority);
  }

  async create(input: CreateAutoReplyInput): Promise<AutoReply> {
    const autoReply: AutoReply = {
      id: randomUUID(),
      key: input.key,
      title: input.title,
      matchType: input.matchType,
      patterns: input.patterns,
      responseText: input.responseText,
      responseImageUrl: input.responseImageUrl,
      priority: input.priority,
      isActive: input.isActive,
      locale: input.locale,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.autoReplies.push(autoReply);

    return autoReply;
  }
}
