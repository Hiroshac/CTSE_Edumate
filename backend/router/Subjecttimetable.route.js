import express from 'express'
import { createSubjectTimetable, deleteTable, getSubjectTimetabelbyStream, getTableById, getTables, updateSubjectTimetable } from '../controller/SubjectTimeTable.controler.js'



const subtimerouter = express.Router()
//CREATE
subtimerouter.post('/add', createSubjectTimetable)

//UPDATE
// router.put('/availability/:id',updateItemAvailability)
subtimerouter.put('/:id', updateSubjectTimetable)
//DELETE
subtimerouter.delete('/:id/', deleteTable)
//GET

subtimerouter.get('/:id', getTableById)
//GET ALL

subtimerouter.get('/', getTables)
//filter
subtimerouter.post('/time', getSubjectTimetabelbyStream);

export default subtimerouter
