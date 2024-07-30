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
export const getAllOrders = async (req: Request, res: Response) => {
  const users = orderService.getAllOrders()
  res.json(toSuccessResponse(users))
}

export const getOrdersByUID = async (req: Request, res: Response) => {
  const { uid } = req.params
  const order = orderService.getOrdersByUID(uid)
  res.json(toSuccessResponse(order))
}
