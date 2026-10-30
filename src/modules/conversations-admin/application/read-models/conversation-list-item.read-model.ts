import { ConversationStatusValue } from './conversation-status.type';

export interface ConversationListItem {
  id: string;
  contactId: string;
  contactName: string | null;
  phoneNumber: string;
  status: ConversationStatusValue;
  waitingOnHuman: boolean;
  lastMessage: string | null;
  lastMessageAt: Date | null;
  assignedAdvisorId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
