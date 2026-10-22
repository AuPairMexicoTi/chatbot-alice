import { ConversationStatusValue } from './conversation-status.type';

export interface ConversationDetailContact {
  id: string;
  externalId: string;
  name: string | null;
  phoneNumber: string;
}

export interface ConversationDetail {
  id: string;
  status: ConversationStatusValue;
  locale: string;
  waitingOnHuman: boolean;
  assignedAdvisorId: string | null;
  contact: ConversationDetailContact;
  createdAt: Date;
  updatedAt: Date;
}
