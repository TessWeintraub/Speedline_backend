const express = require('express')
const router = express.Router()
const controller = require('../controllers/warehouses')
const passport = require("passport");


router.post('/create', passport.authenticate('jwt',{session: false}),  controller.create)
router.post('/edit', passport.authenticate('jwt',{session: false}),  controller.edit)
router.post('/remove', passport.authenticate('jwt',{session: false}),  controller.remove)


module.exports = router