/**
 * Created by ericdufresne on 2017-03-23.
 */
var express = require('express');
var router = express.Router();
var db = require('../functions/db');
var query = require('../functions/query');

router.post('/meals/:mealId/ingredients/:foodId', function (req, res) {
    var params;
    var query;
    if(req.body.count){
        params = [req.params.mealId, req.params.foodId, req.body.count];
        query = 'INSERT INTO "Project".ingredient_for (meal_id, food_id, count) VALUES ($1, $2, $3)'
    }
    else{
        params = [req.params.mealId, req.params.foodId];
        query = 'INSERT INTO "Project".ingredient_for (meal_id, food_id) VALUES ($1, $2)'
    }
    db(query, params, function (err) {
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(201).json({'Message': 'Created'});
        }
    });
});

router.delete('/meals/:mealId/ingreients/:foodId', function (req, res) {
    var params = [req.params.mealId, req.params.foodId];
    db('DELETE FROM "Project".ingredient_for WHERE meal_id = $1 AND food_id = $2', params, function (err) {
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(204).end();
        }
    });
});

module.exports = router;