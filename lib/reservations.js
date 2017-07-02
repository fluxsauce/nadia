const _ = require('lodash');
const db = require('sqlite');
const moment = require('moment');
const Joi = require('joi');
const debug = require('debug')('nadia:lib:reservations');

function create(raw) {
  const reservation = _.pick(raw, [ 'party', 'name', 'email', 'phone', 'message']);
  reservation.datetime = _combineDateTime(raw.date, raw.time);
  
  const result = _validate(reservation);
  if (!_.isNull(result.error)) {
    return Promise.reject(result.error);
  }
  
  return _save(result.value);
}

function _save(reservation) {
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
  
  return db.run(sql, values);
}

function _validate(raw) {
  const schema = Joi.object().keys({
    datetime: Joi.date().iso().required().raw(),
    party: Joi.number().min(1).max(7).required(),
    name: Joi.string().max(255).required(),
    email: Joi.string().required(),
    phone: Joi.string().max(50).allow(''),
    message: Joi.string().max(1000).allow(''),
  });
  
  return Joi.validate(raw, schema, { abortEarly: false, stripUnknown: true });
}

function _combineDateTime(date, time) {
  return moment(`${date} ${time}`, 'YYYY/MM/DD H:mm A').toISOString();
}

module.exports = {
  create,
  _save,
  _validate,
  _combineDateTime,
}