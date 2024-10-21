const express = require('express')
const uploadController = require('../Controllers/fileController');

const router = express.Router();

router.post('/upload',uploadController.uploadFile);

module.exports = router;