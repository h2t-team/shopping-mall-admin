const orderService = require('./orderService');

module.exports = {
    list: async (req, res) => {
        const orders = await orderService.list();
        console.log(orders);
        res.render('order/orders', { title: 'Orders', orders });
    },
    invoice: (req, res) => {
        res.render('order/invoice', { title: 'Invoice' });
    } 
}