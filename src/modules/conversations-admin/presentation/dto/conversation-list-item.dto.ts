import { ApiProperty } from '@nestjs/swagger';
import { ConversationListItem } from '../../application/read-models/conversation-list-item.read-model';

export class ConversationListItemDto {
  @ApiProperty() id!: string;
  @ApiProperty() contactId!: string;
  @ApiProperty({ nullable: true, type: String }) contactName!: string | null;
  @ApiProperty() phoneNumber!: string;
  @ApiProperty({ enum: ['OPEN', 'WAITING_HUMAN', 'CLOSED'] }) status!: string;
  @ApiProperty() waitingOnHuman!: boolean;
  @ApiProperty({ nullable: true, type: String }) lastMessage!: string | null;
  @ApiProperty({ nullable: true, type: String })
  lastMessageAt!: string | null;
  @ApiProperty({ nullable: true, type: String })
  assignedAdvisorId!: string | null;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;

  static fromReadModel(item: ConversationListItem): ConversationListItemDto {
    return {
      id: item.id,
      contactId: item.contactId,
      contactName: item.contactName,
      phoneNumber: item.phoneNumber,
      status: item.status,
      waitingOnHuman: item.waitingOnHuman,
      lastMessage: item.lastMessage,
      lastMessageAt: item.lastMessageAt?.toISOString() ?? null,
      assignedAdvisorId: item.assignedAdvisorId,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }
}
