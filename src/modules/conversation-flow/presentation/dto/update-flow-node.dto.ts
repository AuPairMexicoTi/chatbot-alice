import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';

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

export class UpdateFlowNodeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Map of trigger phrase(s) -> target node id, or null to clear.',
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
