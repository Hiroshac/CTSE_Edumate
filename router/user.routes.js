import express from 'express'
import {
  deleteUser,
  getType,
  getUser,
  getUsers,
  updateUser,
} from '../controller/user.controller.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

//update
router.put('/:id', updateUser)

//delete
router.delete('/:id', deleteUser)

//get
router.get('/:id', getUser)

// get all
router.get('/', getUsers)

router.get('/get/type', getType)

export default router
