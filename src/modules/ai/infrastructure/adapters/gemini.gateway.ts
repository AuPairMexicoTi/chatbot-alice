import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ALICE_SYSTEM_PROMPT } from '../prompts/alice.system-prompt';
import {
  AiGateway,
  GenerateReplyInput,
  GenerateReplyResult,
} from '../../application/ports/ai-gateway';

interface GeminiGenerateContentResponse {
  responseId?: string;
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
  };
}

@Injectable()
export class GeminiGateway implements AiGateway {
  readonly provider = 'gemini';
  readonly model: string;

  constructor(private readonly configService: ConfigService) {
    this.model = this.configService.getOrThrow<string>('ai.model');
  }

  async generateReply(input: GenerateReplyInput): Promise<GenerateReplyResult> {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.configService.getOrThrow<number>('ai.timeoutMs'),
    );

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`,
        {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'content-type': 'application/json',
            'x-goog-api-key':
              this.configService.getOrThrow<string>('ai.geminiApiKey'),
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: ALICE_SYSTEM_PROMPT }],
            },
            contents: input.history.map((message) => ({
              role: message.direction === 'INBOUND' ? 'user' : 'model',
              parts: [{ text: message.text ?? '' }],
            })),
            generationConfig: {
              maxOutputTokens:
                this.configService.getOrThrow<number>('ai.maxOutputTokens'),
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Gemini responded with ${response.status}`);
      }

      const data = (await response.json()) as GeminiGenerateContentResponse;
      const text =
        data.candidates?.[0]?.content?.parts
          ?.map((part) => part.text ?? '')
          .join('')
          .trim() || 'No se pudo generar una respuesta.';

      return {
        text,
        provider: this.provider,
        model: this.model,
        externalResponseId: data.responseId ?? null,
        usage: {
          inputTokens: data.usageMetadata?.promptTokenCount ?? null,
          outputTokens: data.usageMetadata?.candidatesTokenCount ?? null,
          totalTokens: data.usageMetadata?.totalTokenCount ?? null,
        },
        toolCalls: [],
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}
