const { models } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const listConfig = {
    model: models.admin,
    raw: true,
    attributes: [
        'id',
        'username',
        'email',
        'telephone', [sequelize.fn("concat", sequelize.col("first_name"), sequelize.col("last_name")), 'name']
    ],
}
module.exports = {
    list: (page = 0, itemsPerPage = 8) => models.admin.findAndCountAll({
        offset: itemsPerPage * page,
        limit: itemsPerPage
    }),
    findName: (name, page = 0, itemsPerPage = 8) => models.product.findAndCountAll({
        ...listConfig,
        where: {
            'name': {
                [Op.like]: `%${name}%`
            }
        },
        offset: itemsPerPage * page,
        limit: itemsPerPage,
    }),
    addAdmin: (lastName, firstName, username, email, telephone) => models.admin.create({
        lastName: lastName,
        firstName: firstName,
        username: username,
        email: email,
        telephone: telephone,
    }),
    removeAdmin: id => models.admin.destroy({
        where: {
            id: id
        },
    }),
    updateAdmin: (id, lastName, firstName, username, email, telephone) => models.admin.update({
        lastName: lastName,
        firstName: firstName,
        username: username,
        email: email,
        telephone: telephone,
    }, {
        where: {
            id: id,
        },
    })
}