import { Inject, Injectable } from '@nestjs/common';
import {
  AUTO_REPLY_REPOSITORY,
  AutoReplyRepository,
} from '../ports/auto-reply.repository';
import { AutoReply } from '../../domain/auto-reply.entity';

@Injectable()
export class ResolveAutoReplyUseCase {
  constructor(
    @Inject(AUTO_REPLY_REPOSITORY)
    private readonly autoReplyRepository: AutoReplyRepository,
  ) {}

  async execute(
    text: string | null,
    locale: string,
  ): Promise<
    { id: string; key: string; text: string; imageUrl: string | null } | null
  > {
    const normalizedInput = this.normalize(text);
    if (!normalizedInput) {
      return null;
    }

    const autoReplies =
      await this.autoReplyRepository.listActiveByLocale(locale);

    for (const autoReply of autoReplies) {
      if (this.matches(autoReply, normalizedInput)) {
        return {
          id: autoReply.id,
          key: autoReply.key,
          text: autoReply.responseText,
          imageUrl: autoReply.responseImageUrl,
        };
      }
    }

    return null;
  }

  private matches(autoReply: AutoReply, normalizedInput: string): boolean {
    return autoReply.patterns.some((pattern) => {
      const normalizedPattern = this.normalize(pattern);
      if (!normalizedPattern) {
        return false;
      }

      switch (autoReply.matchType) {
        case 'EXACT':
          return normalizedInput === normalizedPattern;
        case 'CONTAINS':
          return normalizedInput.includes(normalizedPattern);
        case 'REGEX':
          try {
            return new RegExp(pattern, 'i').test(normalizedInput);
          } catch {
            return false;
          }
      }
    });
  }

  private normalize(value: string | null): string {
    return (value ?? '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }
}
