const express = require('express');
const router = express.Router();
const { createRequest, getRequests, updateRequest, deleteRequest } = require('../controllers/solicitudes.controllers');

router.post('/', createRequest);
router.get('/', getRequests);
router.put('/:id', updateRequest);
router.delete('/:id', deleteRequest);


module.exports = router;