import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { aiConfig } from './ai.config';
import { appConfig } from './app.config';
import { databaseConfig } from './database.config';
import { envValidationSchema } from './env.validation';
import { redisConfig } from './redis.config';
import { whatsappConfig } from './whatsapp.config';

const createEnvFilePaths = (nodeEnv: string): string[] => [
  `.env.${nodeEnv}.local`,
  `.env.${nodeEnv}`,
  '.env.local',
  '.env',
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: createEnvFilePaths(process.env.NODE_ENV ?? 'development'),
      load: [appConfig, databaseConfig, redisConfig, whatsappConfig, aiConfig],
      validationSchema: envValidationSchema,
    }),
  ],
})
export class ConfigurationModule {}
