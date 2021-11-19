module.exports = {
    list: (req, res) => {
        res.render('order/orders', { title: 'Orders' });
    },
    invoice: (req, res) => {
        res.render('order/invoice', { title: 'Invoice' });
    } 
}