const express = require('express');
const router = express.Router();
const { addService, updateService, removeService } = require('../controllers/servicios.controllers');

router.post('/solicitudes/:id/servicios', addService);
router.delete('/:id', removeService);


router.put('/:id', updateService);

// Documentación de la API

/**
 * @swagger
 * tags:
 *   name: Servicios
 *   description: Endpoints para gestión de servicios individuales
 */

/**
 * @swagger
 * /api/solicitudes/{id}/servicios:
 *   post:
 *     summary: Agregar un servicio a una solicitud
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreServicio
 *               - fechaReunion
 *             properties:
 *               nombreServicio:
 *                 type: string
 *               fechaReunion:
 *                 type: string
 *                 format: date-time
 *               comentarios:
 *                 type: string
 *     responses:
 *       201:
 *         description: Servicio agregado
 */

/**
 * @swagger
 * /api/servicios/{id}:
 *   put:
 *     summary: Actualizar un servicio
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreServicio:
 *                 type: string
 *               fechaReunion:
 *                 type: string
 *                 format: date-time
 *               estadoServicio:
 *                 type: string
 *               comentarios:
 *                 type: string
 *               costoEstimado:
 *                 type: number
 *     responses:
 *       200:
 *         description: Servicio actualizado
 */

/**
 * @swagger
 * /api/servicios/{id}:
 *   delete:
 *     summary: Eliminar un servicio
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminado
 *       403:
 *         description: No se puede eliminar
 */


module.exports = router;
