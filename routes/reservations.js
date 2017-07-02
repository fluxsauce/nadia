var express = require('express');
var router = express.Router();
var debug = require('debug')('nadia:reservations')
const db = require('sqlite');

/* GET reservations listing. */
router.get('/', function(req, res, next) {
  res.render('reservations', { title: 'Reservations – Nadia\'s Garden' });
});

router.post('/', function(req, res, next) {
  const values = [
    'July 3 2017 05BUG0pm',
    3,
    'NAME',
    'username@example.com',
    '555 555 5555',
    'yay'
  ]
  db.run('INSERT INTO Reservation (datetime, party, name, email, phone, message) VALUES (?, ?, ?, ?, ?, ?)', values)
    .then(debug(values))
    .then(res.send('respond with a resource'))
    .catch(err => {
      debug(err);
      res.status(400).send(err.message)
    }
    )
});

module.exports = router;
