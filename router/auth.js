import express from 'express'
import {
  forgetPassword,
  login,
  register,
  updatePassword,
  verifyEmail,
} from '../controller/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.put('/updatePwd/:id', updatePassword)
router.post('/verifyEmail', verifyEmail)
router.put('/forgetPassword', forgetPassword)

export default router
