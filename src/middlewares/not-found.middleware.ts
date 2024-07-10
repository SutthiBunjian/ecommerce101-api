import { Request, Response, NextFunction } from 'express'

import { ErrorCodes } from '../utils/constants'

export default function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(404).json({
    error: {
      code: ErrorCodes.NotFound,
      message: `the requested [${req.method}] ${req.originalUrl} was not found`,
    },
  })
}
