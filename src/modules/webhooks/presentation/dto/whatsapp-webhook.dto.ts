import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class WhatsAppMetadataDto {
  @IsOptional()
  @IsString()
  display_phone_number?: string;

  @IsOptional()
  @IsString()
  phone_number_id?: string;
}

class WhatsAppMessageTextDto {
  @IsOptional()
  @IsString()
  body?: string;
}

class WhatsAppMessageDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  timestamp?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => WhatsAppMessageTextDto)
  text?: WhatsAppMessageTextDto;
}

class WhatsAppProfileDto {
  @IsOptional()
  @IsString()
  name?: string;
}

class WhatsAppContactDto {
  @IsOptional()
  @IsString()
  wa_id?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => WhatsAppProfileDto)
  profile?: WhatsAppProfileDto;
}

class WhatsAppValueDto {
  @IsOptional()
  @IsString()
  messaging_product?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => WhatsAppMetadataDto)
  metadata?: WhatsAppMetadataDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhatsAppContactDto)
  contacts?: WhatsAppContactDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhatsAppMessageDto)
  messages?: WhatsAppMessageDto[];
}

class WhatsAppChangeDto {
  @IsOptional()
  @IsString()
  field?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => WhatsAppValueDto)
  value!: WhatsAppValueDto;
}

class WhatsAppEntryDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhatsAppChangeDto)
  changes!: WhatsAppChangeDto[];
}

export class WhatsAppWebhookDto {
  @IsString()
  object!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhatsAppEntryDto)
  entry!: WhatsAppEntryDto[];
}
