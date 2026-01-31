import { BadRequestException, Injectable, ValidationPipe as NestValidationPipe } from '@nestjs/common';

@Injectable()
export class ValidationPipe extends NestValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: errors => {
        const messages = errors.map(error => {
          return {
            property: error.property,
            constraints: error.constraints,
          };
        });
        return new BadRequestException(messages);
      },
    });
  }
}
