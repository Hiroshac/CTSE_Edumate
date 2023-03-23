import User from '../model/User.js'

//update
export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updateUser)
  } catch (err) {
    next(err)
  }
}

//delete
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('User has been deleted')
  } catch (err) {
    next(err)
  }
}

//get by ID
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}


export const getUsers = async (req, res, next) => {
  try {
    const { q } = req.query
    const users = await User.find()
    const keys = ['firstName', 'lastName', 'type', 'stream', 'email']
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      )
    }
    q ? res.json(search(users).slice(0, 10)) : res.json(users.slice(0, 10))
  } catch (err) {
    next(err)
  }
}

export const getType = async (req, res, next) => {
  const users = await User.find().select({ type: 1, _id: 0 })
  res.status(200).json(users)
}
