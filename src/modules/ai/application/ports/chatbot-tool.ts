export interface ChatbotTool<TInput, TOutput> {
  readonly name: string;
  readonly description: string;
  execute(input: TInput): Promise<TOutput>;
}

export const CHATBOT_TOOLS = Symbol('CHATBOT_TOOLS');
