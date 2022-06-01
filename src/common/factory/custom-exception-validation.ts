import { ValidationError, BadRequestException } from '@nestjs/common';

export function CustomExceptionValidationFactory(
  errors: ValidationError[],
): any {
  const result = {};

  for (const err of errors) {
    result[err.property] = Object.values(err.constraints);
  }

  return new BadRequestException(result);
}
