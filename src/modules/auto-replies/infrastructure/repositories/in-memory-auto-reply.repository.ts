import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  AutoReplyRepository,
  CreateAutoReplyInput,
  UpdateAutoReplyInput,
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

  async findByKey(key: string): Promise<AutoReply | null> {
    return this.autoReplies.find((autoReply) => autoReply.key === key) ?? null;
  }

  async findById(id: string): Promise<AutoReply | null> {
    return this.autoReplies.find((autoReply) => autoReply.id === id) ?? null;
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

  async update(id: string, input: UpdateAutoReplyInput): Promise<AutoReply> {
    const index = this.autoReplies.findIndex(
      (autoReply) => autoReply.id === id,
    );
    if (index === -1) {
      throw new Error(`AutoReply with id ${id} not found`);
    }

    const existing = this.autoReplies[index];
    const updated: AutoReply = {
      ...existing,
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
      updatedAt: new Date(),
    };

    this.autoReplies[index] = updated;

    return updated;
  }

  async delete(id: string): Promise<void> {
    const index = this.autoReplies.findIndex(
      (autoReply) => autoReply.id === id,
    );
    if (index !== -1) {
      this.autoReplies.splice(index, 1);
    }
  }
}
