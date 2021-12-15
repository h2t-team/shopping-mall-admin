const { models } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    list: (page = 0, itemsPerPage = 8) => models.customer.findAndCountAll({ 
        raw: true,
        offset: itemsPerPage * page,
        limit: itemsPerPage
    }),
    search: (keyword, page = 0, itemsPerPage = 8) => models.customer.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    username: {
                        [Op.like]: `${keyword}`
                    }  
                },
                {
                    email: {
                        [Op.like]: `${keyword}`
                    }  
                },
                {
                    first_name: {
                        [Op.like]: `${keyword}`
                    }  
                },
                {
                    last_name: {
                        [Op.like]: `${keyword}`
                    }  
                },
            ]
        },
        offset: itemsPerPage * page,
        limit: itemsPerPage,
        raw: true
    }),
}


