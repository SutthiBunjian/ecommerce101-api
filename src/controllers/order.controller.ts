import { Request, Response } from 'express'
import * as orderService from '../services/order.service'
import { toSuccessResponse } from '../utils/common'
import { Order } from 'type/Order'

export const insertOrder = async (req: Request, res: Response) => {
  const body = req.body as Order
  const result = await orderService.insertOrder(body)
  res.json(toSuccessResponse(result))
}

export const deleteOrder = async (req: Request, res: Response) => {
  const body = req.body
  await orderService.deleteOrder(body.ordernumber)
  res.json(toSuccessResponse())
}
