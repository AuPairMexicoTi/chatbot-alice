import { AiRun as PrismaAiRun } from '@generated/prisma';
import { AiRun } from '@modules/ai/domain/ai-run.entity';

export class PrismaAiRunMapper {
  static toDomain(record: PrismaAiRun): AiRun {
    return {
      id: record.id,
      conversationId: record.conversationId,
      provider: record.provider,
      model: record.model,
      providerResponseId: record.providerResponseId,
      status: record.status,
      usage: {
        inputTokens: record.inputTokens,
        outputTokens: record.outputTokens,
        totalTokens: record.totalTokens,
      },
      error: record.error,
      createdAt: record.createdAt,
      completedAt: record.completedAt,
    };
  }
}
