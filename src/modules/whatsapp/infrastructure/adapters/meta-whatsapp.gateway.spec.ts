import { ConfigService } from '@nestjs/config';
import { MetaWhatsAppGateway } from './meta-whatsapp.gateway';

const createConfigService = (): ConfigService =>
  new ConfigService({
    whatsapp: {
      graphApiBaseUrl: 'https://graph.facebook.com',
      graphApiVersion: 'v26.0',
      phoneNumberId: '123',
      accessToken: 'test-token',
    },
  });

describe('MetaWhatsAppGateway', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('normalizes a Mexican webhook phone number before sending', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ messages: [{ id: 'wamid.1' }] }), {
        status: 200,
      }),
    );
    const gateway = new MetaWhatsAppGateway(createConfigService());

    await gateway.sendTextMessage({
      to: '5217771683807',
      text: 'Hola',
    });

    const requestBody = fetchSpy.mock.calls[0]?.[1]?.body;
    if (typeof requestBody !== 'string') {
      throw new Error('Expected a JSON string request body');
    }
    expect(JSON.parse(requestBody)).toMatchObject({
      to: '527771683807',
    });
  });

  it('adds the Mexican country code to an APM lead phone number', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ messages: [{ id: 'wamid.1' }] }), {
        status: 200,
      }),
    );
    const gateway = new MetaWhatsAppGateway(createConfigService());

    await gateway.sendTextMessage({
      to: '7771683807',
      text: 'Hola',
    });

    const requestBody = fetchSpy.mock.calls[0]?.[1]?.body;
    if (typeof requestBody !== 'string') {
      throw new Error('Expected a JSON string request body');
    }
    expect(JSON.parse(requestBody)).toMatchObject({
      to: '527771683807',
    });
  });

  it('omits the body component for a template without variables', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ messages: [{ id: 'wamid.1' }] }), {
        status: 200,
      }),
    );
    const gateway = new MetaWhatsAppGateway(createConfigService());

    await gateway.sendTemplateMessage({
      to: '5217771683807',
      templateName: 'bienvenida_menu',
      languageCode: 'es_MX',
      bodyParameters: [],
      imageUrl: 'https://example.com/principal.jpeg',
    });

    const requestBody = fetchSpy.mock.calls[0]?.[1]?.body;
    if (typeof requestBody !== 'string') {
      throw new Error('Expected a JSON string request body');
    }
    expect(JSON.parse(requestBody)).toMatchObject({
      template: {
        name: 'bienvenida_menu',
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'image',
                image: { link: 'https://example.com/principal.jpeg' },
              },
            ],
          },
        ],
      },
    });
  });
});
