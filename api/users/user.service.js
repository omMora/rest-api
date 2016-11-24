'use strict';

var User = require('./user.model');
var passport = require('passport');

exports.register = function(req, res){
    console.log(req.body);
    passport.authenticate('local-signup', function(err, user, info){
        if(err){
            return res.status(500).json(err);
        }

        if(!user){
            return res.status(400).json({ err: info });
        }

        return res.status(201).json({ user: user });
    })(req, res)
};

exports.login = function(req, res){
    console.log(req.body);
    passport.authenticate('local-login', function(err, user, info){
        if(err){
            return res.status(500).json(err);
        }

        if(user){
            var token = user.generateJwt();
            res.status(200).json({ 'token': token });
        } else{
            res.status(401).json(info);
        }
    })(req, res)
};

exports.getAll = function(req, res){
    User.find({}, function(err, users){
        if(err){
            res.status(400).json(err);
        }

        res.status(200).json(users);
    });
};

exports.isAuth = passport.authenticate('jwt', { session: false });