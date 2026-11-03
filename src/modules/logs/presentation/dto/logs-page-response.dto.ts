import { ApiProperty } from '@nestjs/swagger';
import { LogEntry } from '../../application/logs.service';

export class LogsPageMetaDto {
  @ApiProperty() page!: number;
  @ApiProperty() limit!: number;
  @ApiProperty() total!: number;
  @ApiProperty() totalEvents!: number;
  @ApiProperty() lastPage!: number;
  @ApiProperty({ type: String, isArray: true }) files!: string[];
  @ApiProperty({ type: String, isArray: true }) levels!: readonly string[];
}

export class LogsPageResponseDto {
  data!: LogEntry[];
  @ApiProperty({ type: LogsPageMetaDto }) meta!: LogsPageMetaDto;
}
