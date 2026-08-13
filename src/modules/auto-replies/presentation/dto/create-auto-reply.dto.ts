import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

const autoReplyMatchTypes = {
  EXACT: 'EXACT',
  CONTAINS: 'CONTAINS',
  REGEX: 'REGEX',
} as const;

export class CreateAutoReplyDto {
  @ApiProperty({
    example: 'welcome_aupair_mexico',
  })
  @IsString()
  @MaxLength(120)
  key!: string;

  @ApiProperty({
    example: 'Bienvenida Au Pair Mexico',
  })
  @IsString()
  @MaxLength(160)
  title!: string;

  @ApiProperty({
    enum: Object.values(autoReplyMatchTypes),
    example: 'CONTAINS',
  })
  @IsEnum(autoReplyMatchTypes)
  matchType!: 'EXACT' | 'CONTAINS' | 'REGEX';

  @ApiProperty({
    type: [String],
    example: ['hola', 'informes', 'au pair'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  patterns!: string[];

  @ApiProperty({
    example: 'Hola, bienvenida a Au Pair Mexico.',
  })
  @IsString()
  responseText!: string;

  @ApiPropertyOptional({
    example: 'https://aupairmexico.com/wp-content/uploads/2025/04/23-2.png',
  })
  @IsOptional()
  @IsUrl()
  responseImageUrl?: string;

  @ApiPropertyOptional({
    example: 200,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  priority?: number;

  @ApiPropertyOptional({
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: 'es-MX',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  locale?: string | null;
}
