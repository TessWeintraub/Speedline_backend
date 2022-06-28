const express = require('express')
const router = express.Router()
const passport = require("passport");
const controller = require('../controllers/users')


router.get('/users', passport.authenticate('jwt',{session: false}), controller.users)

module.exports = router