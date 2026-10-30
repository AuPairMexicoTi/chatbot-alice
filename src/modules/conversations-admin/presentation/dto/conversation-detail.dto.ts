import { ApiProperty } from '@nestjs/swagger';
import { ConversationDetail } from '../../application/read-models/conversation-detail.read-model';

class ConversationDetailContactDto {
  @ApiProperty() id!: string;
  @ApiProperty() externalId!: string;
  @ApiProperty({ nullable: true, type: String }) name!: string | null;
  @ApiProperty() phoneNumber!: string;
}

export class ConversationDetailDto {
  @ApiProperty() id!: string;
  @ApiProperty({ enum: ['OPEN', 'WAITING_HUMAN', 'CLOSED'] }) status!: string;
  @ApiProperty() locale!: string;
  @ApiProperty() waitingOnHuman!: boolean;
  @ApiProperty({ nullable: true, type: String })
  assignedAdvisorId!: string | null;
  @ApiProperty({ type: ConversationDetailContactDto })
  contact!: ConversationDetailContactDto;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;

  static fromReadModel(detail: ConversationDetail): ConversationDetailDto {
    return {
      id: detail.id,
      status: detail.status,
      locale: detail.locale,
      waitingOnHuman: detail.waitingOnHuman,
      assignedAdvisorId: detail.assignedAdvisorId,
      contact: {
        id: detail.contact.id,
        externalId: detail.contact.externalId,
        name: detail.contact.name,
        phoneNumber: detail.contact.phoneNumber,
      },
      createdAt: detail.createdAt.toISOString(),
      updatedAt: detail.updatedAt.toISOString(),
    };
  }
}
