const bcrypt = require('bcrypt');
const { models } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
module.exports = {
    list: (page = 0, itemsPerPage = 8) => models.admin.findAndCountAll({
        offset: itemsPerPage * page,
        limit: itemsPerPage
    }),
    findName: (name, page = 0, itemsPerPage = 8) => models.admin.findAndCountAll({
        where: sequelize.where(sequelize.fn('concat', sequelize.col('last_name'), ' ', sequelize.col('first_name')), {
            [Op.like]: '%' + name + '%'
        }),
        offset: itemsPerPage * page,
        limit: itemsPerPage,
    }),
    findUsername: (username) => models.admin.findOne({ where: { username: username } }),
    addAdmin: (lastName, firstName, username, password, email, telephone) => models.admin.findOne({ where: { username: username } })
        .then(async(res) => {
            if (res) {
                throw new Error('Oh no');
            }
            const hashPassword = await bcrypt.hash(password, 10);
            models.admin.create({
                lastName: lastName,
                firstName: firstName,
                username: username,
                password: hashPassword,
                email: email,
                telephone: telephone,
            })
        }),
    removeAdmin: id => models.admin.destroy({
        where: {
            id: id
        },
    }),
    updateAdmin: (id, lastName, firstName, email, telephone) => models.admin.update({
        lastName: lastName,
        firstName: firstName,
        email: email,
        telephone: telephone,
    }, {
        where: {
            id: id,
        },
    })
}