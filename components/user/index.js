const express = require('express');
const router = express.Router();

const userController = require('./userController');

/* GET users page. */
router.get('/', userController.list);

// lock user
router.post('/lockuser', userController.lockUser);

module.exports = router;
