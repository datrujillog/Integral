const express = require('express');
const router = express.Router();
const { createRequest, listRequests } = require('../controllers/solicitudes.controllers');

router.post('/', createRequest);
router.get('/', listRequests);

module.exports = router;