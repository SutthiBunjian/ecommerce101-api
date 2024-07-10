import { Request, Response } from 'express'

import * as userService from '../services/user.service'

export const login = async (req: Request, res: Response) => {
  try {
    const body = req.body
    await userService.login(body.username, body.password)
    res.send()
  } catch (err: any) {
    console.error('Login Error : ', err.message)
    res.status(500).end()
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const body = req.body
    await userService.deleteUser(body.UID)
    res.send()
  } catch (err: any) {
    console.error('Delete Error : ', err.message)
    res.status(500).end()
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const body = req.body
    await userService.register(
      body.firstName,
      body.lastName,
      body.email,
      body.dateOfBirth,
      body.password,
      body.address,
      body.UID,
    )
    res.send()
  } catch (err: any) {
    console.error('Register Error : ', err.message)
    res.status(500).end()
  }
}
