const { models } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const listConfig = { 
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
    order: [['id', 'ASC']],
}

module.exports = {
    list: (page = 0, itemsPerPage = 8) => models.product.findAndCountAll({ 
        ...listConfig,
        offset: itemsPerPage * page,
        limit: itemsPerPage
    }),
    category: () => models.category.findAll({
        raw: true
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
    addProduct: (name, category_id, price, description) => models.product.create({
        category_id: category_id,
        name: name,
        price: price,
        description: description,
        rate: 0
    })
    .then(res => models.product_image.create({
        product_id: res.dataValues.id,
        image_url: ''
    })),
    removeProduct: id => models.product_image.destroy({
        where: {
            product_id: id
        },
    })
    .then(res => models.product.destroy({
        where: {
            id: id
        },
    }))
}


