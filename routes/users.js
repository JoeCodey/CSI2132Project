var express = require('express');
var router = express.Router();
var db = require('../functions/db');
var query = require('../functions/query');
var passport = require('passport');
var crypt = require('../functions/crypt');

router.post('/signup', function (req, res) {
    if(req.body.email && req.body.name && req.body.password){
        db('SELECT * FROM "Project".db_user WHERE email = $1', [req.body.email], function (err, results) {
            if (err){
                res.status(500).json(err);
            }
            else if(results.length != 0){
                res.status(409).json({'Error': 'Conflicting Email'});
            }
            else{
                crypt.hash(req.body.password, function (err, hash) {
                    if(err){
                        res.status(400).json({'Error': 'Invalid Password'});
                    }
                    else{
                        var params = [req.body.email, hash, req.body.name];
                        db('INSERT INTO "Project".db_user (email, password, name) VALUES ($1, $2, $3)', params, function (err) {
                            if (err){
                                res.status(500).json(err);
                            }
                            else{
                                passport.authenticate('local')(req, res, function () {
                                    console.log('Here');
                                    res.status(201).json(req.user);
                                });
                            }
                        });
                    }

                });

            }
        });
    }
    else{
        res.status(400).json({'Error': 'Missing Required Fields'});
    }
});
router.post('/login', passport.authenticate('local'), function (req, res) {
    if(req.user){
        res.status(200).json(req.user);
    }
    else{
        res.status(401).json({'Message': 'Username or email not found'});
    }
});

router.get('/auth/:token', function (req, res) {
  db('SELECT * FROM "Project".db_user WHERE session_token = $1', [req.params.token], function (err, results) {
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

router.get('/users', function (req, res) {
    db('SELECT id,name,email,role FROM "Project".db_user', [req.params.id], function (err, results) {
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
