const bcrypt = require('bcrypt');
const adminService = require('./adminService');


module.exports = {
    list: async(req, res) => {
        try {
            //get request params
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? Number(req.query.page) : 1;

            //get admin list and page count
            const admins = await adminService.list(page - 1);
            const maxPage = Math.floor((admins.count.length - 1) / 8) + 1;

            res.render('ad/admins', { title: 'Admins', admins: admins.rows, currentPage: page, maxPage });
        } catch (err) {
            console.log(err.message);
        }
    },
    search: async(req, res) => {
        try {
            //get request params
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? Number(req.query.page) : 1;
            const search = req.query.keyword;
            //get admin and page count
            const admins = search ? await adminService.findName(search, page - 1) : await adminService.list(page - 1);
            const maxPage = Math.floor((admins.count.length - 1) / 8) + 1;

            res.render('ad/admins', { title: 'Admins', admins: admins.rows, currentPage: page, maxPage, search });
        } catch (err) {
            console.log(err.message);
        }
    },
    addAdminPage: async(req, res) => {
        try {
            res.render('ad/addadmin', { title: 'Add Admin' });
        } catch (err) {
            console.log(err.message);
        }
    },
    addAdminForm: async(req, res) => {
        try {
            console.log(req.body);
            const { firstName, lastName, username, password, email, telephone } = req.body;
            // const takenUsername = await adminService.findUsername(username);
            // if (takenUsername) {
            //     duplicate
            // } else {
            // const hashPassword = await bcrypt.hash(password, 10);
            await adminService.addAdmin(firstName, lastName, username, password, email, telephone);
            res.redirect('/admins');
            // }
        } catch (err) {
            console.log(err.message);
            //duplicate username
            //res.render('ad/addadmin', { title: 'Add Admin', errorCode:2 });
        }
    },
    updateAdminPage: async(req, res) => {
        try {
            const id = req.params.adminId;
            const admin = await adminService.findAdminById(id);
            res.render('ad/updateadmin', { title: 'Update Admin', admin });
        } catch (err) {
            console.log(err.message);
        }
    },
    updateAdminForm: async(req, res) => {
        try {
            const { id, firstName, lastName, email, telephone } = req.body
            await adminService.updateAdmin(id, firstName, lastName, email, telephone);
            res.redirect('/admins');
        } catch (err) {
            console.log(err.message);
        }
    },
    removeAdmin: async(req, res) => {
        try {
            const { id } = req.body;
            await adminService.removeAdmin(id);
            res.status(200).send({ message: "Success" });
        } catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Failed to remove" });
        }
    }
}