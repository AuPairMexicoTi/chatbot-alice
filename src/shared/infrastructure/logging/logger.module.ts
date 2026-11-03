import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { stdSerializers } from 'pino';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const prettyPrint =
          configService.get<string>('app.nodeEnv') !== 'production';
        const level = configService.get<string>('app.logLevel', 'info');

        return {
          pinoHttp: {
            level,
            // Ademas de stdout (lo que ya se ve con `docker logs`, sin
            // cambios), se escribe el mismo log en NDJSON a un archivo --
            // es lo que lee la vista de monitoreo de logs de IT
            // (GET /logs, ver LogsController). El volumen `alice_logs`
            // (compose.production.yml) lo persiste entre deploys.
            //
            // Los targets se resuelven con require.resolve() en vez del
            // string pelado ("pino-pretty"/"pino/file") porque con pnpm
            // pino no logra resolverlos desde su propio node_modules
            // aislado -- sin esto el proceso truena al arrancar con
            // "unable to determine transport target".
            transport: {
              targets: [
                prettyPrint
                  ? {
                      target: require.resolve('pino-pretty'),
                      options: {
                        destination: 1,
                        singleLine: true,
                        translateTime: 'SYS:standard',
                      },
                      level,
                    }
                  : {
                      target: require.resolve('pino/file'),
                      options: { destination: 1 },
                      level,
                    },
                {
                  target: require.resolve('pino/file'),
                  options: { destination: 'logs/alice.log', mkdir: true },
                  level,
                },
              ],
            },
            // Sin esto, loguear { err } serializa a "{}" (Error no tiene
            // propiedades enumerables) -- con el serializador estandar de
            // Pino queda {type, message, stack}, que es lo que
            // LogsService.parseLogFile usa para mostrar la excepcion
            // estructurada en el visor de logs de IT.
            serializers: {
              err: stdSerializers.err,
            },
            redact: {
              paths: [
                'req.headers.authorization',
                'req.headers.cookie',
                'WHATSAPP_ACCESS_TOKEN',
                'WHATSAPP_APP_SECRET',
                'OPENAI_API_KEY',
                'GEMINI_API_KEY',
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
