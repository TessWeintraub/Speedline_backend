const User = require('../models/user')
const Warehouses = require('../models/warehouses')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async (req,res) => {
  try {
    const userDataBases = await User.findOne({_id: req.user.id}) // ищем пользователя в БД
    const createWarehouse = req.body['createWarehouse']

    if (userDataBases){
      const newWarehouse = new Warehouses({
        userId: req.user.id,
        five: createWarehouse.five,
        four: createWarehouse.four,
        three: createWarehouse.three,
        one: createWarehouse.one,
        products: []
      })

      try {
          await newWarehouse.save()
          await User.updateOne({_id: req.user.id},{$push: {warehouses: newWarehouse._id}})
          const updatedUser = await User.findOne({_id: req.user.id}).populate('warehouses')
          res.status(200).json(updatedUser)
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
    const userDataBases = await User.findOne({_id: req.user.id}) // ищем пользователя в БД
    if (userDataBases){
      try {

          const removeWarehouses = req.body.warehouses
          await Warehouses.remove({_id: {$in: removeWarehouses}})
          await User.updateMany({_id: req.user.id} , {$pull: { warehouses: {$in: removeWarehouses}}})
          const updatedUser = await User.findOne({_id: req.user.id}).populate('warehouses')
          res.status(200).json(updatedUser)

        // const allWarehouseUser = await Warehouses.find({userId: req.user.id})
        // const updateUser = await User.findOneAndUpdate({_id: req.user.id},{
        //   $set:{
        //     warehouses: [...allWarehouseUser]
        //   }
        // })

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