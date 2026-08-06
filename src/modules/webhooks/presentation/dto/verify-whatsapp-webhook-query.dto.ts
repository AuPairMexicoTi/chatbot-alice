import { IsString } from 'class-validator';

export class VerifyWhatsAppWebhookQueryDto {
  @IsString()
  'hub.mode': string;

  @IsString()
  'hub.verify_token': string;

  @IsString()
  'hub.challenge': string;
}
