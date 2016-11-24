'use strict';

var express = require('express');
var router = express.Router();
var userService = require('./user.service');



router.post('/register', userService.register);

router.post('/login', userService.login);

router.get('/', userService.isAuth, userService.getAll);

module.exports = router;