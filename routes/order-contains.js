/**
 * Created by ericdufresne on 2017-03-23.
 */
var express = require('express');
var router = express.Router();
var db = require('../functions/db');
var query = require('../functions/query');

router.post('/ingredient-orders/:orderId/ingredients/:foodId', function (req, res) {
    var query;
    var params;
    if (req.body.count){
        query = 'INSERT INTO "Project".order_contains (order_id, food_id, count) VALUES ($1, $2, $3)';
        params = [req.params.orderId, req.params.foodId, req.body.count];
    }
    else{
        query = 'INSERT INTO "Project".order_contains (order_id, food_id) VALUES ($1, $2)';
        params = [req.params.orderId, req.params.foodId];
    }
    db(query, params, function (err) {
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(201).json({'Message': 'Created'});
        }
    })
});
router.delete('/ingredient-orders/:orderId/ingredients/:foodId', function (req, res) {
    var params = [req.params.orderId, req.params.foodId];
    db('DELETE FROM ORDER_CONTAINS WHERE order_id = $1 AND food_id = $2', params, function (err) {
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(204).end();
        }
    });
});

module.exports = router;