module.exports = {
    list: (req, res) => {
        res.render('user/users', { title: 'Users' });
    }
}