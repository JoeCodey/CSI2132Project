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
    if (err) {
      res.status(500).json(err);
    }
    else {
      res.status(201).json({'Message': 'Created'});
    }
  });
});
router.put('/food/checkout', function (req, res) {
  var checkoutItems = req.body.items;
  if (!checkoutItems) {
    res.status(400).json({'Error': 'No checkout items completed'});
    return;
  }
  if (checkoutItems.length == 0) {
    res.status(400).json({'Error': 'No checkout items completed'});
  }
  var ids = [];
  for (var i in checkoutItems) {
    if (checkoutItems.hasOwnProperty(i)) {
      var checkoutItem = checkoutItems[i];
      ids.push(checkoutItem.id);
    }
  }
  var q = query.selectIn('Project', 'food', ids);
  console.log(q.query);
  console.log(q.params);
  if (!q) {
    res.status(400).json({'Error': 'Ids do not contain all numbers', sample: ids});
    return;
  }
  /**
   * Done to check if items actually exist. This makes sure that multiple clients competing for the same
   * food will not break the system
   **/
  db(q.query, q.params, function (err, results) {
    if (err) {
      res.status(500).json(err);
    }
    else {
      var missingItems = [];
      for (var i in results){
        if(results.hasOwnProperty(i)){
          var result = results[i];
          for (var j in checkoutItems){

            var found = false;
            if (checkoutItems.hasOwnProperty(j)){

              var item = checkoutItems[j];
              if (item.id == result.id){
                found = true;
                break;
              }
            }
          }
          if (!found){
            missingItems.push(result);
          }
        }
      }

      if (missingItems.length == 0){

        for (var i in checkoutItems){
          if (checkoutItems.hasOwnProperty(i)){
            var checkoutItem = checkoutItems[i];
            db('UPDATE "Project".food SET num_of_items = num_of_items - $1 WHERE ID = $2', [checkoutItem.count, checkoutItem.id], function (err) {
            });
          }
        }
        res.status(204).end();
      }
      else{
        res.status(404).json({'Error': 'Missing Items', items: missingItems});
      }
    }
  })
});

router.get('/food', function (req, res) {

  if (req.query.ignoreNone) {
    db('SELECT * FROM "Project".food', [], function (err, results) {
      if (err) {
        res.status(500).json(err);
      }
      else {
        res.status(200).json(results);
      }
    });
  }
  else {
    db('SELECT * FROM "Project".food WHERE num_of_items > 0', [], function (err, results) {
      if (err) {
        res.status(500).json(err);
      }
      else {
        res.status(200).json(results);
      }
    })
  }

});

router.get('/food/:id', function (req, res) {
  db('SELECT * FROM "Project".food WHERE ID = $1', [req.params.id], function (err, results) {
    if (err) {
      res.status(500).json(err);
    }
    else if (results[0]) {
      res.status(200).json(results[0]);
    }
    else {
      res.status(404).json({'Error': '404 Not Found'});
    }
  });
});

router.put('/food/:id', function (req, res) {
  var q = query.update('Project', 'food', req.body, req.params.id);
  db(q.query, q.params, function (err) {
    if (err) {
      res.status(500).json(err);
    }
    else {
      res.status(200).json({'Message': 'Updated'});
    }
  });
});

router.delete('/food/:id', function (req, res) {
  db('DELETE FROM "Project".food WHERE ID = $1', [req.params.id], function (err) {
    if (err) {
      res.status(500).json(err);
    }
    else {
      res.status(204).end();
    }
  });
});

module.exports = router;
