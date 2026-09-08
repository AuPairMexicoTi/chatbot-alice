import { registerAs } from '@nestjs/config';

export const crmConfig = registerAs('crm', () => ({
  webhookSecret: process.env.CRM_WEBHOOK_SECRET ?? '',
  aliceLeadsUrl: process.env.CRM_ALICE_LEADS_URL ?? '',
  aliceHandoffsUrl: process.env.CRM_ALICE_HANDOFFS_URL ?? '',
  aliceIntegrationSecret: process.env.CRM_ALICE_INTEGRATION_SECRET ?? '',
}));

export type CrmConfig = ReturnType<typeof crmConfig>;
