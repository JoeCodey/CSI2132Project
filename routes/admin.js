/**
 * Created by ericdufresne on 2017-03-29.
 */
var express = require('express');
var router = express.Router();
var db = require('../functions/db');
var query = require('../functions/query');

router.get('/api/admin/most-expensive-meal', function (req, res) {
  var query = 'SELECT id, name, cuisine, description, ' +
                '(SELECT SUM(f.price_per_item * ifor.count) ' +
                  'FROM "Project".ingredient_for as ifor, "Project".food as f ' +
                  'WHERE f.id = ifor.food_id AND ifor.meal_id = m.id) as price ' +
                'FROM "Project".meal as m ORDER BY price DESC LIMIT 1';

  db(query, [], function (err, results) {
    if (err){
      res.status(500).json(err);
    }
    else if (results[0]){
      res.status(200).json(results);
    }
    else{
      res.status(204).end();
    }
  });
});

router.get('/api/admin/top-3-used', function (req, res) {
  var query = 'SELECT id, name, category_name, (SELECT SUM(count) FROM "Project".ingredient_for as ifor WHERE ifor.food_id = f.id) as frequency FROM "Project".food as f order by frequency limit 3 ';
  db(query, [], function (err, results) {
    if (err){
      res.status(500).json(err);
    }
    else if (results.length != 0){
      res.status(200).json(results);
    }
    else{
      res.status(204).end();
    }
  });
});

module.exports = router;
