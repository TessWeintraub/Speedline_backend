module.exports.create = (req,res) => {
  res.status(200).json({
    login: true
  })
}

module.exports.remove = (req,res) =>{
  res.status(200).json({
    reg: true
  })
}