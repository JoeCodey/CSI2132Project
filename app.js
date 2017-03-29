var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var db = require('./functions/db');
var crypt = require('./functions/crypt');
var cors = require('cors');

//var index = require('./routes/index');
var users = require('./routes/users');
var meals = require('./routes/meals');
var categories = require('./routes/categories');
var food = require('./routes/food');
var uuid4 = require('uuid/v4');

var app = express();
app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    db('SELECT * FROM "Project".db_user WHERE ID = $1', [id], function (err, results) {
        if (err){
            throw err;
        }
        done(err, results[0]);
    });
});
var LocalStrategy = new require('passport-local').Strategy;
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, function (username, password, done) {
    var params = [username];
    db('SELECT * FROM "Project".db_user WHERE email = $1', params, function (err, results ) {
        if (err){
            throw err;
        }
        if(results.length == 0){
            return done(null, false, 'User with email password combination not found');
        }
        var result = results[0];
        crypt.compare(result.password, password, function (err, isMatch) {
            if(err){
                throw err;
            }
            else if (isMatch){
                var params = [uuid4()];
                db('UPDATE "Project".db_user SET session_token = $1', params, function (err) {
                  if(err){
                    throw err;
                  }
                  results[0].session_token = params[0];
                  done(null, results[0]);
                });
            }
            else{
                done(null, false, 'User with email password combination not found');
            }
        });
    });
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'my-secret', saveUninitialized: true, resave: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', users);
app.use('/api', categories);
app.use('/api', meals);
app.use('/api', food);


module.exports = app;
