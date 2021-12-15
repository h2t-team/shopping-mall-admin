const orderService = require('./orderService');

module.exports = {
    list: async (req, res) => {
        //get url and params
        const page = (!isNaN(req.query.page) && req.query.page > 0) ? Number(req.query.page) : 1;
        const url = req.url;

        const orders = await orderService.list(page - 1);
        const maxPage = Math.floor((orders.count - 1) / 8) + 1;
        res.render('order/orders', { title: 'Orders', orders: orders.rows, currentPage: page, maxPage, url });
    },
    invoice: async (req, res) => {
        try {
            const id = req.params.orderId;

            const order = await orderService.findOrderById(id);
            const orderDetails = await orderService.findOrderDetailsById(id);
            const sumOrder = await orderService.sumOrder(id);
            res.render('order/invoice', { title: 'Invoice', order, orderDetails, sumOrder });
        } 
        catch (err) {
            console.log(err.message);
        }
    } 
}