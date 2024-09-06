'use strict';

const express = require('express');
const router = express.Router();
const reservasService = require('../services/reservas-service');

/**
 * @swagger
 * /reservas:
 *   get:
 *     description: Returns all reservations
 *     responses:
 *       200:
 *         description: A list of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/reservas'
 */

router.get('/', function (req, res) {
    reservasService.getAll((err, reservas) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } else if (reservas.length == 0){
            	res.status(204).send({
                    msg: "No existen reservas"
                });
            } else {
                res.status(200).send(reservas);
            }
        }
    );
});

router.get('/:_id', function (req, res) {
    let _id = req.params._id;
    reservasService.get(_id, (err, reserva) => {
            if (err) {
                res.status(500).send({
                	msg: err
            	});
            } else if (reserva.length == 0){
            	res.status(500).send({
                    msg: "No existe esta reserva"
                });
            } else {
                res.status(200).send(reserva);
            }
        }
    );
});

router.post('/', function (req, res) {
    let reserva = req.body;
    if (Object.entries(reserva).length === 0){
        res.status(400).send({
            msg: 'No se ha introducido ningún parámetro'
        });
    }
    else{
        reservasService.add(reserva, (err, reserva) => {
                if (err) {
                    res.status(500).send({
                        msg: err
                    });
                } else{
                    res.status(201).send({
                        msg: 'Reserva Creada'
                    });
                }

            }
        );
    }
});

router.put('/:_id', function (req, res) {
    const _id = req.params._id;
    const updatedReserva = req.body;

    reservasService.update(_id, updatedReserva, (err, numUpdates) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else if (numUpdates.matchedCount === 0){
            res.status(500).send({
                msg: "No existe esta reserva"
            });
        } else if(numUpdates.modifiedCount === 0) {
                res.status(400).send({
                    msg: "No se actualizó ningún parámetro de la reserva"
                });
        } else {
            res.status(201).send({
                msg: 'Reserva actualizada'
            });
        }
        });
});

router.delete('/:_id', function (req, res) {
    let _id = req.params._id;
    reservasService.remove(_id, (err, deletedCount) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else if (deletedCount.deletedCount === 0){
            res.status(500).send({
                msg: "No existe esta reserva"
            });
        } else{
            res.status(200).send({
                msg: 'Reserva eliminada'
            });
        }
    });
});

router.delete('/', function (req, res) {
    reservasService.removeAll((err, reservas) => {
        let conjuntoReservas = reservas.deletedCount;
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } else if (conjuntoReservas === 0){
            	res.status(500).send({
                    msg: 'No hay reservas para eliminar'
                });
            } else {
                res.status(200).send({
                    msg: "Todas las Reservas fueron eliminadas con éxito"
                });
            }
        }
    );
});

module.exports = router;
