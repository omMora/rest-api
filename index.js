'use strict';

var express = require('express');
var config = require('./config');
var mongoose = require('mongoose');

var app = express();

require('./config/express')(app);
require('./routes')(app);

//catch 404 and forward to error handlers
app.use(function(req, res, next){
    res.status(404);
    res.json({
        error: 'Not Found'
    });
    return;
});

//error handlers
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        error: err.message
    });
    return;
});

app.listen(config.port, config.ip, function(){
    console.log('Express server listening on %d ', config.port);
});

//connect to database
mongoose.connect(config.mongo.uri);

module.exports = app;