import { Request, Response } from 'express'

import * as userService from '../services/user.service'
import { toSuccessResponse } from '../utils/common'

export const login = async (req: Request, res: Response) => {
  const body = req.body
  const result = await userService.login(body.username, body.password)
  res.json(toSuccessResponse(result))
}

export const deleteUser = async (req: Request, res: Response) => {
  const body = req.body
  await userService.deleteUser(body.uid)
  res.json(toSuccessResponse())
}

export const register = async (req: Request, res: Response) => {
  const body = req.body
  const result = await userService.register(
    body.firstName,
    body.lastName,
    body.email,
    body.dateOfBirth,
    body.password,
    body.address,
    body.uid,
  )
  res.json(toSuccessResponse(result))
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users = userService.getAllUsers()
  res.json(toSuccessResponse(users))
}
