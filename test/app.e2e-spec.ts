import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import fixture from './fixtures/whatsapp/text-message.json';

describe('App e2e', () => {
  let app: INestApplication;
  let server: Parameters<typeof request>[0];

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
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1', async () => {
    await request(server).get('/api/v1').expect(200);
  });

  it('GET /api/v1/health/live', async () => {
    await request(server).get('/api/v1/health/live').expect(200);
  });

  it('GET /api/v1/webhooks/whatsapp', async () => {
    await request(server)
      .get('/api/v1/webhooks/whatsapp')
      .query({
        'hub.mode': 'subscribe',
        'hub.verify_token': 'test-verify-token',
        'hub.challenge': 'challenge-ok',
      })
      .expect(200)
      .expect('challenge-ok');
  });

  it('POST /api/v1/webhooks/whatsapp', async () => {
    await request(server)
      .post('/api/v1/webhooks/whatsapp')
      .send(fixture)
      .expect(200)
      .expect({ received: true });
  });
});
