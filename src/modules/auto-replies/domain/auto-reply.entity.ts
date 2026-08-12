export type AutoReplyMatchType = 'EXACT' | 'CONTAINS' | 'REGEX';

export interface AutoReply {
  id: string;
  key: string;
  title: string;
  matchType: AutoReplyMatchType;
  patterns: string[];
  responseText: string;
  priority: number;
  isActive: boolean;
  locale: string | null;
  createdAt: Date;
  updatedAt: Date;
}
