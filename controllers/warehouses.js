const User = require('../models/user')
const Warehouses = require('../models/warehouses')
const jwtDecoded = require('jwt-decode')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async (req,res) => {
  try {
    const requestUserId = await jwtDecoded(req.headers.authorization).userId // Декодируем токен для получения id пользователя
    const userDataBases = await User.findOne({_id: requestUserId}) // ищем пользователя в БД


    if (userDataBases){
      const newWarehouse = new Warehouses({
        userId: requestUserId,
        five: req.body.five,
        four: req.body.four,
        three: req.body.three,
        two: req.body.two,
        one: req.body.one,
        products: []
      })

      try {
          await newWarehouse.save()
          const allWarehouseUser = await Warehouses.find({userId: requestUserId})
          const updateUser = await User.findOneAndUpdate({_id: requestUserId},{
            $set:{
              warehouses: [...allWarehouseUser,newWarehouse]
            }
          })
          res.status(200).json(updateUser)
      }
      catch (e){
        errorHandler(res,e)
      }
    }
    else {
      res.status(404).json({
        message: 'Пользователь не существует'
      })
    }
  }catch (error){
    errorHandler(res,error)
  }
}

module.exports.remove = async (req,res) =>{
  try {
    const requestUserId = await jwtDecoded(req.headers.authorization).userId // Декодируем токен для получения id пользователя
    const userDataBases = await User.findOne({_id: requestUserId}) // ищем пользователя в БД


    if (userDataBases){
      try {
        console.log(req.body.warehouses)
          const removeWarehouses = req.body.warehouses

          Warehouses.remove({_id: {$in: removeWarehouses}})
          User.updateOne({_id: requestUserId} , {$pull: { warehouses: { _id:  "62b4d69aff619a18d4148ba2"}}})
          const allWarehouseUser = await Warehouses.find({userId: requestUserId})
          const updateUser = await User.findOneAndUpdate({_id: requestUserId},{
            $set:{
              warehouses: [...allWarehouseUser]
            }
          })
          res.status(200).json(updateUser)

      }
      catch (e){
        errorHandler(res,e)
      }
    }
    else {
      res.status(404).json({
        message: 'Пользователь не существует'
      })
    }
  }catch (error){
    errorHandler(res,error)
  }
}