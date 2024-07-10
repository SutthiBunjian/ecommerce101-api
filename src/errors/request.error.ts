export default class RequestError extends Error {
  name: string
  status: number
  code: string

  constructor(code: string, message: string) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.status = 400
    this.code = code
  }
}
