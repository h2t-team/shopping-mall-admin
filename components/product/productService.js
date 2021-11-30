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
    include: [{
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
    order: [
        ['id', 'ASC']
    ],
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
    addProduct: (name, category_id, price, description, sizes, imageUrls) => models.product.create({
            category_id: category_id,
            name: name,
            price: price,
            description: description,
            rate: 0
        })
        .then(async (res) => {
            const productId = res.dataValues.id;
            for (let i = 0; i < imageUrls.length; i++) {
                await models.product_image.create({
                    product_id: productId,
                    image_url: imageUrls[i]
                })
            }
            return Promise.resolve(productId);
        })
        .then(async (productId) => {
            for (let key in sizes) {
                await models.product_size.create({
                    product_id: productId,
                    size: key,
                    quantity: sizes[key]
                })
            }
        }),
    removeProduct: id => models.product_image.destroy({
            where: {
                product_id: id
            },
        })
        .then(res => models.product_size.destroy({
            where: {
                product_id: id
            },
        }))
        .then(res => models.product.destroy({
            where: {
                id: id
            },
        })),
    findProductById: id => models.product.findByPk(id),
    findCategoryById: id => models.category.findByPk(id),
    findProductSizeById: id => models.product_size.findAll({
        where: {
            product_id: id
        },
        raw: true
    }),
    findProductImageById: id => models.product_image.findAll({
        where: {
            product_id: id
        },
        raw: true
    }),
    removeCurrentProductCategory: (category, categoryOfProduct) => {
        const index = category.map(function(e) { return e.id; }).indexOf(categoryOfProduct.id);
        if (index > -1) {
            category.splice(index, 1);
        }
        return category;
    },
    updateProduct: (id, name, category_id, price, description, rate, size) => models.product.update({
            category_id: category_id,
            name: name,
            price: price,
            description: description,
            rate: rate
        }, {
            where: {
                id: id,
            },
        })
        .then(async(res) => {
            for (let key in size) {
                await models.product_size.update({
                    quantity: size[key]
                }, {
                    where: {
                        product_id: id,
                        size: key,
                    },
                })
            }
        }),
}