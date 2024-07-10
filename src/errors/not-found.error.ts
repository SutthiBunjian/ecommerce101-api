import { ErrorCodes } from '../utils/constants'

export default class NotFoundError extends Error {
  name: string
  status: number
  code: string

  constructor(message: string) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.status = 404
    this.code = ErrorCodes.NotFound
  }
}
