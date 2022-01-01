const express = require('express');
const router = express.Router();
const categoryController = require('./categoryController');

// get product list
router.get('/', categoryController.list);

// // get products search
// router.get('/search', categoryController.search);

// //get add product page
// router.get('/addproduct', categoryController.addProductPage);
// router.post('/addproduct', categoryController.addProductForm);

// //get update product page
// router.get('/updateproduct/:productId', categoryController.updateProductPage);
// router.post('/updateproduct', categoryController.updateProductForm);

module.exports = router;