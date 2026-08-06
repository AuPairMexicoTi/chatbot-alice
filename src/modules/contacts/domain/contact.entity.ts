export interface Contact {
  id: string;
  externalId: string;
  name: string | null;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
