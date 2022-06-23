const User = require('../models/user')
const Warehouses = require('../models/warehouses')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async (req,res) => {
  console.log(req.body)
  try {
    const user = await User.findOne({_id: req.body.userId})

    if (user){
      const newWarehouse = new Warehouses({
        userId: req.body.userId,
        five: req.body.warehouse.five,
        four: req.body.warehouse.four,
        three: req.body.warehouse.three,
        two: req.body.warehouse.two,
        one: req.body.warehouse.one,
        products: []
      })

      try {
        await newWarehouse.save()
        const allWarehouseUser = await Warehouses.find({userId: req.body.userId})
        console.log([...allWarehouseUser])
        const updateUser = await User.findOneAndUpdate({_id: req.body.userId},{
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
        message: 'Пользователя не существует'
      })
    }
  }catch (error){
    errorHandler(res,error)
  }
}

module.exports.remove = (req,res) =>{
  res.status(200).json({
    reg: true
  })
}