export type HandoffStatus = 'OPEN' | 'ACCEPTED' | 'CLOSED';

export interface Handoff {
  id: string;
  conversationId: string;
  status: HandoffStatus;
  reason: string | null;
  assignedAgentId: string | null;
  requestedAt: Date;
  acceptedAt: Date | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
