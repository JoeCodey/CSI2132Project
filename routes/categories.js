/**
 * Created by ericdufresne on 2017-03-23.
 */
var express = require('express');
var router = express.Router();
var db = require('../functions/db');
var query = require('../functions/query');

router.post('/categories', function (req, res) {
    var params = [req.body.category_name];
    db('INSERT INTO "Project".category (category_name) VALUES ($1)', params, function (err) {
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(21).json({'Message': 'Created'});
        }
    });
});
router.get('/categories', function (req, res) {
    db('SELECT * FROM "Project".category', [], function (err, results) {
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(results);
        }
    });
});
router.get('/categories/:id', function (req, res) {
    db('SELECT * FROM "Project".category WHERE ID = $1', [req.params.id], function (err, results) {
        if(err){
            res.status(500).json(err);
        }
        else if (results[0]){
            res.status(200).json(results[0]);
        }
        else{
            res.status(404).json({'Error': '404: Not Found'});
        }
    });
});
router.delete('/categories/:id', function (req, res) {
    db('DELETE FROM "Project".category WHERE ID = $1', [req.params.id], function (err, results) {
        if (err){
            res.status(500).json(results);
        }
        else{
            res.status(204).end();
        }
    });
});

module.exports = router;