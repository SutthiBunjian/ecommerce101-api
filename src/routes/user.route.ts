import express, { Router } from 'express'
import { asyncHandler } from '../middlewares'
import * as controller from '../controllers/user.controller'

const router: Router = express.Router()

router.post('/login', asyncHandler(controller.login))
router.post('/register', asyncHandler(controller.register))
router.post('/delete', asyncHandler(controller.deleteUser))
router.get('/list', asyncHandler(controller.getAllUsers))

export default router
