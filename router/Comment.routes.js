import express from 'express'
import {
  createComment,
  updateComments,
  deleteComment,
  getComment,
  getComments,
  getCommentByNoteId,
} from '../controller/Comment.controller.js'
const router = express.Router()
//CREATE
router.post('/add', createComment)

router.put('/:id', updateComments)
//DELETE
router.delete('/:id', deleteComment)
//GET

router.get('/:id', getComment)
//GET ALL

router.get('/', getComments)

router.get('/get/:note_id', getCommentByNoteId)

export default router
