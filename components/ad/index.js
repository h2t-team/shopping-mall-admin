const express = require('express');
const router = express.Router();

const adminController = require('./adminController');

// get admin list
router.get('/', adminController.list);

module.exports = router;