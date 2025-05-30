const express = require('express');
const router = express.Router();
const { addService, updateService } = require('../controllers/servicios.controllers');

router.post('/solicitudes/:id/servicios', addService);

router.put('/:id', updateService);

module.exports = router;
