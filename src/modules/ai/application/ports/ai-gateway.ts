export interface GenerateReplyInput {
  conversationId: string;
  history: ReadonlyArray<{
    direction: 'INBOUND' | 'OUTBOUND';
    text: string | null;
  }>;
  language: string;
  context: Record<string, string>;
  tools: ReadonlyArray<{
    name: string;
    description: string;
  }>;
}

export interface GenerateReplyResult {
  text: string;
  provider: string;
  model: string;
  externalResponseId: string | null;
  usage: {
    inputTokens: number | null;
    outputTokens: number | null;
    totalTokens: number | null;
  };
  toolCalls: ReadonlyArray<{
    name: string;
    arguments: Record<string, string>;
  }>;
}

export interface AiGateway {
  generateReply(input: GenerateReplyInput): Promise<GenerateReplyResult>;
}

export const AI_GATEWAY = Symbol('AI_GATEWAY');
