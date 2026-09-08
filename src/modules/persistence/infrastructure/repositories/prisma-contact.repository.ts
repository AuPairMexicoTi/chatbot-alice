import { PrismaService } from '@shared/infrastructure/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  ContactRepository,
  UpsertContactInput,
} from '@modules/contacts/application/ports/contact.repository';
import { Contact } from '@modules/contacts/domain/contact.entity';
import { PrismaContactMapper } from '../mappers/prisma-contact.mapper';

@Injectable()
export class PrismaContactRepository implements ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(input: UpsertContactInput): Promise<Contact> {
    const record = await this.prisma.contact.upsert({
      where: { externalId: input.externalId },
      create: input,
      update: { name: input.name, phoneNumber: input.phoneNumber },
    });
    return PrismaContactMapper.toDomain(record);
  }

  async findById(id: string): Promise<Contact | null> {
    const record = await this.prisma.contact.findUnique({ where: { id } });
    return record ? PrismaContactMapper.toDomain(record) : null;
  }

  async findByExternalId(externalId: string): Promise<Contact | null> {
    const record = await this.prisma.contact.findUnique({
      where: { externalId },
    });
    return record ? PrismaContactMapper.toDomain(record) : null;
  }
}
