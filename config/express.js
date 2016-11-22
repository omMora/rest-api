'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');

module.exports = function(app){
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    require('../api/users/local/passport')(passport);

}