const express = require('express');
const router = express.Router();
const { createRequest } = require('../controllers/solicitudes.controllers');

router.post('/', createRequest);

module.exports = router;