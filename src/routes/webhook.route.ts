import express, { Router } from 'express'
import { asyncHandler } from '../middlewares'
import * as controller from '../controllers/webhook.controller'

const router: Router = express.Router()

router.post('/line', asyncHandler(controller.handleLineWebhook))

export default router
