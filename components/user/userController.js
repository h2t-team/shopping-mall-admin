const userService = require('./userService');

module.exports = {
    list: async (req, res) => {
        try {
            console.log(req.query)
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? Number(req.query.page) : 1;
            const url = req.url;
            const keyword = req.query.keyword;

            //get user list and page count
            const users = keyword ? await userService.search(keyword, page - 1) : await userService.list(page - 1);
            const maxPage = Math.floor((users.count - 1) / 8) + 1;

            // render list
            res.render('user/users', { title: 'Users' , users: users.rows, currentPage: page, maxPage, url, keyword});
        } catch (err) {
            console.log(err.message);
            res.status(500).json({
                err: err.message
            });
        }
    },
    search: async (req, res) => {
        try {
            
        } 
        catch (err) {
            res.status(500).json({
                err: err.message
            });
        }
    }
}