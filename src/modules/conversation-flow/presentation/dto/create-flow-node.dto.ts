import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

const flowNodeCaptureValues = {
  name: 'name',
  age: 'age',
  email: 'email',
  city: 'city',
  englishLevel: 'englishLevel',
} as const;

const flowNodeTerminalValues = {
  HANDOFF: 'HANDOFF',
  CLOSED: 'CLOSED',
} as const;

export class CreateFlowNodeDto {
  @ApiProperty({
    description: 'Lowercase kebab-case node id, e.g. "poland"',
    example: 'poland',
  })
  @IsString()
  @MaxLength(60)
  @Matches(/^[a-z][a-z0-9-]*$/, {
    message: 'id must be lowercase kebab-case (e.g. "new-country")',
  })
  id!: string;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiPropertyOptional({
    description: 'Map of trigger phrase(s) -> target node id.',
    type: Object,
    nullable: true,
  })
  @IsOptional()
  @IsObject()
  options?: Record<string, string> | null;

  @ApiPropertyOptional({
    enum: Object.values(flowNodeCaptureValues),
    nullable: true,
  })
  @IsOptional()
  @IsEnum(flowNodeCaptureValues)
  capture?: keyof typeof flowNodeCaptureValues | null;

  @ApiPropertyOptional({
    enum: Object.values(flowNodeTerminalValues),
    nullable: true,
  })
  @IsOptional()
  @IsEnum(flowNodeTerminalValues)
  terminal?: keyof typeof flowNodeTerminalValues | null;
}
