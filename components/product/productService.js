const { models } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    list: (page = 0, itemsPerPage = 8) => models.product.findAndCountAll({ 
        raw: true,
        attributes: [
            'id',
            'name', 
            'price', 
            'rate',
            [sequelize.fn('sum', sequelize.col('product_sizes.quantity')), 'total_amount']
        ],
        include: [
            {
                model: models.category, 
                as: 'category',
                attributes: ['name'],
                required: true
            },
            {
                model: models.product_size, 
                as: 'product_sizes',
                attributes: [
                    'product_id',
                    'quantity',
                ],
                duplicating: false,
            },
            {
                model: models.product_image, 
                as: 'product_images',
                attributes: ['image_url'],
                duplicating: false,
                required: true
            }
        ],
        group: ['product.id'],
        offset: itemsPerPage * page,
        limit: itemsPerPage,
        order: [['id', 'ASC']]
    }),
    category: () => models.category.findAll({
        raw: true
    }),
    findName: (name, page = 0, itemsPerPage = 8) => models.product.findAndCountAll({ 
        raw: true,
        attributes: [
            'id',
            'name', 
            'price', 
            'rate',
            [sequelize.fn('sum', sequelize.col('product_sizes.quantity')), 'total_amount']
        ],
        where: {
            'name': {
                [Op.like]: `%${name}%`
            }
        },
        include: [
            {
                model: models.category, 
                as: 'category',
                attributes: ['name'],
                required: true
            },
            {
                model: models.product_size, 
                as: 'product_sizes',
                attributes: [
                    'product_id',
                    'quantity',
                ],
                duplicating: false,
            },
            {
                model: models.product_image, 
                as: 'product_images',
                attributes: ['image_url'],
                duplicating: false,
                required: true
            }
        ],
        group: ['product.id'],
        offset: itemsPerPage * page,
        limit: itemsPerPage,
        order: [['id', 'ASC']]
    })
}


