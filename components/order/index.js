const express = require('express');
const router = express.Router();

const orderController = require('./orderController');

// get orders search
router.get('/search', orderController.search);

/* GET orders page. */
router.get('/', orderController.list);
router.get('/:orderId', orderController.invoice);



module.exports = router;
