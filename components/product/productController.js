const productService = require('./productService');

module.exports = {
    list: async (req, res) => {
        try {
            //get request params
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? Number(req.query.page) : 1;
            const search = req.query.search;

            //get product list and category
            const products = search ? await productService.findName(search, page - 1) : await productService.list(page - 1);
            const category = await productService.category();
            console.log(products)
            const maxPage = Math.floor((products.count.length) / 8) + 1;

            res.render('product/products', { title: 'Products', products: products.rows, category, currentPage: page, maxPage, search });
        }
        catch (err) {
            console.log(err.message);
        }
    },

    addProduct: (req, res) => {
        res.render('product/addProduct', { title: 'Add Product' });
    }
}