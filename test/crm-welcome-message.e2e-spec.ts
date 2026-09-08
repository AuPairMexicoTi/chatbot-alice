import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  AUTO_REPLY_REPOSITORY,
  AutoReplyRepository,
} from '../src/modules/auto-replies/application/ports/auto-reply.repository';
import { WELCOME_AUTO_REPLY_KEY } from '../src/modules/whatsapp/application/use-cases/send-welcome-message.use-case';

describe('CRM welcome message e2e', () => {
  let app: INestApplication;
  let server: Parameters<typeof request>[0];
  let autoReplyRepository: AutoReplyRepository;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication({ rawBody: true });
    const configService = app.get(ConfigService);
    app.setGlobalPrefix(configService.getOrThrow<string>('app.prefix'));
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
    server = app.getHttpServer() as Parameters<typeof request>[0];
    autoReplyRepository = app.get(AUTO_REPLY_REPOSITORY);
  });

  afterAll(async () => {
    await app.close();
  });

  const payload = {
    lead_id: 999,
    name: 'Ana',
    last_name: 'Pérez',
    phone: '5215500000099',
    email: 'ana@example.com',
  };

  it('rejects the request without a valid secret', async () => {
    await request(server)
      .post('/api/v1/webhooks/crm/welcome-message')
      .set('x-alice-secret', 'wrong-secret')
      .send(payload)
      .expect(403);
  });

  it('returns 404 when there is no active welcome template', async () => {
    await request(server)
      .post('/api/v1/webhooks/crm/welcome-message')
      .set('x-alice-secret', 'test-secret')
      .send(payload)
      .expect(404);
  });

  it('sends the welcome message when the template exists', async () => {
    await autoReplyRepository.create({
      key: WELCOME_AUTO_REPLY_KEY,
      title: 'Bienvenida Zapier',
      matchType: 'EXACT',
      patterns: [],
      responseText: 'Hola {{name}}, bienvenida.',
      responseImageUrl: null,
      priority: 0,
      isActive: true,
      locale: 'es-MX',
    });

    const response = await request(server)
      .post('/api/v1/webhooks/crm/welcome-message')
      .set('x-alice-secret', 'test-secret')
      .send(payload)
      .expect(200);

    const body = response.body as { received: boolean; message_id: string };
    expect(body.received).toBe(true);
    expect(body.message_id).toBeDefined();
  });
});
