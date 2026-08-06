export type ConversationStatus = 'OPEN' | 'WAITING_HUMAN' | 'CLOSED';

export interface Conversation {
  id: string;
  contactId: string;
  status: ConversationStatus;
  locale: string;
  createdAt: Date;
  updatedAt: Date;
}
