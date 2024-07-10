import { Request, Response, NextFunction } from 'express'
import { ErrorCodes } from '../utils/constants'
import {
  AuthenticationError,
  NotFoundError,
  RequestError,
  ValidationError,
  InternalError,
} from '../errors'
import { toErrorResponse } from '../utils/common'

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let status = 500
  let code = ErrorCodes.InternalError
  let message = err.message
  let details

  console.log(`${req.method} ${req.url} ERROR:`, err)

  if (err instanceof ValidationError) {
    status = err.status
    code = err.code
    message = err.message
    details = err.details
  } else if (
    err instanceof AuthenticationError ||
    err instanceof NotFoundError ||
    err instanceof RequestError ||
    err instanceof InternalError
  ) {
    status = err.status
    code = err.code
    message = err.message
  }

  res.status(status).json(toErrorResponse(code, message, details))
}
