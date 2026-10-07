import { ApiPropertyOptional } from '@nestjs/swagger';
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

export class UpdateAutoReplyDto {
  @ApiPropertyOptional({
    example: 'Bienvenida Au Pair Mexico',
  })
  @IsOptional()
  @IsString()
  @MaxLength(160)
  title?: string;

  @ApiPropertyOptional({
    enum: Object.values(autoReplyMatchTypes),
    example: 'CONTAINS',
  })
  @IsOptional()
  @IsEnum(autoReplyMatchTypes)
  matchType?: 'EXACT' | 'CONTAINS' | 'REGEX';

  @ApiPropertyOptional({
    type: [String],
    example: ['hola', 'informes', 'au pair'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  patterns?: string[];

  @ApiPropertyOptional({
    example: 'Hola, bienvenida a Au Pair Mexico.',
  })
  @IsOptional()
  @IsString()
  responseText?: string;

  @ApiPropertyOptional({
    example: 'https://aupairmexico.com/wp-content/uploads/2025/04/23-2.png',
    nullable: true,
  })
  @IsOptional()
  @IsUrl({ require_tld: false })
  responseImageUrl?: string | null;

  @ApiPropertyOptional({
    example: 200,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  priority?: number;

  @ApiPropertyOptional({
    example: true,
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
