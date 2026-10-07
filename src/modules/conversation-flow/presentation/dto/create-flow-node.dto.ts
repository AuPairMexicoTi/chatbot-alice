import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';

// Solo id + texto + imagen — sin options/capture/terminal. El nodo creado
// aquí no participa en el flujo del bot hasta que TI lo conecte por código.
export class CreateFlowNodeDto {
  @ApiProperty({
    description: 'Lowercase kebab-case node id, e.g. "promo-verano"',
    example: 'promo-verano',
  })
  @IsString()
  @MaxLength(60)
  @Matches(/^[a-z][a-z0-9-]*$/, {
    message: 'id must be lowercase kebab-case (e.g. "new-message")',
  })
  id!: string;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiPropertyOptional({
    example: 'https://aupairmexico.com/wp-content/uploads/2025/04/23-2.png',
    nullable: true,
  })
  @IsOptional()
  @IsUrl({ require_tld: false })
  imageUrl?: string | null;
}
