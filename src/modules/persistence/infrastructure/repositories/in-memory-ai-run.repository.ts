import { Injectable } from '@nestjs/common';
import { AiRunRepository } from '@modules/ai/application/ports/ai-run.repository';
import { GenerateReplyResult } from '@modules/ai/application/ports/ai-gateway';
import { AiRun } from '@modules/ai/domain/ai-run.entity';
import { InMemoryStore } from './in-memory.store';

@Injectable()
export class InMemoryAiRunRepository implements AiRunRepository {
  constructor(private readonly store: InMemoryStore) {}

  async createPending(
    conversationId: string,
    provider: string,
    model: string,
  ): Promise<AiRun> {
    const aiRun: AiRun = {
      id: this.store.nextId(),
      conversationId,
      provider,
      model,
      providerResponseId: null,
      status: 'STARTED',
      usage: {
        inputTokens: null,
        outputTokens: null,
        totalTokens: null,
      },
      error: null,
      createdAt: new Date(),
      completedAt: null,
    };
    this.store.aiRuns.set(aiRun.id, aiRun);
    return aiRun;
  }

  async complete(id: string, result: GenerateReplyResult): Promise<AiRun> {
    const aiRun = this.store.aiRuns.get(id);
    if (!aiRun) {
      throw new Error(`AiRun ${id} not found`);
    }

    const updated: AiRun = {
      ...aiRun,
      status: 'COMPLETED',
      providerResponseId: result.externalResponseId,
      usage: result.usage,
      completedAt: new Date(),
    };
    this.store.aiRuns.set(id, updated);
    return updated;
  }

  async fail(id: string, error: string): Promise<AiRun> {
    const aiRun = this.store.aiRuns.get(id);
    if (!aiRun) {
      throw new Error(`AiRun ${id} not found`);
    }

    const updated: AiRun = {
      ...aiRun,
      status: 'FAILED',
      error,
      completedAt: new Date(),
    };
    this.store.aiRuns.set(id, updated);
    return updated;
  }
}
