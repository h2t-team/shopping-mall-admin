const productService = require('./productService');

module.exports = {
    list: async (req, res) => {
        try {
            //get request params
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? Number(req.query.page) : 1;
            const search = req.query.search;

            //get product list, category and page count
            const products = search ? await productService.findName(search, page - 1) : await productService.list(page - 1);
            const category = await productService.category();
            const maxPage = Math.floor((products.count.length - 1) / 8) + 1;

            res.render('product/products', { title: 'Products', products: products.rows, category, currentPage: page, maxPage, search });
        }
        catch (err) {
            console.log(err.message);
        }
    },

    addProductPage: async (req, res) => {
        try {
            const category = await productService.category();
            res.render('product/addProduct', { title: 'Add Product', category });
        }
        catch(err) {
            console.log(err.message);
        }
    },
    addProductForm: async (req, res) => { 
        try {
            const { pname, pcategory, pprice, pdesc } = req.body;
            await productService.addProduct(pname, pcategory, pprice, pdesc);
            res.redirect('/products');
        }
        catch(err) {
            console.log(err.message);
        }
    },
    removeProduct: async (req, res) => {
        try {
            const { id } = req.body;
            await productService.removeProduct(id);
            res.status(200).send({ message: "Success" });
        }
        catch(err) {
            console.log(err.message);
            res.status(500).send({ message: "Failed to remove" });
        }
    }
}