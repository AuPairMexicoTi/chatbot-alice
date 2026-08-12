import { Inject, Injectable } from '@nestjs/common';
import {
  AI_GATEWAY,
  AiGateway,
} from '@modules/ai/application/ports/ai-gateway';
import {
  AI_RUN_REPOSITORY,
  AiRunRepository,
} from '@modules/ai/application/ports/ai-run.repository';
import {
  CHATBOT_TOOLS,
  ChatbotTool,
} from '@modules/ai/application/ports/chatbot-tool';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from '@modules/messaging/application/ports/message.repository';

@Injectable()
export class GenerateConversationReplyUseCase {
  constructor(
    @Inject(AI_GATEWAY) private readonly aiGateway: AiGateway,
    @Inject(AI_RUN_REPOSITORY)
    private readonly aiRunRepository: AiRunRepository,
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    @Inject(CHATBOT_TOOLS)
    private readonly chatbotTools: ReadonlyArray<ChatbotTool<unknown, unknown>>,
  ) {}

  async execute(conversationId: string): Promise<{ text: string }> {
    const history = await this.messageRepository.listRecentByConversationId(
      conversationId,
      10,
    );

    const pendingRun = await this.aiRunRepository.createPending(
      conversationId,
      this.aiGateway.provider,
      this.aiGateway.model,
    );

    try {
      const result = await this.aiGateway.generateReply({
        conversationId,
        history: history.map((message) => ({
          direction: message.direction,
          text: message.text,
        })),
        language: 'es-MX',
        context: {},
        tools: this.chatbotTools.map((tool) => ({
          name: tool.name,
          description: tool.description,
        })),
      });

      await this.aiRunRepository.complete(pendingRun.id, result);
      return { text: result.text };
    } catch (error) {
      await this.aiRunRepository.fail(
        pendingRun.id,
        error instanceof Error ? error.message : 'Unknown AI error',
      );
      throw error;
    }
  }
}
