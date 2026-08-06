import { Contact as PrismaContact } from '@generated/prisma';
import { Contact } from '@modules/contacts/domain/contact.entity';

export class PrismaContactMapper {
  static toDomain(record: PrismaContact): Contact {
    return {
      id: record.id,
      externalId: record.externalId,
      name: record.name,
      phoneNumber: record.phoneNumber,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }
}
