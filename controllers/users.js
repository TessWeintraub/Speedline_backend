const User = require('../models/user')
const errorHandler = require("../utils/errorHandler");


module.exports.users = async (req,res) =>{
  console.log(req.headers)
  try {
    const user = await User.findOne({_id: req.user.id}).populate('warehouses')
    res.status(200).json(user)

  }catch (error){
    errorHandler(res,error)
  }
}