const User = require("../models/user");
const Warehouses = require("../models/warehouses");
const errorHandler = require("../utils/errorHandler");


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
        one: product.one,
        payment: product.payment
      }

      try {
        const warehouse = await Warehouses.findOne({_id: warehouseId, userId: req.user.id}) // Получаем текущую информацию о складе

        await Warehouses.updateOne(
          {
            _id: warehouseId,
            userId : req.user.id
          },
          {
            $push: {
              products: newProduct
            },
            $set: {
              two: Number(warehouse.two) + 1
            }
          })
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
      console.log(req.body)
      try {
        const warehouse = await Warehouses.findOne({_id: warehouseId, userId: req.user.id}) // Получаем текущую информацию о складе


        await Warehouses.updateOne(
          {
              _id: warehouseId,
              userId: req.user.id
          },
          {
            $pull: {
              products: {
                _id: {$in: removeProducts}
              }
            },
            $set: {
              two: Number(warehouse.two) - Number(removeProducts.length)
            }
          })

        const updatedUser = await User.findOne({_id: req.user.id}).populate('warehouses') // Запрашиваем обновленные данные

        res.status(200).json(updatedUser) // Отдаем пользователю обновленные данные
      } catch (e) {
        errorHandler(res, e)
      }
    } else { // Если пользователь не был найден в БД
      res.status(404).json({
        message: 'Пользователь не существует'
      })
    }
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.edit = async (req,res) =>{
  try {
    const userInDataBases = await User.findOne({_id: req.user.id}) // Проверка пользователя на нахождение в БД


    if (userInDataBases) {
      const warehouseId = req.body.warehouseId // Обращаемся к ключу в теле запроса, который содержит id склада
      const productId = req.body.productId // Обращаемся к ключу в теле запроса, который содержит данные о новом товаре
      const editProduct = req.body.editProduct // Обращаемся к ключу в теле запроса, который содержит данные о новом товаре
      try {

        const editedProduct = {
          _id: productId,
          checked: false,
          ...editProduct
        }


        await Warehouses.updateOne({_id: warehouseId},
          {
                  $pull: {
                    products: {
                      _id: productId}
                  }
          })
        await Warehouses.updateOne({_id: warehouseId},
          {
                  $push: {
                    products: {...editedProduct}
                  }
          })

        const updatedUser = await User.findOne({_id: req.user.id}).populate('warehouses') // Запрашиваем обновленные данные

        res.status(200).json(updatedUser) // Отдаем пользователю обновленные данные
      } catch (e) {
        errorHandler(res, e)
      }
    } else { // Если пользователь не был найден в БД
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
      const warehouseIdIn = req.body.warehouseIdIn
      const warehouseIdFrom = req.body.warehouseIdFrom
      const moveProducts = req.body.moveProducts
      const newPayment = req.body.newPayment
      const newShipping = req.body.newShipping


      try {
        const warehouse = await Warehouses.findOne({_id: warehouseIdFrom})


        const transformationOldProducts = warehouse.products.map( wp => { // Получение продуктов id которых совпадает с переданными от пользователя
          return moveProducts.map(mp => {
            if (wp._id == mp) return {
              ...wp._doc,
              payment: newPayment, // Изменение метода оплаты
              five: newShipping // Изменение способа доставки
            }
          })
        })
        const newProducts = transformationOldProducts.flat().filter(el=> el !== undefined)  // Разворачиваем вложенные массивы и убираем undefined




        const warehouseFrom = await Warehouses.findOne({_id: warehouseIdFrom }) // Данные о складе откуда нужно перенести продукты
        const warehouseIn = await Warehouses.findOne({_id: warehouseIdIn }) // Данные о складе куда нужно перенести продукты

        await Warehouses.updateOne(
          {
            _id: warehouseIdFrom, // Находим склад откуда нужно забрать продукты
            userId: req.user.id
          },
          {
            $pull: {
              products: {
                _id: {$in: moveProducts} // Удаляем продукты
              }
            },
          $set: {
              two: Number(warehouseFrom.two) - Number(moveProducts.length) // Изменение счетчика кол-ва продуктов
            }
          }
        )

        await Warehouses.updateOne(
          {
            _id: warehouseIdIn,  // Находим склад куда нужно переместить продукты
            userId: req.user.id
          },
          {
            $set: {
              two: Number(warehouseIn.two) + Number(moveProducts.length),
              products: [...warehouseIn.products, ...newProducts] // Добавление продуктов в новый склад
            }
          }
        )

        const updatedUser = await User.findOne({_id: req.user.id}).populate('warehouses') // Запрашиваем обновленные данные
        res.status(200).json(updatedUser) // Отдаем пользователю обновленные данные
      } catch (e) {
        errorHandler(res, e)
      }
    } else { // Если пользователь не был найден в БД
      res.status(404).json({
        message: 'Пользователь не существует'
      })
    }
  } catch (error) {
    errorHandler(res, error)
  }
}