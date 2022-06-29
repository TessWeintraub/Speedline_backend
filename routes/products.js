const express = require('express')
const router = express.Router()
const passport = require('passport')
const controller = require('../controllers/products')


router.post('/create', passport.authenticate('jwt',{session: false}), controller.create)

router.post('/remove', passport.authenticate('jwt',{session: false}), controller.remove)

router.post('/move', passport.authenticate('jwt',{session: false}), controller.move)

router.post('/edit', passport.authenticate('jwt',{session: false}), controller.edit)

module.exports = router