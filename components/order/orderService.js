const { models } = require('../../models');

module.exports = {
    list: () => models.order.findAll({ raw: true })
}


