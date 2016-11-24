//var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../user.model');
const config = require('../../../config/index');

module.exports = function(passport){

    /**
     * Local Strategy for signing up
     */
    //options
    const signupOptions = {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    };
    // the Strategy
    passport.use('local-signup', new LocalStrategy(signupOptions, function(req, email, password, done){
        process.nextTick(function(){
            
            User.findOne({ 'email': email }, function(err, user){
                if(err){
                    return done(err);
                }

                if(user){
                    return done(null, false, { error: 'email already in use' });
                }

                var newUser = new User();
                newUser.email = email;
                newUser.password = password;
                newUser.name = req.body.name;

                newUser.save(function(err){
                    if(err){
                        throw err;
                    }

                    return done(null, newUser);
                });
            });
        });
    }));


    /**
     *  Local Strategy for login
     */
    //options
    const loginOptions = {
        usernameField: 'email',
        passwordField: 'password'
    };
    // the Strategy
    passport.use('local-login', new LocalStrategy(loginOptions, function(email, password, done){
        User.findOne({ 'email': email}, function(err, user){
            if(err){
                return done(err);
            }

            if(!user){
                return done(null, false, { error: 'No user found'});
            }

            user.comparePasswords(password, function(err, isMatch){
                if(err){
                    return done(err);
                }

                if(!isMatch){
                    return done(null, false, { error: 'password is wrong'});
                }

                return done(null, user);
            });
        });
    }));


    /**
     * JWT Strategy
     */
    // jwt options
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.secret
    };
    // the Strategy
    passport.use('jwt', new JwtStrategy(jwtOptions, function(payload, done){
        console.log(payload);
        User.findById(payload._id, function(err, user){
            if(err){
                return done(err);
            }

            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));


}