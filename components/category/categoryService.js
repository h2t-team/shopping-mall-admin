const { models } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    list: () => models.category.findAll({
        raw: true,
        order: [
            ['parent_id', 'ASC'],
            ['name', 'ASC'],
        ],
    }),

}