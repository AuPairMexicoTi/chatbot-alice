import { Injectable } from '@nestjs/common';
import {
  ContactRepository,
  UpsertContactInput,
} from '@modules/contacts/application/ports/contact.repository';
import { Contact } from '@modules/contacts/domain/contact.entity';
import { InMemoryStore } from './in-memory.store';

@Injectable()
export class InMemoryContactRepository implements ContactRepository {
  constructor(private readonly store: InMemoryStore) {}

  async upsert(input: UpsertContactInput): Promise<Contact> {
    const existing = await this.findByExternalId(input.externalId);
    const now = new Date();

    if (existing) {
      const updated: Contact = {
        ...existing,
        name: input.name,
        phoneNumber: input.phoneNumber,
        updatedAt: now,
      };
      this.store.contacts.set(updated.id, updated);
      return updated;
    }

    const contact: Contact = {
      id: this.store.nextId(),
      externalId: input.externalId,
      name: input.name,
      phoneNumber: input.phoneNumber,
      createdAt: now,
      updatedAt: now,
    };
    this.store.contacts.set(contact.id, contact);
    return contact;
  }

  async findByExternalId(externalId: string): Promise<Contact | null> {
    return (
      [...this.store.contacts.values()].find(
        (contact) => contact.externalId === externalId,
      ) ?? null
    );
  }

  async findById(id: string): Promise<Contact | null> {
    return this.store.contacts.get(id) ?? null;
  }
}
