const express = require('express');
const router = express.Router();
const { addService } = require('../controllers/servicios.controllers');

router.post('/solicitudes/:id/servicios', addService);

module.exports = router;
