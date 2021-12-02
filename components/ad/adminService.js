const { models } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    list: (page = 0, itemsPerPage = 8) => models.admin.findAndCountAll({

        offset: itemsPerPage * page,
        limit: itemsPerPage
    }),
}