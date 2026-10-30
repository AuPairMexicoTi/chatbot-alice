import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsInt, IsOptional, Max, Min } from 'class-validator';

export class ListMessagesQueryDto {
  // Cursor de paginacion: sin `before` trae el bloque mas reciente, con
  // `before` trae el bloque inmediatamente anterior a esa fecha -- ver
  // ConversationQueryPort.listMessages.
  @ApiPropertyOptional({ description: 'ISO 8601. Trae mensajes antes de esta fecha.' })
  @IsOptional()
  @IsISO8601()
  before?: string;

  @ApiPropertyOptional({ default: 30, minimum: 1, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 30;
}
