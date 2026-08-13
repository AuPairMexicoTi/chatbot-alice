export type MessageDirection = 'INBOUND' | 'OUTBOUND';
export type MessageType = 'TEXT' | 'IMAGE' | 'UNKNOWN' | 'SYSTEM';
export type MessageStatus = 'RECEIVED' | 'QUEUED' | 'SENT' | 'FAILED';

export interface Message {
  id: string;
  conversationId: string;
  direction: MessageDirection;
  type: MessageType;
  providerMessageId: string | null;
  text: string | null;
  status: MessageStatus;
  metadata: Record<string, string | number | boolean | null>;
  createdAt: Date;
  updatedAt: Date;
}
