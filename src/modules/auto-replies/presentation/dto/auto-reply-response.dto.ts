import { ApiProperty } from '@nestjs/swagger';
import { AutoReply } from '../../domain/auto-reply.entity';

export class AutoReplyResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  key!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty({
    enum: ['EXACT', 'CONTAINS', 'REGEX'],
  })
  matchType!: 'EXACT' | 'CONTAINS' | 'REGEX';

  @ApiProperty({
    type: [String],
  })
  patterns!: string[];

  @ApiProperty()
  responseText!: string;

  @ApiProperty({
    nullable: true,
  })
  responseImageUrl!: string | null;

  @ApiProperty()
  priority!: number;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty({
    nullable: true,
  })
  locale!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  static fromDomain(autoReply: AutoReply): AutoReplyResponseDto {
    return {
      id: autoReply.id,
      key: autoReply.key,
      title: autoReply.title,
      matchType: autoReply.matchType,
      patterns: autoReply.patterns,
      responseText: autoReply.responseText,
      responseImageUrl: autoReply.responseImageUrl,
      priority: autoReply.priority,
      isActive: autoReply.isActive,
      locale: autoReply.locale,
      createdAt: autoReply.createdAt,
      updatedAt: autoReply.updatedAt,
    };
  }
}
