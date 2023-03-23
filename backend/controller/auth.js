import User from '../model/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user != null) {
      return res.status(200).json('Exists')
    } else {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(req.body.password, salt)
      const newUser = new User({
        ...req.body,
        password: hash,
      })
      await newUser.save()
      res.status(200).json('Created')
    }
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(createError(404, 'User not found!'))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect)
      return next(createError(404, 'Wrong Password or Username'))

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    )

    const { password, isAdmin, ...otherDetails } = user._doc
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin })
  } catch (err) {
    next(err)
  }
}

export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.params.id })
    if (!user) return next(createError(200, 'User not found!'))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    )
    // if (!isPasswordCorrect) return next(createError(200, 'Wrong Password'))

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.newPassword, salt)
    const obj = {
      password: hash,
    }
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: obj,
      },
      {
        new: true,
      }
    )
    res.status(200).json('Password Reset')
  } catch (err) {
    next(err)
  }
}

export const verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user != null) {
      let obj = {
        message: 'Exist',
        id: user._id,
        name: user.firstName,
      }
      return res.status(200).json(obj)
    } else {
      return res.status(200).json({ message: 'failed' })
    }
  } catch (err) {
    next(err)
  }
}

export const forgetPassword = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.newPassword, salt)
    const obj = {
      password: hash,
    }
    await User.findByIdAndUpdate(
      req.body.id,
      {
        $set: obj,
      },
      {
        new: true,
      }
    )
    res.status(200).json('Password Updated')
  } catch (err) {
    next(err)
  }
}
