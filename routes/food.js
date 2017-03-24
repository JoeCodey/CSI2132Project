/**
 * Created by ericdufresne on 2017-03-23.
 */
var express = require('express');
var router = express.Router();
var db = require('../functions/db');
var query = require('../functions/query');

router.post('/food', function (req, res) {
    var q = query.insert('Project', 'food', req.body);
    db(q.query, q.params, function (err) {
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(201).json({'Message': 'Created'});
        }
    });
});

router.get('/food', function (req, res) {
    db('SELECT * FROM "Project".food', [], function (err, results) {
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(results);
        }
    });
});

router.get('/food/:id', function (req, res) {
    db('SELECT * FROM "Project".food WHERE ID = $1', [req.params.id], function (err, results) {
        if(err){
            res.status(500).json(err);
        }
        else if (results[0]){
            res.status(200).json(results[0]);
        }
        else{
            res.status(404).json({'Error': '404 Not Found'});
        }
    });
});

router.put('/food/:id', function (req, res) {
    var q = query.update('Project', 'food', req.body, req.params.id);
    db(q.query, q.params, function (err) {
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json({'Message': 'Updated'});
        }
    });
});

router.delete('/food/:id', function (req, res) {
    db('DELETE FROM "Project".food WHERE ID = $1', [req.params.id], function (err) {
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(204).end();
        }
    });
});

module.exports = router;