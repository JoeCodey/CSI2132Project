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
router.get('/meal-requests', function (req, res) {
    var query =
        'SELECT r.order_num, m.name, description, cuisine, u.name as requested_by ' +
        'FROM meal as m, meal_request as r, db_user as u ' +
        'WHERE r.meal_id = m.id';
    db(query, [req.params.id], function (err, results) {
        if (err){
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
router.get('/meal-requests/:id', function (req, res) {
    var query =
        'SELECT r.order_num, m.name, description, cuisine, u.name as requested_by ' +
        'FROM meal as m, meal_request as r, db_user as u ' +
        'WHERE r.meal_id = m.id and r.order_num = $1';
    db(query, [req.params.id], function (err, results) {
        if (err){
            res.status(500).json(err);
        }
        else if (results[0]){
            var mealRequest = results[0];
            var query = 'SELECT ifor.count, f.name, f.category_name, f.price_per_item ' +
                'FROM food as f, meal_request as r, meal as m, ingredient_for ifor ' +
                'WHERE f.id = ifor.food_id AND ifor.meal_id = m.id AND r.meal_id = m.id AND r.order_num = $1';
            db(query, [req.params.id], function (err, ingredients) {
                if (err){
                    res.status(500).json(err);
                }
                else{
                    mealRequest.mealIngredients = ingredients;
                    res.status(200).json(mealRequest);
                }
            });
        }
        else{
            res.status(404).json({'Error': '404: Not Found'});
        }
    });
});
router.delete('/meal-requests/:id', function (req, res) {
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