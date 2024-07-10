import { ErrorCodes } from '../utils/constants'

import { ErrorDetails } from '../validations/types'

export default class ValidationError extends Error {
  name: string
  status: number
  code: string
  details: ErrorDetails

  constructor(message: string, details: ErrorDetails) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.status = 400
    this.code = ErrorCodes.ValidationFailure
    this.details = details
  }
}
