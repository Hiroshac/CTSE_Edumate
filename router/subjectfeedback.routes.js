import express from 'express'
import {
  CreateSubjectfeedback,
  Deletesubjectsfeedback,
  GetAllsubjectsfeedback,
  Getsubjectsfeedback,
  Updatesubjectsfeedback,
} from '../controller/Subjectfeedback.controller.js'

const routes = express.Router()

//create
routes.post('/add', CreateSubjectfeedback)

//UPDATE
routes.put('/update/:id', Updatesubjectsfeedback)

//DELETE
routes.delete('/delete/:id', Deletesubjectsfeedback)

//GET ID
routes.get('/get/:id', Getsubjectsfeedback)

//GET ALL
routes.get('/get', GetAllsubjectsfeedback)

export default routes
