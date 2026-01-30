import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    // If the pipe is applied directly to a parameter, we validate it.
    // If we wanted to restrict to 'body' or 'query', we could pass that as an option.
    // For now, assume if the pipe is used, validation is desired.

    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: result.error.errors,
      });
    }

    return result.data;
  }
}
