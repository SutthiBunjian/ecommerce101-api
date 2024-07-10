import { ErrorDetails } from '../validations/types'

export interface SuccessResponse {
  message?: string
  data?: any
}

interface ErrorObject {
  code: string
  message: string
  details?: ErrorDetails
}

export interface ErrorResponse {
  error: ErrorObject
}
