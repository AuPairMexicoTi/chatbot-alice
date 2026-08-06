import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bufferLogs: true,
  });

  const logger = app.get(Logger);
  app.useLogger(logger);

  const configService = app.get(ConfigService);
  const prefix = configService.getOrThrow<string>('app.prefix');
  const bodyLimit = configService.getOrThrow<string>('app.bodyLimit');
  const corsOrigins = configService.getOrThrow<string[]>('app.corsOrigins');
  const swaggerEnabled =
    configService.getOrThrow<boolean>('app.swaggerEnabled');
  const corsOriginDelegate = (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('CORS origin not allowed'));
  };

  app.use(json({ limit: bodyLimit }));
  app.use(urlencoded({ extended: true, limit: bodyLimit }));
  app.use(helmet());
  app.enableCors({
    origin: corsOriginDelegate,
  });
  app.setGlobalPrefix(prefix);
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (swaggerEnabled) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('ALICE API')
        .setDescription('Artificial Labile Intelligence Cybernetic Existence')
        .setVersion('0.1.0')
        .build(),
    );
    SwaggerModule.setup('docs', app, document);
  }

  const port = configService.getOrThrow<number>('app.port');
  await app.listen(port);

  logger.log({
    app: configService.getOrThrow<string>('app.name'),
    env: configService.getOrThrow<string>('app.nodeEnv'),
    port,
    prefix,
    swaggerEnabled,
    aiProvider: configService.getOrThrow<string>('ai.provider'),
    whatsappProvider: configService.getOrThrow<string>('whatsapp.provider'),
  });
}

void bootstrap();
