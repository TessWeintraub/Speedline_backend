const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (req,res) => {


  const candidate = await User.findOne({email: req.body.email})
  console.log(candidate)

  if (candidate){
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

      if (passwordResult) {
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        }, keys.jwt, {expiresIn: 3600})

        res.status(200).json({
          token: `Bearer ${token}`
        })
      }
      else {
        res.status(401).json({
          message: 'Пароль не совпадает'
        })
      }
  }
  else {
    res.status(404).json({
      message: 'Пользователь не найден'
    })
  }
}

module.exports.register = async (req,res) => {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate){
    res.status(409).json({
      message: 'Email уже используется'
    })
  }
  else {
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(req.body.password, salt)

    const user = new User({
      email: req.body.email,
      password: hashPassword
    })

    try {
      await user.save()
      res.status(201).json(user)
    }
    catch (error) {
      errorHandler(res, error)
    }
  }
}