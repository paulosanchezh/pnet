'use strict';

const MongoClient = require('mongodb').MongoClient;
let db;
const ObjectId = require('mongodb').ObjectId;

function Reservas() {
  this.dbSalas;
}

const express = require('express');
const router = express.Router();
const reservasService = require('./reservas-service');

Reservas.prototype.connectDb = function (callback) {
  MongoClient.connect(
    'mongodb+srv://paulosanchezh:paulosanchezh@psh-pnet-2022-2023.ichc9ea.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, database) {
      if (err) {
        console.log(err);
        callback(err);
        return;
      }

      db = database.db('psh-pnet-2022-2023').collection('reservas');
      this.dbSalas = database.db('psh-pnet-2022-2023').collection('salas');
      console.log('Conexión correcta');

      callback(err, database);
    }.bind(this)
  );
};

Reservas.prototype.add = function (reserva, callback) {
  return db.insertOne(reserva, callback);
};

Reservas.prototype.get = function (_id, callback) {
  return db.find({ _id: ObjectId(_id) }).toArray(callback);
};

Reservas.prototype.getAll = function (callback) {
  return db.find({}).toArray(callback);
};

Reservas.prototype.getAllSalas = function (callback) {
  return this.dbSalas.find({}).toArray(callback);
};

Reservas.prototype.update = function (_id, updatedReserva, callback) {
  delete updatedReserva._id;
  return db.updateOne({ _id: ObjectId(_id) }, { $set: updatedReserva }, callback);
};

Reservas.prototype.remove = function (_id, callback) {
  return db.deleteOne({ _id: ObjectId(_id) }, callback);
};

Reservas.prototype.removeAll = function (callback) {
  return db.deleteMany({}, callback);
};

Reservas.prototype.findById = function (_id) {
  return db.find({ _id: ObjectId(_id) });
};

module.exports = new Reservas();