/**
 * Created by ericdufresne on 2017-03-23.
 */
var express = require('express');
var router = express.Router();
var db = require('../functions/db');
var query = require('../functions/query');

router.post('/meal-requests', function (req, res) {
  if (!req.body){
    res.status(400).json({'Error': '400 Bad Request. POST request must have body'});
  }
  else if (!req.body.userId){
    res.status(400).json({'Error': '400 Bad Request. userId is required in body'});
  }
  else if (!req.body.items){
    res.status(400).json({'Error': '400 Bad Request. items is required in body'});
  }
  else if (req.body.items.length === 0){
    res.status(400).json({'Error': '400 Bad Request. Items must have at least one item'});
  }
  else{
    var params = [req.body.userId];
    db('INSERT INTO "Project".meal_request (requester_id) VALUES ($1) RETURNING order_num', params, function (err, results) {
      if (err){
        res.status(500).json(err);
        throw err;
      }
      else{
        var items = req.body.items;
        for (var i in items){
          if (items.hasOwnProperty(i)){
            var item = items[0];
            item.order_num = results[0].order_num;
            item.meal_id = item.id;
          }
        }
        var keySet = ['count', 'meal_id', 'order_num'];
        var q = query.tuples('Project', 'request_contains', items, keySet);
        console.log(q.query);
        console.log(q.params);
        db(q.query, q.params, function (err) {
          if(err){
            res.status(500).json(err);
            throw err;
          }
          else{
            res.status(201).json({'Message': 'Created'});
          }
        });
      }
    });
  }
});
router.get('/meal-requests', function (req, res) {
    var query =
        'SELECT r.order_num, m.name, description, cuisine, u.name as requested_by, r.active, c.count ' +
        'FROM "Project".meal as m, "Project".meal_request as r, "Project".db_user as u, "Project".request_contains as c ' +
        'WHERE r.order_num = c.order_num AND c.meal_id = m.id AND r.requester_id = u.id';
    db(query, [], function (err, results) {
        if (err){
            res.status(500).json(err);
        }
        else if (results[0]){

            res.status(200).json(results);
        }
        else{
            res.status(404).json({'Error': '404: Not Found'});
        }
    });
});
router.get('/meal-requests/:id', function (req, res) {
    var query =
        'SELECT r.order_num, m.name, description, cuisine, u.name as requested_by ' +
        'FROM "Project".meal as m, "Project".meal_request as r, "Project".db_user as u "Project".request_contains as c ' +
        'WHERE r.order_num = c.order_num AND c.meal_id = m.id AND r.requester_id = u.id AND r.order_num = $1';
    db(query, [req.params.id], function (err, results) {
        if (err){
            res.status(500).json(err);
        }
        else if (results[0]){
            var mealRequest = results[0];
            var query = 'SELECT ifor.count as count_needed, f.name, f.category_name, f.price_per_item, f.num_of_items as count_available ' +
                'FROM food as f, meal_request as r, meal as m, ingredient_for ifor "Project".request_contains as c ' +
                'WHERE r.order_num = c.order_num AND f.id = ifor.food_id AND ifor.meal_id = m.id AND c.meal_id = m.id AND r.order_num = $1';
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

router.put('/meal-requests/:id', function (req, res) {
  var query = 'UPDATE "Project".meal_request SET ACTIVE = false WHERE order_num = $1';
  db(query, [req.body.order_num], function (err) {
    if (err){
      res.status(500).json(err);
    }
    else{
      res.status(200).json({'Message': 'Updated. Meal Request deactivated'});
    }
  })
});

module.exports = router;
