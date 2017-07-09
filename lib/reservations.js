const _ = require('lodash');
const db = require('sqlite');
const debug = require('debug')('nadia:lib:reservations');

/**
 * Get all reservations.
 *
 * @return {Promise} Result of SQL execution.
 */
function getAll() {
  return db.all('SELECT * FROM Reservation');
}

/**
 * Save a reservation.
 *
 * @param  {Reservation} reservation A reservation request.
 * @return {Promise} Result of SQL execution.
 */
function save(reservation) {
  const sql = 'INSERT INTO RESERVATION (datetime, party, name, email, phone, message) ' +
    'VALUES (?, ?, ?, ?, ?, ?) ';
  const values = [
    reservation.datetime,
    reservation.party,
    reservation.name,
    reservation.email,
    reservation.phone,
    reservation.message,
  ];

  debug(`Saving ${values}`);

  return db.run(sql, values);
}

/**
 * Validate a reservation.
 *
 * @param  {Reservation} reservation A reservation request.
 * @return {Promise} Normalized result.
 */
function validate(reservation) {
  return new Promise((resolve, reject) => {
    reservation.validator((error, value) => {
      if (_.isNull(error)) {
        return resolve(value);
      }
      return reject(error);
    });
  });
}

module.exports = {
  getAll,
  save,
  validate
}
