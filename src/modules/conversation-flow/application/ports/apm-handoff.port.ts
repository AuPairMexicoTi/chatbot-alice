export type RequestApmHandoffInput = {
  phone: string;
  email?: string;
  reason: string;
};

export type ApmHandoffRouting =
  'NEW_ASSIGNMENT' | 'ALREADY_ASSIGNED' | 'MAILBOX';

export type ApmAdvisor = {
  name: string | null;
  whatsappLink: string | null;
  imageUrl: string | null;
  isMailbox: boolean;
};

export type ApmHandoffResult = {
  routing: ApmHandoffRouting;
  advisor: ApmAdvisor;
  mailboxWhatsAppLink: string | null;
};

export interface ApmHandoffPort {
  request(input: RequestApmHandoffInput): Promise<ApmHandoffResult>;
}

export const APM_HANDOFF_PORT = Symbol('APM_HANDOFF_PORT');
