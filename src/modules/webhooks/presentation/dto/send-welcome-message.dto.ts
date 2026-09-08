import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class SendWelcomeMessageDto {
  @ApiProperty({ example: 12345 })
  @IsInt()
  lead_id!: number;

  @ApiProperty({ example: 'Ana' })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  @MaxLength(100)
  last_name!: string;

  @ApiProperty({ example: '5215500000000' })
  @IsString()
  @MaxLength(30)
  phone!: string;

  @ApiPropertyOptional({ example: 'ana@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string | null;
}
