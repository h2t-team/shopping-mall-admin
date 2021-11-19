const express = require('express');
const router = express.Router();

const orderController = require('./orderController');

/* GET orders page. */
router.get('/', orderController.list);

router.get('/invoice', orderController.invoice);

module.exports = router;
