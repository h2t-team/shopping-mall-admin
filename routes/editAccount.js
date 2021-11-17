var express = require('express');
var router = express.Router();

/* GET edit account page. */
router.get('/', function(req, res, next) {
    res.render('editAccount', { title: 'Edit Account' });
});

module.exports = router;
