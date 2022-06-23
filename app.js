const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const keys = require('./config/keys')
const authRoutes = require('./routes/auth')
const warehousesRoutes = require('./routes/warehouses')
const productsRoutes = require('./routes/products')
const mongoose = require("mongoose");
const passport = require("passport")


mongoose.connect(keys.mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(()=> {console.log('MongoDB connected')})
  .catch( error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth',authRoutes)
app.use('/api/warehouses',warehousesRoutes)
app.use('/api/products',productsRoutes)



module.exports = app