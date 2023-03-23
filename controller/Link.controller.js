import LinkSchema from '../model/Link.model.js'

export const createLink = async (req, res, next) => {
  const newLink = new LinkSchema(req.body)

  try {
 
      const savedLink = await newLink.save()
      res.status(200).json(savedLink)
    
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

export const deleteLink = async (req, res, next) => {
  const LinkId = req.params.hotelid
  try {
    await LinkSchema.findByIdAndDelete(req.params.id)
    try {
      await LinkSchema.findByIdAndUpdate(LinkId, {
        $pull: { links: req.params.id },
      })
    } catch (err) {
      next(err)
    }
    res.status(200).json('Item has been deleted.')
  } catch (err) {
    next(err)
  }
}
export const getLink = async (req, res, next) => {
  try {
    const link = await LinkSchema.findById(req.params.id)
    res.status(200).json(link)
  } catch (err) {
    next(err)
  }
}
export const getLinks = async (req, res, next) => {
  try {
    const links = await LinkSchema.find()
    res.status(200).json(links)
  } catch (err) {
    next(err)
  }
}

export const getLinkByTeacherId = async (req, res, next) => {

     let myquery = { teacher_id: Object(req.params.teacher_id) }
    LinkSchema.find(myquery, function (err, result) {
      if (err) throw err
      res.json(result)
    })
}


