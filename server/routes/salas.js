'use strict';

const express = require('express');
const router = express.Router();
const reservasService = require('../services/reservas-service');

/**
 * @swagger
 * /salas:
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
 *                 $ref: '#/components/schemas/salas'
 */

router.get('/', function (req, res) {
    reservasService.getAllSalas((err, salas) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } else if (salas.length == 0){
            	res.status(204).send({
                    msg: "No existen salas"
                });
            } else {
                res.status(200).send(salas);
            }
        }
    );
});

module.exports = router;
