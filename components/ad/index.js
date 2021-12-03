const express = require('express');
const router = express.Router();

const adminController = require('./adminController');

// get admin list
router.get('/', adminController.list);
router.post('/', adminController.removeAdmin);

// get admins search
router.get('/search', adminController.search);

//get add admin page
router.get('/addadmin', adminController.addAdminPage);
router.post('/addadmin', adminController.addAdminForm);

//get update admin page
router.get('/updateadmin/:adminId', adminController.updateAdminPage);
router.post('/updateadmin', adminController.updateAdminForm);

module.exports = router;