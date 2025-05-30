const express = require('express');
const router = express.Router();
const { createRequest, getRequests, updateRequest, deleteRequest, getRequestById, obtainRequestServices, procesarSolicitudesPendientes } = require('../controllers/solicitudes.controllers');
const { addService } = require('../controllers/servicios.controllers');

router.post('/', createRequest);
router.get('/', getRequests);
router.put('/:id', updateRequest);
router.delete('/:id', deleteRequest);
router.get('/:id', getRequestById);
router.get('/:id/servicios', obtainRequestServices);

router.post('/procesar-pendientes', procesarSolicitudesPendientes);




// servicios

router.post('/:id/servicios', addService);






// Documentacion de la API

/**
 * @swagger
 * tags:
 *   name: Solicitudes
 *   description: Endpoints para gestión de solicitudes
 */

/**
 * @swagger
 * /api/solicitudes:
 *   get:
 *     summary: Obtener todas las solicitudes con filtros
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *       - in: query
 *         name: cliente
 *         schema:
 *           type: string
 *       - in: query
 *         name: fechaDesde
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: fechaHasta
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de solicitudes
 */

/**
 * @swagger
 * /api/solicitudes:
 *   post:
 *     summary: Crear una nueva solicitud
 *     tags: [Solicitudes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cliente
 *               - emailCliente
 *               - servicios
 *             properties:
 *               cliente:
 *                 type: string
 *               emailCliente:
 *                 type: string
 *               observaciones:
 *                 type: string
 *               servicios:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - nombreServicio
 *                     - fechaReunion
 *                   properties:
 *                     nombreServicio:
 *                       type: string
 *                     fechaReunion:
 *                       type: string
 *                       format: date-time
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 */

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   get:
 *     summary: Obtener una solicitud por ID
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la solicitud
 *       404:
 *         description: No encontrada
 */

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   put:
 *     summary: Actualizar una solicitud
 *     tags: [Solicitudes]
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
 *             properties:
 *               cliente:
 *                 type: string
 *               emailCliente:
 *                 type: string
 *               observaciones:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitud actualizada
 *       403:
 *         description: No se puede modificar
 */

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   delete:
 *     summary: Eliminar una solicitud
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminada
 *       403:
 *         description: No se puede eliminar
 */

/**
 * @swagger
 * /api/solicitudes/{id}/servicios:
 *   get:
 *     summary: Obtener servicios asociados a una solicitud
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de servicios
 */

/**
 * @swagger
 * /api/solicitudes/procesar-pendientes:
 *   post:
 *     summary: Procesar servicios vencidos y cerrar solicitudes completadas
 *     tags: [Solicitudes]
 *     responses:
 *       200:
 *         description: Procesamiento exitoso
 */



module.exports = router;