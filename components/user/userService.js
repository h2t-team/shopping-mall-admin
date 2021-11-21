const { models } = require('../../models');

module.exports = {
    list: () => models.customer.findAll({ raw: true })
}


