import { Module } from '@nestjs/common';
import { AutoRepliesModule } from '@modules/auto-replies/auto-replies.module';
import { WhatsAppModule } from '@modules/whatsapp/whatsapp.module';
import { SendWelcomeMessageUseCase } from '@modules/whatsapp/application/use-cases/send-welcome-message.use-case';
import { ReceiveWhatsAppWebhookUseCase } from './application/use-cases/receive-whatsapp-webhook.use-case';
import { WhatsAppWebhookController } from './presentation/whatsapp-webhook.controller';
import { CrmLeadWebhookController } from './presentation/crm-lead-webhook.controller';
import { CrmSecretGuard } from './presentation/guards/crm-secret.guard';

@Module({
  imports: [WhatsAppModule, AutoRepliesModule],
  controllers: [WhatsAppWebhookController, CrmLeadWebhookController],
  providers: [
    ReceiveWhatsAppWebhookUseCase,
    SendWelcomeMessageUseCase,
    CrmSecretGuard,
  ],
})
export class WebhooksModule {}
