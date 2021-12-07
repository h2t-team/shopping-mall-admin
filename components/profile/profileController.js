const adminService = require('../ad/adminService');

module.exports = {
    editAccount: (req, res) => {
        const user = req.user;
        console.log(req.user)
        res.render('profile/editAccount', { title: 'Edit Account', user });
    },
    editAccountForm: async (req, res) => {
        console.log(1)
        //res.render('/profile/editAccount', { title: 'Dashboard', });
        // try {
        //     // const { id } = req.user;
        //     // const { lname, fname, telephone } = req.body;
        //     // console.log(req.user)
        //     //await adminService.updateAdmin(id, lname, fname, telephone);
            
        // }
        // catch (err) {
        //     console.log(err.message);
        // }
    }
}