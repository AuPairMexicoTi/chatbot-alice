export type CreateApmLeadInput = {
  name: string;
  age: number;
  phone: string;
  email: string;
  city: string;
  englishLevel: string;
  countryInterest?: string;
};
export type CreateApmLeadResult = { profilingLink: string };
export interface ApmLeadsPort {
  createOrFind(input: CreateApmLeadInput): Promise<CreateApmLeadResult>;
}
export const APM_LEADS_PORT = Symbol('APM_LEADS_PORT');
