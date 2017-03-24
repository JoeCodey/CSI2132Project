var express = require('express');
var router = express.Router();
var db = require('../functions/db');
var query = require('../functions/query');

router.get('/users', function (req, res) {
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

router.post('/users', function (req, res) {
    var params = [req.body.email, req.body.role, req.body.name];
    console.log(params);
    db('INSERT INTO "Project".db_user (email, role, name) VALUES ($1, $2, $3)', params, function (err) {
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(201).json({'Message': 'Created'});
        }
    });
});

router.put('/users/:id', function (req, res) {
    var q = query.update('Project','db_user', req.body, req.params.id);
    db(q.query, q.params, function (err) {
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json({'Message': 'Updated'});
        }
    })
});
router.delete('/users/:id', function (req, res) {
    db('DELETE FROM "Project".db_user WHERE ID = $1', [req.params.id], function (err) {
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(204).end();
        }
    })
});

router.post('/users/auth', function (req, res) {
    db('SELECT * FROM "Project".db_user WHERE username = $1'[req.body.username], function (err, results) {
        if (err){
            res.status(500).json(err);
            return;
        }
        var result = results[0];
        if (!result){
            res.status(403).json({'Error': 'Invalid Email and Password'})
        }
        else{
            res.status(200).json(result);
        }
    });
});


module.exports = router;
