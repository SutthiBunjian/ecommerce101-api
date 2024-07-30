import express, { Router } from 'express'
import { asyncHandler } from '../middlewares'
import * as controller from '../controllers/order.controller'

const router: Router = express.Router()

router.post('/insertorder', asyncHandler(controller.insertOrder))
router.post('/deleteorder', asyncHandler(controller.deleteOrder))
router.get('/list', asyncHandler(controller.getAllOrders))
router.get('/list/:uid', asyncHandler(controller.getOrdersByUID))

export default router
