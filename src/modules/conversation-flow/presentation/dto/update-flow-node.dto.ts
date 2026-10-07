import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

// Solo el texto y la imagen son editables desde el panel de administración —
// options, capture y terminal se definen en código (aupair-flow.definition.ts).
export class UpdateFlowNodeDto {
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
