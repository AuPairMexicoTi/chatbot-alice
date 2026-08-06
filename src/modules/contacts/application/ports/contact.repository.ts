import { Contact } from '../../domain/contact.entity';

export interface UpsertContactInput {
  externalId: string;
  name: string | null;
  phoneNumber: string;
}

export interface ContactRepository {
  upsert(input: UpsertContactInput): Promise<Contact>;
  findById(id: string): Promise<Contact | null>;
  findByExternalId(externalId: string): Promise<Contact | null>;
}

export const CONTACT_REPOSITORY = Symbol('CONTACT_REPOSITORY');
