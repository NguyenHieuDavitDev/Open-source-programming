const express = require('express');
const { fetchProvinces, fetchPlates } = require('../controllers/platesController');
const router = express.Router();

router.get('/provinces', fetchProvinces);
router.get('/plates/:provinceId', fetchPlates);

module.exports = router;
