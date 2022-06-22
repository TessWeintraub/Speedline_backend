const express = require('express')
const router = express.Router()
const controller = require('../controllers/warehouses')


router.post('/create', controller.create)

router.post('/remove', controller.remove)


module.exports = router