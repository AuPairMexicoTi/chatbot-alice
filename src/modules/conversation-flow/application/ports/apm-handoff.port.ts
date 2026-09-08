export type RequestApmHandoffInput = {
  phone: string;
  email?: string;
  reason: string;
};

export type ApmAdvisor = {
  name: string | null;
  whatsappLink: string | null;
  imageUrl: string | null;
  isMailbox: boolean;
};

export interface ApmHandoffPort {
  request(input: RequestApmHandoffInput): Promise<ApmAdvisor>;
}

export const APM_HANDOFF_PORT = Symbol('APM_HANDOFF_PORT');
