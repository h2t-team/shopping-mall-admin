const express = require('express');
const router = express.Router();

const productController = require('./productController');

/* GET add product page. */

router.get('/', productController.list);
router.post('/', productController.removeProduct);
router.get('/addproduct', productController.addProductPage);
router.post('/addproduct', productController.addProductForm);


module.exports = router;