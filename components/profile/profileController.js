module.exports = {
    editAccount: (req, res) => {
        const id = req.user.id;

        
        res.render('profile/editAccount', { title: 'Edit Account' });
    }
}