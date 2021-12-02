const adminService = require('./adminService');


module.exports = {
    list: async(req, res) => {
        try {
            //get request params
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? Number(req.query.page) : 1;

            //get product list, category and page count
            const admins = await adminService.list(page - 1);
            const maxPage = Math.floor((admins.count.length - 1) / 8) + 1;

            res.render('ad/admins', { title: 'Admins', admins: admins.rows, currentPage: page, maxPage });
        } catch (err) {
            console.log(err.message);
        }
    },
}