import { Module } from '@nestjs/common';
import { WhatsAppModule } from '@modules/whatsapp/whatsapp.module';
import { ReceiveWhatsAppWebhookUseCase } from './application/use-cases/receive-whatsapp-webhook.use-case';
import { WhatsAppWebhookController } from './presentation/whatsapp-webhook.controller';

@Module({
  imports: [WhatsAppModule],
  controllers: [WhatsAppWebhookController],
  providers: [ReceiveWhatsAppWebhookUseCase],
})
export class WebhooksModule {}
