import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { LOG_LEVELS, LogLevelValue } from '../../domain/log-levels';

const toBoolean = (value: unknown): boolean | undefined =>
  value === undefined ? undefined : value === true || value === 'true';

export class ListLogsQueryDto {
  @ApiPropertyOptional({
    description: 'Busca en todo el contenido de la entrada',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  search?: string;

  @ApiPropertyOptional({ enum: LOG_LEVELS })
  @IsOptional()
  @IsIn(LOG_LEVELS)
  level?: LogLevelValue;

  @ApiPropertyOptional({
    description: 'IP del request (Alice no tiene usuarios autenticados)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  user?: string;

  @ApiPropertyOptional({
    description: 'conversationId/contactId -- equivalente de "lead" en APM',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  lead?: string;

  @ApiPropertyOptional({
    description: 'Metodo o ruta HTTP (solo aplica a logs de una peticion)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  route?: string;

  @ApiPropertyOptional({
    description:
      'req.id de pino-http, para ver otras lineas de la misma peticion',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  request_id?: string;

  @ApiPropertyOptional({ example: '2026-01-01' })
  @IsOptional()
  @IsDateString()
  date_from?: string;

  @ApiPropertyOptional({ example: '2026-01-31' })
  @IsOptional()
  @IsDateString()
  date_to?: string;

  @ApiPropertyOptional({ description: 'Solo level error/fatal' })
  @IsOptional()
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  only_errors?: boolean;

  @ApiPropertyOptional({
    default: true,
    description: 'Agrupa warn/error/fatal repetidos (mismo origen+firma)',
  })
  @IsOptional()
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  group?: boolean = true;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 50, minimum: 1, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 50;
}
