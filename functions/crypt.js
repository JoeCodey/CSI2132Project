/**
 * Created by ericdufresne on 2017-03-24.
 */
var bcrypt = require('bcryptjs');

exports.hash = function (password, done) {
    var salt = bcrypt.genSalt(10, function (err, salt) {
        if (err){
            done(err);
        }
        else{
            console.log(password);
            bcrypt.hash(password, salt, function (err, hash) {
                if(err){
                    done(err);
                }
                else{
                    done(null, hash);
                }
            });
        }
    });

};

exports.compare = function (hash, password, done) {
    bcrypt.compare(password, hash, function (err, isMatch) {
        if (err){
            done(err);
        }
        else{
            done(null, isMatch);
        }
    });

};