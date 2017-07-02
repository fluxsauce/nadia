var express = require('express');
var router = express.Router();
var debug = require('debug')('nadia:reservations')
const db = require('sqlite');
let _ = require('lodash');
var moment = require('moment');

router.get('/', function(req, res, next) {
  res.render('reservations');
});

router.post('/', function(req, res, next) {
  const submission = _.pick(req.body, [ 'party', 'name', 'email', 'phone', 'message']);
  submission.datetime = moment(`${req.body.date} ${req.body.time}`, 'YYYY/MM/DD H:mm A').toString();;
  
  debug(submission);
  
  const columns = _.keys(submission);
  const values = _.values(submission);
  const placeholders = Array(values.length).fill('?')

  const sql = `INSERT INTO Reservation (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`
  
  db.run(sql, values)
    .then(() => {
      res.render('reservations', {
        success: true,
      });
    })
    .catch(err => {
      debug(err);
      res.status(400).render('reservations', {
        errors: [
          { msg: err }
        ],
        success: false,
        submission: req.body
      });
    }
    )
});

module.exports = router;
