import SubjectModel from '../model/Subject.model.js'
// create stream

export const createSubject = async (req, res, next) => {
  const subject = new SubjectModel(req.body)
  try {
    const savedSubject = await subject.save()
    res.status(200).json(savedSubject)
  } catch (err) {
    next(err)
  }
}

//update stream

export const updateSubject = async (req, res, next) => {
  try {
    const updatedSubject = await SubjectModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedSubject)
  } catch (err) {
    next(err)
  }
}

//get stream by id
export const getSubjectById = async (req, res, next) => {
  try {
    const subject = await SubjectModel.findById(req.params.id)
    res.status(200).json(subject)
  } catch (err) {
    next(err)
  }
}

//delete stream

export const deleteSubject = async (req, res, next) => {
  try {
    await SubjectModel.findByIdAndDelete(req.params.id)
    res.status(200).json('Subject has been deleted.')
  } catch (err) {
    next(err)
  }
}

//get Streams

export const getSubjects = async (req, res, next) => {
  try {
    const subjects = await SubjectModel.find()
    res.status(200).json(subjects)
  } catch (err) {
    next(err)
  }
}

//get subject by stream
export const getSubjectbyStream = async (req,res,next) => {
  try{
    const filter = await SubjectModel.find(
      {streamname : req.body.streamname}
    )
    res.status(200).json(filter)
  }catch(err){next(err)}
}
