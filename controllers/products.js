const User = require("../models/user");
const Warehouses = require("../models/warehouses");
const errorHandler = require("../utils/errorHandler");
const _ = require('lodash')


module.exports.create = async (req,res) => {
  try {
    const userInDataBases = await User.findOne({_id: req.user.id}) // Проверка пользователя на нахождение в БД


    if (userInDataBases){
      const warehouseId = req.body['warehouseId'] // Обращаемся к ключу в теле запроса, который содержит id склада
      const product = req.body['createProduct'] // Обращаемся к ключу в теле запроса, который содержит данные о новом товаре

      const newProduct = {
        five: product.five,
        four: product.four,
        three: product.three,
        two: product.two,
        one: product.one
      }

      try {
        await Warehouses.updateOne({_id: warehouseId, userId : req.user.id},{$push: {products: newProduct}})
        const updatedUser = await User.findOne({_id: req.user.id}).populate('warehouses') // Запрашиваем обновленные данные
        res.status(200).json(updatedUser) // Отдаем пользователю обновленные данные
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
    const userInDataBases = await User.findOne({_id: req.user.id}) // Проверка пользователя на нахождение в БД


    if (userInDataBases) {
      const warehouseId = req.body.warehouseId // Обращаемся к ключу в теле запроса, который содержит id склада
      const removeProducts = req.body.removeProducts // Обращаемся к ключу в теле запроса, который содержит данные о новом товаре

      try {
        await Warehouses.updateOne({_id: warehouseId, userId: req.user.id}, {$pull: {products: {_id: {$in: removeProducts}}}})
        const updatedUser = await User.findOne({_id: req.user.id}).populate('warehouses') // Запрашиваем обновленные данные
        res.status(200).json(updatedUser) // Отдаем пользователю обновленные данные
      } catch (e) {
        errorHandler(res, e)
      }
    } else {
      res.status(404).json({
        message: 'Пользователь не существует'
      })
    }
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.move = async (req,res) => {
  try {
    const userInDataBases = await User.findOne({_id: req.user.id}) // Проверка пользователя на нахождение в БД


    if (userInDataBases) {
      const warehouseIdIn = req.body.warehouseIdIn // Обращаемся к ключу в теле запроса, который содержит id склада
      const warehouseIdFrom = req.body.warehouseIdFrom // Обращаемся к ключу в теле запроса, который содержит id склада
      const moveProducts = req.body.moveProducts // Обращаемся к ключу в теле запроса, который содержит данные о новом товаре
      try {
        const warehouse = await Warehouses.findOne({_id: warehouseIdFrom })


        const arr = warehouse.products.map( wp => {
          return moveProducts.map(mp => {
            if (wp._id == mp) return wp
          })
        })
        const arr2 = arr.flat().filter(el=> el !== undefined)

        const warehouseIn = await Warehouses.findOne({_id: warehouseIdIn }) // Данные о складе куда нужно перенести продукты
        await Warehouses.updateOne({_id: warehouseIdFrom, userId: req.user.id}, {$pull: {products: {_id: {$in: moveProducts}}}}) // Удаление продуктов из старого склада
        await Warehouses.updateOne({_id: warehouseIdIn, userId: req.user.id}, {$set: {products: [...warehouseIn.products, ...arr2]}}) // Добавление продуктов в новый склад
        const updatedUser = await User.findOne({_id: req.user.id}).populate('warehouses')
        res.status(200).json(updatedUser) // Отдаем пользователю обновленные данные
      } catch (e) {
        errorHandler(res, e)
      }
    } else {
      res.status(404).json({
        message: 'Пользователь не существует'
      })
    }
  } catch (error) {
    errorHandler(res, error)
  }
}