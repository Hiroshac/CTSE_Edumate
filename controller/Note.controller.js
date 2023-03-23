import TeacherNotesModel from '../model/TeacherNotes.model.js'
// import multer from 'multer'

// //multer and file location
// export const Upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, callback) => {
//       callback(null, 'TeacherNotes')
//     },
//     filename: (req, file, callback) => {
//       callback(null, file.originalname)
//     },
//   }),
// })

// //Create Industry
// export const CreateNote = async (req, res, next) => {
//   try {
//     const newTeacherNote = new TeacherNotesModel({
//       lesson_name: req.body.lesson_name,
//       stream: req.body.stream,
//       subject: req.body.subject,
//       grade: req.body.grade,
//       note: req.file.originalname,
//       teacher_id:req.body.teacher_id
//     })
//     await newTeacherNote.save()
//     res.status(200).json('Student Answers has been created.....')
//   } catch (err) {
//     next(err)
//   }
// }

export const CreateNote = async (req, res, next) => {
  const newNote = new TeacherNotesModel(req.body)

  try {
    const savedNote = await newNote.save()
    res.status(200).json(savedNote)
  } catch (err) {
    next(err)
  }
}

export const updateLink = async (req, res, next) => {
  try {
    const updatedLink = await LinkSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedLink)
  } catch (err) {
    next(err)
  }
}

//Update Industry

export const UpdateNote = async (req, res, next) => {
  try {
    const updateTeacherNote = await TeacherNotesModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updateTeacherNote)
  } catch (err) {
    next(err)
  }
}

//Delete Industry
export const DeleteNote = async (req, res, next) => {
  try {
    await TeacherNotesModel.findByIdAndDelete(req.params.id)

    res.status(200).json('Note has been deleted')
  } catch (err) {
    next(err)
  }
}

//Get Industry
export const GetNote = async (req, res, next) => {
  try {
    const getTeacherNote = await TeacherNotesModel.findById(req.params.id)

    res.status(200).json(getTeacherNote)
  } catch (err) {
    next(err)
  }
}

//Get all Industry
export const GetTeacherNotes = async (req, res, next) => {
  try {
    const getTeacherNotes = await TeacherNotesModel.find()

    res.status(200).json(getTeacherNotes)
  } catch (err) {
    next(err)
  }
}

//Get all Industry
export const GetTeacherNotessubject = async (req, res, next) => {
  try {
    const getTeacherNotes = await TeacherNotesModel.find(
      { subject: req.body.subject } && { grade: req.body.grade },
      function (result) {
        res.json(result)
      }
    )

    res.status(200).json(getTeacherNotes)
  } catch (err) {
    next(err)
  }
}

export const getNoteByTeacherId = async (req, res, next) => {
  let myquery = { teacher_id: Object(req.params.teacher_id) }
  TeacherNotesModel.find(myquery, function (err, result) {
    if (err) throw err
    res.json(result)
  })
}

export const getSubject = async (req, res, next) => {
  const marks = await TeacherNotesModel.find().select({ subject: 1, _id: 0 })

  res.status(200).json(marks)
}

//get notes by subject
export const getNotesbySubject = async (req, res, next) => {
  try {
    const filter = await TeacherNotesModel.find({ subject: req.body.subject })
    res.status(200).json(filter)
  } catch (err) {
    next(err)
  }
}
