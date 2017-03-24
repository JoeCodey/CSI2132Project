/**
 * Created by ericdufresne on 2017-03-23.
 */
var express = require('express');
var router = express.Router();
var db = require('../functions/db');
var query = require('../functions/query');

router.post('/meals/:id/meal-requests', function (req, res) {
    var params = [req.params.id, req.params.userId];
    db('INSERT INTO "Project".meal_request (meal_id, requester_id) VALUES ($1, $2)', params, function (err, res) {
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(201).json({'Message': 'Created'});
        }
    });
});

router.delete('/meals/meal-requests/:id', function (req, res) {
    db('DELETE FROM "Project".meal_request WHERE ID = $1', [req.paramsi.id], function (err) {
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(204).end();
        }
    });
});

module.exports = router;