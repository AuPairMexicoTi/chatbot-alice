import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ALICE_SYSTEM_PROMPT } from '../prompts/alice.system-prompt';
import {
  AiGateway,
  GenerateReplyInput,
  GenerateReplyResult,
} from '../../application/ports/ai-gateway';

@Injectable()
export class OpenAiResponsesGateway implements AiGateway {
  private readonly client: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.getOrThrow<string>('ai.apiKey'),
    });
  }

  async generateReply(input: GenerateReplyInput): Promise<GenerateReplyResult> {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.configService.getOrThrow<number>('ai.timeoutMs'),
    );

    try {
      const response = await this.client.responses.create(
        {
          model: this.configService.getOrThrow<string>('ai.model'),
          instructions: ALICE_SYSTEM_PROMPT,
          input: input.history
            .map((message) => `${message.direction}: ${message.text ?? ''}`)
            .join('\n'),
          max_output_tokens:
            this.configService.getOrThrow<number>('ai.maxOutputTokens'),
          store: this.configService.getOrThrow<boolean>('ai.store'),
        },
        { signal: controller.signal },
      );

      return {
        text:
          response.output_text?.trim() || 'No se pudo generar una respuesta.',
        provider: 'openai',
        model: response.model,
        externalResponseId: response.id,
        usage: {
          inputTokens: response.usage?.input_tokens ?? null,
          outputTokens: response.usage?.output_tokens ?? null,
          totalTokens: response.usage?.total_tokens ?? null,
        },
        toolCalls: [],
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}
