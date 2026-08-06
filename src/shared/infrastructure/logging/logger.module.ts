import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const prettyPrint =
          configService.get<string>('app.nodeEnv') !== 'production';

        return {
          pinoHttp: {
            level: configService.get<string>('app.logLevel', 'info'),
            transport: prettyPrint
              ? {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                    translateTime: 'SYS:standard',
                  },
                }
              : undefined,
            redact: {
              paths: [
                'req.headers.authorization',
                'req.headers.cookie',
                'WHATSAPP_ACCESS_TOKEN',
                'WHATSAPP_APP_SECRET',
                'OPENAI_API_KEY',
                'DATABASE_URL',
              ],
              remove: true,
            },
          },
        };
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
