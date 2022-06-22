const express = require('express')
const router = express.Router()
const controller = require('../controllers/products')


router.post('/create', controller.create)

router.post('/remove', controller.remove)

router.post('/move', controller.move)

module.exports = router