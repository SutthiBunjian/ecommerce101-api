import { Schema } from 'joi'
import { Request, Response, NextFunction } from 'express'

import validator from '../validations/validator'
import ValidationError from '../errors/validation.error'
/**
 * Validate the request
 * @param {object} schema joi schema
 * @param {string} key request property "params", "body", "query", "file"
 */
export default function validationHandler(
  schema: Schema,
  key: 'params' | 'body' | 'query',
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { hasError, errors } = validator.validate(schema, req[key])

    if (hasError) {
      throw new ValidationError(`request ${key} validation failed`, errors)
    }

    next()
  }
}
