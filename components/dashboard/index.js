const express = require('express');
const router = express.Router();

const controller = require('./dashboardController');

/* GET home page. */
router.get('/', controller.dashboard);
router.get('/dashboard', controller.dashboard);

module.exports = router;
