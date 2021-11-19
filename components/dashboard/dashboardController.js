module.exports = {
    dashboard: (req, res) => {
        res.render('index', { title: 'Dashboard' });
    }
}