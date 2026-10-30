import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

const conversationStatuses = {
  OPEN: 'OPEN',
  WAITING_HUMAN: 'WAITING_HUMAN',
  CLOSED: 'CLOSED',
} as const;

export class ListConversationsQueryDto {
  @ApiPropertyOptional({
    description: 'Busca por nombre de contacto o telefono',
    example: 'Maria',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @ApiPropertyOptional({ enum: Object.values(conversationStatuses) })
  @IsOptional()
  @IsEnum(conversationStatuses)
  status?: 'OPEN' | 'WAITING_HUMAN' | 'CLOSED';

  @ApiPropertyOptional({ example: '2026-01-01' })
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @ApiPropertyOptional({ example: '2026-01-31' })
  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @ApiPropertyOptional({
    description: 'ID del asesor asignado (alc_handoffs.assigned_agent_id)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  assignedAdvisorId?: string;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
