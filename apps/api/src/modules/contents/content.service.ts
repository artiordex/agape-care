import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentService {
  // Common content logic can go here
  getHello(): string {
    return 'Content Service';
  }
}
