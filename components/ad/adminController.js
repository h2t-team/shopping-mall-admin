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
            const maxPage = Math.floor((products.count.length - 1) / 8) + 1;

            res.render('ad/admins', { title: 'Admins', admins: admins.rows, currentPage: page, maxPage, search });
        } catch (err) {
            console.log(err.message);
        }
    },
    addAdminPage: async(req, res) => {
        try {
            res.render('ad/addAdmin', { title: 'Add Admin' });
        } catch (err) {
            console.log(err.message);
        }
    },
    addAdminForm: async(req, res) => {
        try {
            const { firstName, lastName, username, email, telephone } = req.body
            await productService.addProduct(firstName, lastName, username, email, telephone);
        } catch (err) {
            console.log(err.message);
        }
    },
    updateAdminPage: async(req, res) => {
        try {
            const id = req.params.productId;
            const admin = await productService.findProductById(id);
            res.render('ad/updateAdmin', { title: 'Update Admin', admin });
        } catch (err) {
            console.log(err.message);
        }
    },
    updateAdminForm: async(req, res) => {
        try {
            const { id, firstName, lastName, username, email, telephone } = req.body
            await productService.updateProduct(id, firstName, lastName, username, email, telephone);
            res.redirect('/admins');
        } catch (err) {
            console.log(err.message);
        }
    },
    removeAdmin: async(req, res) => {
        try {
            const { id } = req.body;
            await productService.removeAdmin(id);
            res.status(200).send({ message: "Success" });
        } catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Failed to remove" });
        }
    }
}