import { CreateContactRequest, UpdateContactRequest } from '@agape-care/api-contract';
import { PrismaService } from '@agape-care/database';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async getContacts(residentId: string) {
    const contacts = await this.prisma.residentContact.findMany({
      where: { residentId: BigInt(residentId) },
      orderBy: { isPrimary: 'desc' },
    });

    return contacts.map(this.serializeContact);
  }

  async createContact(residentId: string, data: CreateContactRequest) {
    // If this is the first contact or marked as primary, handle primary status logic
    if (data.isPrimary) {
      await this.prisma.residentContact.updateMany({
        where: { residentId: BigInt(residentId), isPrimary: true },
        data: { isPrimary: false },
      });
    } else {
      // If no contacts exist, make the first one primary automatically
      const count = await this.prisma.residentContact.count({
        where: { residentId: BigInt(residentId) },
      });
      if (count === 0) {
        data.isPrimary = true;
      }
    }

    const contact = await this.prisma.residentContact.create({
      data: {
        residentId: BigInt(residentId),
        ...data,
      },
    });

    return this.serializeContact(contact);
  }

  async updateContact(contactId: string, data: UpdateContactRequest) {
    const contact = await this.prisma.residentContact.findUnique({
      where: { id: BigInt(contactId) },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }

    if (data.isPrimary === true) {
      await this.prisma.residentContact.updateMany({
        where: {
          residentId: contact.residentId,
          isPrimary: true,
          id: { not: contact.id },
        },
        data: { isPrimary: false },
      });
    }

    const updatedContact = await this.prisma.residentContact.update({
      where: { id: BigInt(contactId) },
      data,
    });

    return this.serializeContact(updatedContact);
  }

  async deleteContact(contactId: string) {
    const contact = await this.prisma.residentContact.findUnique({
      where: { id: BigInt(contactId) },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }

    await this.prisma.residentContact.delete({
      where: { id: BigInt(contactId) },
    });

    return { message: 'Contact deleted successfully' };
  }

  private serializeContact(contact: any) {
    return {
      ...contact,
      id: contact.id.toString(),
      residentId: contact.residentId.toString(),
      createdAt: contact.createdAt.toISOString(),
      updatedAt: contact.updatedAt.toISOString(),
    };
  }
}
