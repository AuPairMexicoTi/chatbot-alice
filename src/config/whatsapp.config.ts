import { registerAs } from '@nestjs/config';

export const whatsappConfig = registerAs('whatsapp', () => ({
  provider: process.env.WHATSAPP_PROVIDER ?? 'mock',
  graphApiBaseUrl:
    process.env.WHATSAPP_GRAPH_API_BASE_URL ?? 'https://graph.facebook.com',
  graphApiVersion: process.env.WHATSAPP_GRAPH_API_VERSION ?? '',
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID ?? '',
  businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID ?? '',
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN ?? '',
  verifyToken: process.env.WHATSAPP_VERIFY_TOKEN ?? '',
  appSecret: process.env.WHATSAPP_APP_SECRET ?? '',
  validateSignature: process.env.WHATSAPP_VALIDATE_SIGNATURE === 'true',
  welcomeTemplateName: process.env.WHATSAPP_WELCOME_TEMPLATE_NAME ?? '',
  welcomeTemplateLanguage:
    process.env.WHATSAPP_WELCOME_TEMPLATE_LANGUAGE ?? 'es_MX',
  welcomeTemplateUsesNameParameter:
    process.env.WHATSAPP_WELCOME_TEMPLATE_USES_NAME_PARAMETER !== 'false',
}));

export type WhatsAppConfig = ReturnType<typeof whatsappConfig>;
