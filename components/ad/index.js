const express = require('express');
const router = express.Router();

const adminController = require('./adminController');

// get admin list
router.get('/', adminController.list);
// get admin detail
router.get('/:adminId', adminController.detail);
// get admins search
router.get('/search', adminController.search);

//get add admin page
router.get('/addadmin', adminController.addAdminPage);
router.post('/addadmin', adminController.addAdminForm);

//get update admin page
router.get('/updateadmin/:adminId', adminController.updateAdminPage);
router.post('/updateadmin', adminController.updateAdminForm);

// lock admin
router.post('/lockadmin', adminController.lockAdmin);

module.exports = router;