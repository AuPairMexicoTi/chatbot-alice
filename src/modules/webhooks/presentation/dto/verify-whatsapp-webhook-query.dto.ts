import { IsOptional, IsString } from 'class-validator';

export class VerifyWhatsAppWebhookQueryDto {
  @IsString()
  'hub.mode': string;

  @IsString()
  'hub.verify_token': string;

  @IsString()
  'hub.challenge': string;

  @IsOptional()
  @IsString()
  hub_mode?: string;

  @IsOptional()
  @IsString()
  hub_verify_token?: string;

  @IsOptional()
  @IsString()
  hub_challenge?: string;
}
