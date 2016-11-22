'use strict';

var express = require('express');
var router = express.Router();
var userService = require('./user.service');

router.get('/', userService.getAll);

router.post('/register', userService.register);

module.exports = router;