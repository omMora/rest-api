'use strict';

module.exports = function(app){

    app.get('/', function(req, res){
        res.json({
            message: 'hello from rest api'
        });
    });

    app.use('/api/users', require('./api/users'));

    //app.use('/api/jokes', require('./api/jokes'));
}