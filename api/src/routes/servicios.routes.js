const express = require('express');
const router = express.Router();
const { addService, updateService, removeService } = require('../controllers/servicios.controllers');

router.post('/solicitudes/:id/servicios', addService);
router.delete('/:id', removeService);


router.put('/:id', updateService);

module.exports = router;
