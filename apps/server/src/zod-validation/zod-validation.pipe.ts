import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodError, z } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodType) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })));
      }
      throw new BadRequestException('Validation failed');
    }
  }
}