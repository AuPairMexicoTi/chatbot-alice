import { AiRun } from '../../domain/ai-run.entity';
import { GenerateReplyResult } from './ai-gateway';

export interface AiRunRepository {
  createPending(
    conversationId: string,
    provider: string,
    model: string,
  ): Promise<AiRun>;
  complete(id: string, result: GenerateReplyResult): Promise<AiRun>;
  fail(id: string, error: string): Promise<AiRun>;
}

export const AI_RUN_REPOSITORY = Symbol('AI_RUN_REPOSITORY');
