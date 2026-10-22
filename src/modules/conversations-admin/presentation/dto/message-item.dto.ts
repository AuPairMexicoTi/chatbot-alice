import { ApiProperty } from '@nestjs/swagger';
import { MessageItem } from '../../application/read-models/message-item.read-model';

export class MessageItemDto {
  @ApiProperty() id!: string;
  @ApiProperty({ enum: ['INBOUND', 'OUTBOUND'] }) direction!: string;
  @ApiProperty({ enum: ['TEXT', 'IMAGE', 'UNKNOWN', 'SYSTEM'] }) type!: string;
  @ApiProperty({ nullable: true, type: String }) text!: string | null;
  @ApiProperty({ enum: ['RECEIVED', 'QUEUED', 'SENT', 'FAILED'] })
  status!: string;
  @ApiProperty({ type: Object }) metadata!: Record<string, unknown>;
  @ApiProperty() createdAt!: string;

  static fromReadModel(message: MessageItem): MessageItemDto {
    return {
      id: message.id,
      direction: message.direction,
      type: message.type,
      text: message.text,
      status: message.status,
      metadata: message.metadata,
      createdAt: message.createdAt.toISOString(),
    };
  }
}
