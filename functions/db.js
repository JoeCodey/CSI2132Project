/**
 * Created by ericdufresne on 2017-03-20.
 */

module.exports = function (stmnt, params, cb) {
    var pool = require('../bin/www').pool;
    pool.connect(function (err, client, done) {
        if (err){
            cb(err);
            return console.error(err);
        }
        client.query(stmnt, params, function (err, results) {
            done();
            if (err){
                cb(err);
                return console.error(err);
            }
            cb(null, results.rows);
            return results.rows;
        });
    });
    pool.on('error', function (err, client) {
        console.error('Idle client error', client);
    });
};