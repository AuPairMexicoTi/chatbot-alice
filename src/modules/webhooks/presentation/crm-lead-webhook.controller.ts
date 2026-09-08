import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendWelcomeMessageUseCase } from '@modules/whatsapp/application/use-cases/send-welcome-message.use-case';
import { CrmSecretGuard } from './guards/crm-secret.guard';
import { SendWelcomeMessageDto } from './dto/send-welcome-message.dto';

@ApiTags('CRM Webhooks')
@Controller('webhooks/crm')
export class CrmLeadWebhookController {
  constructor(
    private readonly sendWelcomeMessageUseCase: SendWelcomeMessageUseCase,
  ) {}

  @Post('welcome-message')
  @HttpCode(200)
  @UseGuards(CrmSecretGuard)
  async welcomeMessage(
    @Body() body: SendWelcomeMessageDto,
  ): Promise<{ received: true; message_id: string }> {
    const result = await this.sendWelcomeMessageUseCase.execute({
      phoneNumber: body.phone,
      name: body.name,
    });

    return { received: true, message_id: result.messageId };
  }
}
