import { Injectable } from '@nestjs/common';
import {
  AiGateway,
  GenerateReplyInput,
  GenerateReplyResult,
} from '../../application/ports/ai-gateway';

@Injectable()
export class MockAiGateway implements AiGateway {
  readonly provider = 'mock';
  readonly model = 'mock-alice';

  async generateReply(input: GenerateReplyInput): Promise<GenerateReplyResult> {
    const lastMessage = [...input.history]
      .reverse()
      .find((message) => message.direction === 'INBOUND' && message.text);

    return {
      text: `ALICE recibió tu mensaje: ${lastMessage?.text ?? ''}`.trim(),
      provider: this.provider,
      model: this.model,
      externalResponseId: null,
      usage: {
        inputTokens: null,
        outputTokens: null,
        totalTokens: null,
      },
      toolCalls: [],
    };
  }
}
