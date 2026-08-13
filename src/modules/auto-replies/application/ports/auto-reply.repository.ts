import { AutoReply } from '../../domain/auto-reply.entity';

export interface CreateAutoReplyInput {
  key: string;
  title: string;
  matchType: 'EXACT' | 'CONTAINS' | 'REGEX';
  patterns: string[];
  responseText: string;
  responseImageUrl: string | null;
  priority: number;
  isActive: boolean;
  locale: string | null;
}

export interface AutoReplyRepository {
  listAll(): Promise<AutoReply[]>;
  listActiveByLocale(locale: string): Promise<AutoReply[]>;
  create(input: CreateAutoReplyInput): Promise<AutoReply>;
}

export const AUTO_REPLY_REPOSITORY = Symbol('AUTO_REPLY_REPOSITORY');
