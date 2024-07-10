import { Schema } from 'joi'

import { ErrorDetails } from './types'

function validate(
  schema: Schema,
  data: any,
  options = { abortEarly: false, allowUnknown: false },
) {
  let hasError: boolean = false
  let errors: ErrorDetails = {}

  const { error } = schema.validate(data, options)
  if (error) {
    hasError = true

    errors = error.details.reduce((result: any, detail) => {
      const { message, path } = detail

      result[path.join('.')] = message

      return result
    }, {} as ErrorDetails)
  }

  return {
    hasError,
    errors,
  }
}

export default {
  validate,
}
