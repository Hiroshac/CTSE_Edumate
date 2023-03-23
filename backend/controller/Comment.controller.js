import CommentModel from '../model/Comment.model.js'


export const createComment = async (req, res, next) => {
  const newComment = new CommentModel(req.body)

  try {
    const savedComment = await newComment.save()
    res.status(200).json(savedComment)
  } catch (err) {
    next(err)
  }
}

export const updateComments = async (req, res, next) => {
  try {
    const updateComment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updateComment)
  } catch (err) {
    next(err)
  }
}
export const deleteComment = async (req, res, next) => {
  const CommentId = req.params._id
  try {
    await CommentModel.findByIdAndDelete(req.params.id)
    try {
      await CommentModel.findByIdAndUpdate(CommentId, {
        $pull: { comment: req.params.id },
      })
    } catch (err) {
      next(err)
    }
    res.status(200).json('Item has been deleted.')
  } catch (err) {
    next(err)
  }
}
export const getComment = async (req, res, next) => {
  try {
    const comment = await CommentModel.findById(req.params.id)
    res.status(200).json(comment)
  } catch (err) {
    next(err)
  }
}
export const getComments = async (req, res, next) => {
  try {
    const comments = await CommentModel.find()
    res.status(200).json(comments)
  } catch (err) {
    next(err)
  }
}


export const getCommentByNoteId = async (req, res, next) => {
  let myquery = { note_id: Object(req.params.note_id) }
  CommentModel.find(myquery, function (err, result) {
    if (err) throw err
    res.json(result)
  })
}
