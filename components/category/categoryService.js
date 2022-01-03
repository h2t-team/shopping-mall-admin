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
    listSortNameAsc: () => models.category.findAll({
        raw: true,
        order: [
            ['name', 'ASC'],
        ],
    }),
    addCategory: async(name, description, parentId) => {
        return await models.category.create({
            name: name,
            description: description,
            parent_id: parentId == 0 ? null : parentId,
            total_products: 0,
        });
    },
    findCategoryById: id => models.category.findByPk(id),
    updateCategory: async(id, name, description, parentId) => {
        return await models.category.update({
            name: name,
            description: description,
            parent_id: parentId == 0 ? null : parentId,
        }, {
            where: {
                id: id,
            }
        });
    },
}