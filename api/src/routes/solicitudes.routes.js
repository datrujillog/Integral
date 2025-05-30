const express = require('express');
const router = express.Router();
const { createRequest, getRequests, updateRequest, deleteRequest, getRequestById } = require('../controllers/solicitudes.controllers');
const { addService } = require('../controllers/servicios.controllers');

router.post('/', createRequest);
router.get('/', getRequests);
router.put('/:id', updateRequest);
router.delete('/:id', deleteRequest);
router.get('/:id', getRequestById);


// servicios

router.post('/:id/servicios', addService);


module.exports = router;