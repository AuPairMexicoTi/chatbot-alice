export type ConversationFlowStatus = 'ACTIVE' | 'AWAITING_HUMAN' | 'CLOSED';

export type FlowInput = {
  text: string | null;
  messageType:
    | 'TEXT'
    | 'IMAGE'
    | 'AUDIO'
    | 'VIDEO'
    | 'DOCUMENT'
    | 'LOCATION'
    | 'STICKER'
    | 'UNKNOWN';
};

export type FlowState = {
  nodeId: string;
  status: ConversationFlowStatus;
  attempts: number;
  variables: Record<string, string>;
};

export type FlowNode = {
  id: string;
  content: string;
  options?: Record<string, string>;
  capture?: 'name' | 'age' | 'email' | 'city' | 'englishLevel';
  terminal?: 'HANDOFF' | 'CLOSED';
};

export type FlowDefinition = {
  entryNodeId: string;
  nodes: Record<string, FlowNode>;
  maxAttempts: number;
};

export type FlowResult = {
  state: FlowState;
  messages: string[];
  requestHandoff: boolean;
};
