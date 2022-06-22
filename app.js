const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const authRoutes = require('./routes/auth')
const warehousesRoutes = require('./routes/warehouses')
const productsRoutes = require('./routes/products')

app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth',authRoutes)
app.use('/api/warehouses',warehousesRoutes)
app.use('/api/products',productsRoutes)



module.exports = app