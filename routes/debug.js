var express = require('express');
var router = express.Router();
var debug = require('debug')('nadia:debug')
const db = require('sqlite');
const _ = require('lodash');

/* GET debug listing. */
router.get('/', function(req, res, next) {
  db.all('SELECT * FROM Reservation')
    .then((reservations) => {
      debug(reservations);
      debug(_.keys(reservations[0]));
      res.render('debug', {
        title: 'Requests - Nadia\'s Garden',
        reservations,
        header: _.keys(reservations[0])
      });
    })
});

module.exports = router;
