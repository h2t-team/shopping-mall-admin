const { models } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    orderList: (fromDate, toDate) => models.order.findAll({
        raw: true,
        order: [
            ['created_at', 'ASC'],
        ],
        where: {
            created_at: {
                [Op.lt]: toDate,
                [Op.gt]: fromDate
            },
            status: "Success",
        }
    }),
}