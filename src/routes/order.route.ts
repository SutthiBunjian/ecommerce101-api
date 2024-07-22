import express, { Router } from 'express'
import { asyncHandler } from '../middlewares'
import * as controller from '../controllers/order.controller'

const router: Router = express.Router()

router.post('/insertorder', asyncHandler(controller.insertOrder))
router.post('/deleteorder', asyncHandler(controller.deleteOrder))

export default router
