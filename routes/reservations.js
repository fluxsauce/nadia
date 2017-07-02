var express = require('express');
var router = express.Router();
var debug = require('debug')('nadia:route:reservations')
const reservations = require('../lib/reservations');

router.get('/', function(req, res, next) {
  res.render('reservations');
});

router.post('/', function(req, res, next) {  
  reservations
    .create(req.body)
    .then(result => res.render('reservations', {
      success: true,
    }))
    .catch(err => {
      debug(err);
      res.status(400).render('reservations', {
        errors: [
          err.message
        ],
        success: false,
        submission: req.body
      });
    })
});

module.exports = router;
