import SubjectTimeTableModel from "../model/SubjectTimeTable.model.js";

//create subject time table
export const createSubjectTimetable = async (req, res, next) => {
  const timetable = new SubjectTimeTableModel(req.body)
  try {
      const saveTable = await timetable.save()
      res.status(200).json(saveTable)  
  } catch (err) {
    next(err)
  }
} 

//update subject time table
export const updateSubjectTimetable = async (req, res, next)=>{

    try{
        const updatedsubjecttime = await SubjectTimeTableModel.findByIdAndUpdate(
            req.params.id,
            {$set : req.body},
            {new: true}
        )
        res.status(200).json(updatedsubjecttime);
    }
    catch(err){
        next(err);
    }
}

//get subject time table by id
export const getTableById = async (req, res, next) => {
    try {
      const subjecttime = await SubjectTimeTableModel.findById(req.params.id)
      res.status(200).json(subjecttime)
    } catch (err) {
      next(err)
    }
  }
  
  //delete stream
  
  export const deleteTable = async (req, res, next) => {
    try {
      await SubjectTimeTableModel.findByIdAndDelete(req.params.id)
      res.status(200).json('Subject time table has been deleted.')
    } catch (err) {
      next(err)
    }
  }
  
  //get Streams
  
  export const getTables = async (req, res, next) => {
    try {
      const subjecttimes = await SubjectTimeTableModel.find()
      res.status(200).json(subjecttimes)
    } catch (err) {
      next(err)
    }
  }

  //get subject by stream
export const getSubjectTimetabelbyStream = async (req,res,next) => {
  try{
    const filter = await SubjectTimeTableModel.find(
      {stream : req.body.stream}
    )
    res.status(200).json(filter)
  }catch(err){next(err)}
}