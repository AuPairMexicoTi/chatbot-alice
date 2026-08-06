import { Injectable } from '@nestjs/common';
import { ChatbotTool } from '@modules/ai/application/ports/chatbot-tool';
import { RequestHumanHandoffUseCase } from '@modules/whatsapp/application/use-cases/request-human-handoff.use-case';

@Injectable()
export class RequestHumanHandoffTool implements ChatbotTool<
  { conversationId: string; reason?: string },
  { handoffId: string; status: string }
> {
  readonly name = 'request_human_handoff';
  readonly description =
    'Solicita transferencia a un agente humano autorizado.';

  constructor(
    private readonly requestHumanHandoffUseCase: RequestHumanHandoffUseCase,
  ) {}

  async execute(input: {
    conversationId: string;
    reason?: string;
  }): Promise<{ handoffId: string; status: string }> {
    return this.requestHumanHandoffUseCase.execute(
      input.conversationId,
      input.reason ?? null,
    );
  }
}
