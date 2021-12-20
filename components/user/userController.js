const userService = require('./userService');

module.exports = {
    list: async(req, res) => {
        try {
            console.log(req.query)
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? Number(req.query.page) : 1;
            const url = req.url;
            const keyword = req.query.keyword;

            //get user list and page count
            const users = keyword ? await userService.search(keyword, page - 1) : await userService.list(page - 1);
            const maxPage = Math.floor((users.count - 1) / 5) + 1;

            // render list
            res.render('user/users', { title: 'Users', users: users.rows, currentPage: page, maxPage, url, keyword });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({
                err: err.message
            });
        }
    },
    search: async(req, res) => {
        try {

        } catch (err) {
            res.status(500).json({
                err: err.message
            });
        }
    },
    lockUser: async(req, res) => {
        try {
            const { id, checkLock } = req.body;
            if (checkLock) {
                await userService.lockUser(id);
            } else {
                await userService.unlockUser(id);
            }
            res.status(200).send({ message: "OK" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    },
    detail: async(req, res) => {
        try {
            const id = req.params.userId;
            const user = await userService.findUserById(id);
            res.render('user/userDetail', { title: 'User Detail', user });
        } catch (err) {
            console.log(err.message);
        }
    }
}