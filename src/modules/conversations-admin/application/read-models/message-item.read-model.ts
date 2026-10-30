export type MessageDirectionValue = 'INBOUND' | 'OUTBOUND';
export type MessageTypeValue = 'TEXT' | 'IMAGE' | 'UNKNOWN' | 'SYSTEM';
export type MessageStatusValue = 'RECEIVED' | 'QUEUED' | 'SENT' | 'FAILED';

export interface MessageItem {
  id: string;
  direction: MessageDirectionValue;
  type: MessageTypeValue;
  text: string | null;
  status: MessageStatusValue;
  metadata: Record<string, unknown>;
  createdAt: Date;
}
