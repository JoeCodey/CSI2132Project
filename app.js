var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var db = require('./functions/db');

//var index = require('./routes/index');
var users = require('./routes/users');
var meals = require('./routes/meals');
var categories = require('./routes/categories');
var food = require('./routes/food');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
passport.serializeUser(function (user, done) {
    console.log('Here');
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    db('SELECT * FROM "Project".db_user WHERE ID = $1', [id], function (err, results) {
        if (err){
            throw err;
        }
        console.log('Here');
        done(err, results[0]);
    });
});
var LocalStrategy = new require('passport-local').Strategy;
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, function (username, password, done) {
    console.log('Here');
    var params = [username, password];
    db('SELECT * FROM "Project".db_user WHERE email = $1 AND password = $2', params, function (err, results ) {
        if (err){
            throw err;
        }
        console.log('Here');
        if(results.length == 0){
            return done(null, false, 'User with email password combination not found');
        }
        return done(null, results[0]);
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
