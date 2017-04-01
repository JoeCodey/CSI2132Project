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
    db('SELECT io.id, io.approved, u.name, (SELECT SUM(oc.count*f.price_per_item) FROM "Project".order_contains as oc, "Project".food as f WHERE io.id=oc.order_id AND oc.food_id=f.id) as price FROM "Project".ingredient_order as io, "Project".db_user as u WHERE u.id=io.requester_id', [], function (err, results) {
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(results);
        }
    })
});

router.get('/ingredient-orders/:id', function (req, res) {
    db('SELECT io.id, io.approved, (SELECT u2.name FROM "Project".db_user as u2 WHERE u2.id=io.approved_by_id) as approved_by_name, u.name as requester_name FROM "Project".ingredient_order as io, "Project".db_user as u WHERE io.requester_id=u.id AND io.ID = $1', [req.params.id], function (err, results) {
        if(err){
            res.status(500).json(err);
        }
        else if (results[0]){
            var query = 'SELECT f.name, o.count as count_required, f.price_per_item FROM "Project".order_contains as o, "Project".food as f WHERE f.id = o.food_id AND o.order_id = $1';
            db(query, [req.params.id], function (req, results2) {
                if (err){
                    res.status(500).json(err);
                }
                else{
                    var result = results[0];
                    result.ingredients = results2;
                    res.status(200).json(result);
                }
            });
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

router.put('/ingredient-orders/:id', function(req, res) {
  var query = 'UPDATE "Project".ingredient_order SET approved = true, approved_by_id=$2 WHERE id = $1';
  db(query, [req.body.order_id, req.body.approved_by_id], function (err) {
    if (err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json({'Message': 'Updated. Ingredient Order approved.'});
    }
  })
});

module.exports = router;
