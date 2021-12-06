const productService = require('./productService');
const formidable = require('formidable');
const { uploadFile } = require('../../firebase/config');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');

module.exports = {
    validate: (req, res) => {
        console.log(req.body);
        
    },
    list: async(req, res) => {
        try {
            //get request params
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? Number(req.query.page) : 1;

            //get product list, category and page count
            const products = await productService.list(page - 1);
            const category = await productService.category();
            const maxPage = Math.floor((products.count.length - 1) / 8) + 1;
            res.render('product/products', { title: 'Products', products: products.rows, category, currentPage: page, maxPage });
        } catch (err) {
            console.log(err.message);
        }
    },
    search: async(req, res) => {
        try {
            //get request params
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? Number(req.query.page) : 1;
            const search = req.query.keyword;

            //get product list, category and page count
            const products = search ? await productService.findName(search, page - 1) : await productService.list(page - 1);
            const category = await productService.category();
            const maxPage = Math.floor((products.count.length - 1) / 8) + 1;

            res.render('product/products', { title: 'Products', products: products.rows, category, currentPage: page, maxPage, search });
        } catch (err) {
            console.log(err.message);
        }
    },
    addProductPage: async(req, res) => {
        try {
            const category = await productService.category();
            res.render('product/addProduct', { title: 'Add Product', category });
        } catch (err) {
            console.log(err.message);
        }
    },
    addProductForm: async(req, res) => {
        try {
            const form = formidable({});
            form.parse(req, async(err, fields, files) => {
                if (err) {
                    next(err);
                    return;
                }
                const { pname, pcategory, pprice, pdesc, ...psizes } = fields;
                const id = uuidv4();
                const imageUrls = []
                for (const item in files) {
                    try {
                        await uploadFile(files[item].filepath)
                            .then(url => imageUrls.push(url))
                    } catch (err) {
                        console.log(err)
                    }
                }
                console.log(res)
                await productService.addProduct(id, pname, pcategory, pprice, pdesc, psizes, imageUrls);
                res.status(200).send({ message: "Success" });
            });
        } catch (err) {
            console.log(err.message);
        }
    },
    updateProductPage: async(req, res) => {
        try {
            const id = req.params.productId;

            const product = await productService.findProductById(id);
            const productCategory = await productService.findCategoryById(product.category_id);
            const category = await productService.category();
            const categoryWithoutProductCategory = await productService.removeCurrentProductCategory(category, productCategory);
            const productSize = await productService.findProductSizeById(product.id);
            const productImage = await productService.findProductImageById(product.id);
            res.render('product/updateProduct', { title: 'Update Product', product, productCategory, productSize, productImage, categoryWithoutProductCategory });
        } catch (err) {
            console.log(err.message);
        }
    },
    updateProductForm: async(req, res) => {
        try {
            const { pid, pname, pcategory, pprice, pdesc, prate, psize } = req.body
            await productService.updateProduct(pid, pname, pcategory, pprice, pdesc, prate, psize);
            res.status(200).send({ message: "OK" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    },
    removeProduct: async(req, res) => {
        try {
            const { id } = req.body;
            console.log(id)
            await productService.removeProduct(id);
            res.status(200).send({ message: "Success" });
        } catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Failed to remove" });
        }
    }
}