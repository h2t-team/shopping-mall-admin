module.exports = {
    list: (req, res) => {
        res.render('product/products', {title: 'Products'});
    },
    addProduct: (req, res) => {
        res.render('product/addProduct', {title: 'Add Product'});
    }
}