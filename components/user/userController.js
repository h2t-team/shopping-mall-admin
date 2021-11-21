const userService = require('./userService');

module.exports = {
    list: async (req, res) => {
        const users = await userService.list();
        res.render('user/users', { title: 'Users' , users});
    }
}