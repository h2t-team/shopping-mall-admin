var express = require('express');
var router = express.Router();

/* GET add product page. */
router.get('/', function(req, res, next) {
    res.render('addProduct', { title: 'Add Product' });
});

module.exports = router;
