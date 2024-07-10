import express, { Router } from 'express'
import { asyncHandler } from '../middlewares'
import * as controller from '../controllers/user.controller'

const router: Router = express.Router()

router.post('/login', asyncHandler(controller.login))
router.post('/register', asyncHandler(controller.register))
router.post('/deleteUser', asyncHandler(controller.deleteUser))

export default router
