const express = require('express')
const uploadController = require('../Controllers/fileController');
const matchScoreController = require('../Controllers/matchScoreController');  // New match score controller
const jobDescriptionController= require('../Controllers/jobDescriptionController')
const router = express.Router();

router.post('/upload',uploadController.uploadFile);
router.post('/generate-match-score', matchScoreController.generateMatchScore);
router.get('/job-descriptions',jobDescriptionController.jobDescriptionMatch)
module.exports = router;