var express = require('express');
var router = express.Router();
var db = require('../functions/db');

router.get('/users', function (err, res) {
    db('SELECT * FROM "Project".db_user', [], function (err, results) {
      if (err){
          res.status(500).json(err);
      }
      else{
          res.status(200).json(results);
      }
    });
});

router.get('/users/:id', function (req, res) {
    db('SELECT * FROM "Project".db_user WHERE ID = $1', [req.params.id], function (err, results) {
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


module.exports = router;
