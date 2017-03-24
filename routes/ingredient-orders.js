/**
 * Created by ericdufresne on 2017-03-23.
 */
var express = require('express');
var router = express.Router();
var db = require('../functions/db');
var query = require('../functions/query');

router.post('/ingredient-orders', function (req, res) {
    //TODO: Change this to authenticated user
    var q = query.insert('Project', 'ingredient_order', req.body);
    db(q.query, q.params, function (err) {
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(201).json({'Message': 'Created'});
        }
    });
});

router.get('/ingredient-orders', function (req, res) {
    db('SELECT * FROM "Project".ingredient_order', [], function (err, results) {
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(results);
        }
    })
});

router.get('/ingredient-orders/:id', function (req, res) {
    //TODO: Get Order contains for this order
    db('SELECT * FROM "Project".ingredient_order WHERE ID = $1', [req.params.id], function (err, results) {
        if(err){
            res.status(500).json(err);
        }
        else if (results[0]){
            res.status(200).json(results[0]);
        }
        else{
            res.status(404).json({'Error': '404: Not Found'});
        }
    })
});

router.delete('/ingredient-orders/:id', function (req, res) {
    db('DELETE FROM "Project".ingredient_order WHERE ID = $1', [req.params.id], function (err) {
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(204).end();
        }
    });
});

module.exports = router;