var express = require('express');
var router = express.Router();
var debug = require('debug')('nadia:debug')
const db = require('sqlite');

/* GET debug listing. */
router.get('/', function(req, res, next) {
  db.all('SELECT * FROM Reservation')
    .then((reservations) => {
      debug(reservations);
      res.send(reservations)
    })
});

module.exports = router;
