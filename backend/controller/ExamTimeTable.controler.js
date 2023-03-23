import ExamTimeTableModel from "../model/ExamTimeTable.model.js";

// create Exam

export const createExam = async (req, res, next) =>{
    const exam = new ExamTimeTableModel(req.body);
    try {
        const savedExam = await exam.save();
        res.status(200).json(savedExam)
    }
    catch(err) {
        next(err);
    }
}

//update Exam

export const updateExam = async (req, res, next) => {
    try {
      const updatedExam = await ExamTimeTableModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )
      res.status(200).json(updatedExam)
    } catch (err) {
      next(err)
    }
  }

  //get Exam
  export const getExamById = async (req, res, next) => {
    try {
      const exam = await ExamTimeTableModel.findById(req.params.id)
      res.status(200).json(exam)
    } catch (err) {
      next(err)
    }
  } 

  //delete Exam

  export const deleteExam = async (req, res, next) => {
    try {
      await ExamTimeTableModel.findByIdAndDelete(req.params.id)
      res.status(200).json('Exam has been deleted.')
    } catch (err) {
      next(err)
    }
  }

//get Exams

export const getExams = async (req, res, next) => {
    try {
      const exams = await ExamTimeTableModel.find()
      res.status(200).json(exams)
    } catch (err) {
      next(err)
    }
  }


//get exam table by name

  export const getExamByName = async (req, res, next) => {
  try {
    const searchedexam = await ExamTimeTableModel.find(
      { subject: req.body.subject },
    )
    res.status(200).json(searchedexam)
  } catch (err) {
    next(err)
  }
}

export const displaySearch = async (req, res) =>{
  try {
    const  search = { sub: Object(req.params.exam) }
    const exam = await ExamTimeTableModel.findOne(search)
    res.status(200).json(exam);
  }catch(err){
    next(err)
  }
}

//get exam time table by stream
export const getTimetablebyStream = async (req,res,next) => {
  try{
    const filter = await ExamTimeTableModel.find(
      {stream : req.body.stream}
    )
    res.status(200).json(filter)
  }catch(err){next(err)}
}
 
export const getType = async (req, res, next) => {
  const users = await ExamTimeTableModel.find().select({ subject: 1, _id: 0 })
  res.status(200).json(users)
}
