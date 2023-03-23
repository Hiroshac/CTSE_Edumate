import Marks from '../model/Mark.model.js'

export const createMark = async (req, res, next) => {
  const newMark = new Marks(req.body)

  try {
    const savedMark = await newMark.save()
    res.status(200).json(savedMark)
  } catch (err) {
    next(err)
  }
}

export const updateMark = async (req, res, next) => {
  try {
    const updatedMark = await Marks.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedMark)
  } catch (err) {
    next(err)
  }
}

export const deleteMark = async (req, res, next) => {
  const MarkId = req.params._id
  try {
    await Marks.findByIdAndDelete(req.params.id)
    try {
      await Marks.findByIdAndUpdate(MarkId, {
        $pull: { marks: req.params.id },
      })
    } catch (err) {
      next(err)
    }
    res.status(200).json('Item has been deleted.')
  } catch (err) {
    next(err)
  }
}
export const getMark = async (req, res, next) => {
  try {
    const mark = await Marks.findById(req.params.id)
    res.status(200).json(mark)
  } catch (err) {
    next(err)
  }
}
export const getMarks = async (req, res, next) => {
  try {
    const marks = await Marks.find()
    res.status(200).json(marks)
  } catch (err) {
    next(err)
  }
}

export const getMarkByStudentId = async (req, res, next) => {
  let myquery = { student_id: Object(req.params.student_id) }
  Marks.find(myquery, function (err, result) {
    if (err) throw err
    res.json(result)
  })
}

export const getMarkByTeacherId = async (req, res, next) => {
  let myquery = { markedBy: Object(req.params.markedBy) }
  Marks.find(myquery, function (err, result) {
    if (err) throw err
    res.json(result)
  })
}
