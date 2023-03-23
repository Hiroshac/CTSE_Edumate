import express from 'express'
import {
  CreateStudentAnswers,
  GetAllStudentAnswers,
  Upload,
  GetStudentAnswers,
    UpdateStudentAnswers,
  getAnswersbyID,
  getSubject,
  getStudentAnswersByStream
} from '../controller/Studentanswers.controller.js'

const router = express.Router()

//create answers
router.post('/add', Upload.single('file'), CreateStudentAnswers)

router.put('/:id', UpdateStudentAnswers)
//get all answers
router.get('/get', GetAllStudentAnswers)

router.get('/get/:id', GetStudentAnswers)

router.get('/getBySubject/:stream',getStudentAnswersByStream)

//filter
router.post('/idfilter',getAnswersbyID)

router.get('/subject',getSubject)

export default router
