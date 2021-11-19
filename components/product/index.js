const express = require('express');
const router = express.Router();

const productController = require('./productController');

/* GET add product page. */

router.get('/', productController.list);
router.get('/addproduct', productController.addProduct);

module.exports = router;