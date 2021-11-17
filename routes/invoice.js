var express = require('express');
var router = express.Router();

/* GET invoice page. */
router.get('/', function(req, res, next) {
    res.render('invoice', { title: 'Invoice' });
});

module.exports = router;
