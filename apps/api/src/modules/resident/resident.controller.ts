import { residentContract } from '@agape-care/api-contract';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { ResidentService } from './resident.service';

import { ContactService } from './contact/contact.service';
import { HealthService } from './health/health.service';
import { MedicationService } from './medication/medication.service';

@Controller()
export class ResidentController {
  constructor(
    private readonly residentService: ResidentService,
    private readonly contactService: ContactService,
    private readonly healthService: HealthService,
    private readonly medicationService: MedicationService,
  ) {}

  @Get(residentContract.getResidents.path)
  async getResidents(
    @Query(new ZodValidationPipe(residentContract.getResidents.query))
    query: any,
  ) {
    return this.residentService.getResidents(query);
  }

  @Get(residentContract.getResidentStats.path)
  async getResidentStats() {
    return this.residentService.getResidentStats();
  }

  @Get(residentContract.getResident.path.replace(':id', ':id'))
  async getResident(@Param('id') id: string) {
    return this.residentService.getResident(id);
  }

  @Post(residentContract.createResident.path)
  async createResident(
    @Body(new ZodValidationPipe(residentContract.createResident.body))
    body: any,
  ) {
    return this.residentService.createResident(body);
  }

  @Patch(residentContract.updateResident.path.replace(':id', ':id'))
  async updateResident(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(residentContract.updateResident.body))
    body: any,
  ) {
    return this.residentService.updateResident(id, body);
  }

  @Delete(residentContract.deleteResident.path.replace(':id', ':id'))
  async deleteResident(@Param('id') id: string) {
    return this.residentService.deleteResident(id);
  }

  // --- Contact Endpoints ---

  @Get(residentContract.getContacts.path.replace(':residentId', ':residentId'))
  async getContacts(@Param('residentId') residentId: string) {
    return this.contactService.getContacts(residentId);
  }

  @Post(residentContract.createContact.path.replace(':residentId', ':residentId'))
  async createContact(
    @Param('residentId') residentId: string,
    @Body(new ZodValidationPipe(residentContract.createContact.body))
    body: any,
  ) {
    return this.contactService.createContact(residentId, body);
  }

  @Patch(residentContract.updateContact.path.replace(':contactId', ':contactId'))
  async updateContact(
    @Param('contactId') contactId: string,
    @Body(new ZodValidationPipe(residentContract.updateContact.body))
    body: any,
  ) {
    return this.contactService.updateContact(contactId, body);
  }

  @Delete(residentContract.deleteContact.path.replace(':contactId', ':contactId'))
  async deleteContact(@Param('contactId') contactId: string) {
    return this.contactService.deleteContact(contactId);
  }

  // --- Health Note Endpoints ---

  @Get(residentContract.getHealthNotes.path.replace(':residentId', ':residentId'))
  async getHealthNotes(
    @Param('residentId') residentId: string,
    @Query(new ZodValidationPipe(residentContract.getHealthNotes.query))
    query: any,
  ) {
    return this.healthService.getHealthNotes(residentId, query);
  }

  @Post(residentContract.createHealthNote.path.replace(':residentId', ':residentId'))
  async createHealthNote(
    @Param('residentId') residentId: string,
    @Body(new ZodValidationPipe(residentContract.createHealthNote.body))
    body: any,
  ) {
    // TODO: Pass userId when authentication is available
    return this.healthService.createHealthNote(residentId, body);
  }

  @Patch(residentContract.updateHealthNote.path.replace(':noteId', ':noteId'))
  async updateHealthNote(
    @Param('noteId') noteId: string,
    @Body(new ZodValidationPipe(residentContract.updateHealthNote.body))
    body: any,
  ) {
    // TODO: Pass userId when authentication is available
    return this.healthService.updateHealthNote(noteId, body);
  }

  @Delete(residentContract.deleteHealthNote.path.replace(':noteId', ':noteId'))
  async deleteHealthNote(@Param('noteId') noteId: string) {
    return this.healthService.deleteHealthNote(noteId);
  }

  // --- Medication Endpoints ---

  @Get(residentContract.getMedications.path.replace(':residentId', ':residentId'))
  async getMedications(
    @Param('residentId') residentId: string,
    @Query(new ZodValidationPipe(residentContract.getMedications.query))
    query: any,
  ) {
    return this.medicationService.getMedications(residentId, query);
  }

  @Post(residentContract.createMedication.path.replace(':residentId', ':residentId'))
  async createMedication(
    @Param('residentId') residentId: string,
    @Body(new ZodValidationPipe(residentContract.createMedication.body))
    body: any,
  ) {
    return this.medicationService.createMedication(residentId, body);
  }

  @Patch(residentContract.updateMedication.path.replace(':medicationId', ':medicationId'))
  async updateMedication(
    @Param('medicationId') medicationId: string,
    @Body(new ZodValidationPipe(residentContract.updateMedication.body))
    body: any,
  ) {
    return this.medicationService.updateMedication(medicationId, body);
  }

  @Delete(residentContract.deleteMedication.path.replace(':medicationId', ':medicationId'))
  async deleteMedication(@Param('medicationId') medicationId: string) {
    return this.medicationService.deleteMedication(medicationId);
  }
}
