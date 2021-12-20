const { models } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const listConfig = {
    raw: true,
    attributes: [
        'id',
        'name',
        'category_id',
        'price',
        'rate', [sequelize.fn('sum', sequelize.col('product_sizes.quantity')), 'total_amount']
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
    search: (category, keyword, page = 0, itemsPerPage = 8) => models.product.findAndCountAll({
        ...listConfig,
        where: {
            category_id: {
                [Op.like]: `%${category}%`
            },
            
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${keyword}%`
                    }  
                }, {
                    price: {
                        [Op.like]: `%${keyword}%`
                    }  
                }, {
                    rate: {
                        [Op.like]: `%${keyword}%`
                    }  
                }
            ]
        },
        offset: itemsPerPage * page,
        limit: itemsPerPage,
    }),
    updateCategoryCount: (category_id, num) => models.category.update({
        total_products: num
    }, {
        where: {
            id: category_id
        },
    }),
    findTotalByCategory: category_id => models.category.findOne({
        attributes: ['total_products', 'parent_id'],
        where: {
            id: category_id
        },
        raw: true      
    }),
    addProduct: (id, name, category_id, price, description, sizes, imageUrls) => models.product.create({
            id,
            category_id,
            name,
            price,
            description,
            rate: 0
        })
        .then(async (res) => {
            for (let i = 0; i < imageUrls.length; i++) {
                await models.product_image.create({
                    product_id: id,
                    image_url: imageUrls[i]
                })
            }
            return Promise.resolve(id);
        })
        .then(async (res) => {
            for (let key in sizes) {
                await models.product_size.create({
                    product_id: id,
                    size: key,
                    quantity: sizes[key]
                })
            }
        })
        .then(async (res) => {
            try {
                const { total_products, parent_id } = await module.exports.findTotalByCategory(category_id);
                await module.exports.updateCategoryCount(category_id, total_products + 1);
                if (parent_id !== null) {
                    const { total_products } = await module.exports.findTotalByCategory(parent_id);
                    await module.exports.updateCategoryCount(parent_id, total_products + 1);
                }
            }
            catch (err) {
                console.log(err.message);
            }
        }),
    removeProduct: (id, category_id) => models.product_image.destroy({
            where: {
                product_id: id
            },
        })
        .then(res => models.product_size.destroy({
            where: {
                product_id: id
            },
        }))
        .then(async (res) => {
            try {
                const { total_products, parent_id } = await module.exports.findTotalByCategory(category_id);
                await module.exports.updateCategoryCount(category_id, total_products - 1);
                if (parent_id !== null) {
                    const { total_products } = await module.exports.findTotalByCategory(parent_id);
                    await module.exports.updateCategoryCount(parent_id, total_products - 1);
                }
            }
            catch (err) {
                console.log(err.message);
            }
        })
        .then(res => models.product.destroy({
            where: {
                id
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