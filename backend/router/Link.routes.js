import express from 'express'
import {
  createLink,
  updateLink,
  deleteLink,
  getLink,
  getLinks,
  getLinkByTeacherId,
} from '../controller/Link.controller.js'

const router = express.Router()
//CREATE
router.post('/add', createLink)

//UPDATE
router.put('/:id', updateLink)
//DELETE
router.delete('/:id', deleteLink)
//GET

router.get('/:id', getLink)
//GET ALL

router.get('/', getLinks)

router.get('/get/:teacher_id', getLinkByTeacherId)

export default router
