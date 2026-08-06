import Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  APP_NAME: Joi.string().required(),
  APP_DISPLAY_NAME: Joi.string().required(),
  APP_PORT: Joi.number().port().required(),
  APP_PREFIX: Joi.string().required(),
  APP_CORS_ORIGINS: Joi.string().allow('').required(),
  APP_BODY_LIMIT: Joi.string().required(),
  LOG_LEVEL: Joi.string()
    .valid('silent', 'fatal', 'error', 'warn', 'info', 'debug', 'trace')
    .required(),
  SWAGGER_ENABLED: Joi.boolean().required(),
  POSTGRES_HOST: Joi.string().allow('').optional(),
  POSTGRES_PORT: Joi.number().port().optional(),
  POSTGRES_USER: Joi.string().allow('').optional(),
  POSTGRES_PASSWORD: Joi.string().allow('').optional(),
  POSTGRES_DB: Joi.string().allow('').optional(),
  DATABASE_URL: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().port().required(),
  REDIS_PASSWORD: Joi.string().allow('').required(),
  REDIS_DB: Joi.number().min(0).required(),
  BULLMQ_PREFIX: Joi.string().required(),
  WHATSAPP_INBOUND_QUEUE: Joi.string().required(),
  WHATSAPP_OUTBOUND_QUEUE: Joi.string().required(),
  QUEUE_ATTEMPTS: Joi.number().min(1).required(),
  QUEUE_BACKOFF_MS: Joi.number().min(0).required(),
  WHATSAPP_PROVIDER: Joi.string().valid('mock', 'meta').required(),
  WHATSAPP_GRAPH_API_BASE_URL: Joi.string().uri().required(),
  WHATSAPP_GRAPH_API_VERSION: Joi.when('WHATSAPP_PROVIDER', {
    is: 'meta',
    then: Joi.string().required(),
    otherwise: Joi.string().allow('').required(),
  }),
  WHATSAPP_PHONE_NUMBER_ID: Joi.when('WHATSAPP_PROVIDER', {
    is: 'meta',
    then: Joi.string().required(),
    otherwise: Joi.string().allow('').required(),
  }),
  WHATSAPP_BUSINESS_ACCOUNT_ID: Joi.string().allow('').required(),
  WHATSAPP_ACCESS_TOKEN: Joi.when('WHATSAPP_PROVIDER', {
    is: 'meta',
    then: Joi.string().required(),
    otherwise: Joi.string().allow('').required(),
  }),
  WHATSAPP_VERIFY_TOKEN: Joi.string().required(),
  WHATSAPP_APP_SECRET: Joi.when('WHATSAPP_VALIDATE_SIGNATURE', {
    is: true,
    then: Joi.string().required(),
    otherwise: Joi.string().allow('').required(),
  }),
  WHATSAPP_VALIDATE_SIGNATURE: Joi.boolean().required(),
  AI_PROVIDER: Joi.string().valid('mock', 'openai').required(),
  OPENAI_API_KEY: Joi.when('AI_PROVIDER', {
    is: 'openai',
    then: Joi.string().required(),
    otherwise: Joi.string().allow('').required(),
  }),
  OPENAI_MODEL: Joi.when('AI_PROVIDER', {
    is: 'openai',
    then: Joi.string().required(),
    otherwise: Joi.string().allow('').required(),
  }),
  OPENAI_TIMEOUT_MS: Joi.number().min(1000).required(),
  OPENAI_MAX_OUTPUT_TOKENS: Joi.number().min(1).required(),
  OPENAI_STORE: Joi.boolean().required(),
}).unknown(true);
