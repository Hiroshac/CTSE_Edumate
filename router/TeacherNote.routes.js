import express from 'express'
import {

  DeleteNote,
  GetNote,
  GetTeacherNotes,
  GetTeacherNotessubject,
  UpdateNote,
 CreateNote,
  getNoteByTeacherId,
  getSubject,
  getNotesbySubject,
} from '../controller/Note.controller.js'

const router = express.Router()

//create answers
router.post('/add',CreateNote)
//get all answers
router.get('/get', GetTeacherNotes)

router.get('/:id', GetNote)

router.delete('/:id', DeleteNote)

router.put('/:id', UpdateNote)

//get all answers
router.get(
  '/get',
  //get all answers
  router.post('/subject', GetTeacherNotessubject)
)
router.get(`/get/:teacher_id`, getNoteByTeacherId)
router.get('/getSub/subject', getSubject)

//filter
router.post('/notes', getNotesbySubject);
export default router
