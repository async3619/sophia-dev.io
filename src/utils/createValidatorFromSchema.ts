import * as yup from 'yup'

export function createValidatorFromSchema<T extends yup.ObjectSchema<any>>(
  schema: T,
) {
  return (data: unknown) => schema.validateSync(data)
}
