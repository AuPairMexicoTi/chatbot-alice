export interface AiUsage {
  inputTokens: number | null;
  outputTokens: number | null;
  totalTokens: number | null;
}

export interface AiRun {
  id: string;
  conversationId: string;
  provider: string;
  model: string;
  providerResponseId: string | null;
  status: 'STARTED' | 'COMPLETED' | 'FAILED';
  usage: AiUsage;
  error: string | null;
  createdAt: Date;
  completedAt: Date | null;
}
