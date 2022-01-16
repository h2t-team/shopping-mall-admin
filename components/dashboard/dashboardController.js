const dashboardService = require('./dashboardService');
var Duration = require("duration");
module.exports = {
    dashboard: async(req, res) => {
        const dateRange = req.query.dateRange;
        console.log("DR", dateRange);
        var fromDate;
        var toDate;
        var fromDateUTC;
        const offset = 7;
        //when go to dashboard => display 7 days recent revenue
        if (!dateRange) {
            const days = 6;
            const toDateUTC = new Date();
            fromDateUTC = new Date(toDateUTC.getTime() - (days * 24 * 60 * 60 * 1000));
            const utc1 = toDateUTC.getTime() + (toDateUTC.getTimezoneOffset() * 60000);
            const utc2 = fromDateUTC.getTime() + (fromDateUTC.getTimezoneOffset() * 60000);
            toDate = new Date(utc1 + (3600000 * offset));
            fromDate = new Date(utc2 + (3600000 * offset));
        } else {
            const index = dateRange.indexOf(' to ');
            console.log(index);
            if (index != -1) {
                fromDate = new Date(dateRange.substring(0, index));
                toDate = new Date(dateRange.substring(index + 4));
            } else {
                fromDate = new Date(dateRange);
                toDate = new Date(dateRange);
            }
        }
        console.log
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        const duration = new Duration(fromDate, toDate);
        const orders = await dashboardService.orderList(fromDate, toDate);
        var chartData = new Array();
        for (let i = 0; i <= duration.days; i++) {
            var date;
            if (!dateRange) {
                const currentDateUTC = new Date(fromDateUTC.getTime() + (i * 24 * 60 * 60 * 1000));
                const utc = currentDateUTC.getTime() + (currentDateUTC.getTimezoneOffset() * 60000);
                const currentDate = new Date(utc + (3600000 * offset));
                const month = (currentDate.getMonth() + 1) < 10 ? "" + currentDate.getMonth() + 1 : currentDate.getMonth() + 1;
                const day = (currentDate.getDate()) < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
                date = currentDate.getFullYear() + '-' + month + '-' + day;
            } else {
                var currentDate = new Date(fromDate);
                currentDate.setDate(currentDate.getDate() + i);
                const month = (currentDate.getMonth() + 1) < 10 ? "" + currentDate.getMonth() + 1 : currentDate.getMonth() + 1;
                const day = (currentDate.getDate()) < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
                date = currentDate.getFullYear() + '-' + month + '-' + day;
            }
            chartData[i] = {
                labels: date,
                revenue: 0,
            }
        }
        var revenue = 0;
        for (let i = 0; i < orders.length; i++) {
            const spaceIndex = orders[i].created_at.indexOf(' ');
            const orderDate = orders[i].created_at.substring(0, spaceIndex);
            const index = chartData.map(function(e) { return e.labels; }).indexOf(orderDate);
            revenue += parseInt(orders[i].total);
            chartData[index] = {
                labels: orderDate,
                revenue: revenue
            };
        }
        for (let i = 1; i <= duration.days; i++) {
            var date;
            if (!dateRange) {
                const currentDateUTC = new Date(fromDateUTC.getTime() + (i * 24 * 60 * 60 * 1000));
                const utc = currentDateUTC.getTime() + (currentDateUTC.getTimezoneOffset() * 60000);
                const currentDate = new Date(utc + (3600000 * offset));
                const month = (currentDate.getMonth() + 1) < 10 ? "" + currentDate.getMonth() + 1 : currentDate.getMonth() + 1;
                const day = (currentDate.getDate()) < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
                date = currentDate.getFullYear() + '-' + month + '-' + day;
            } else {
                var currentDate = new Date(fromDate);
                currentDate.setDate(currentDate.getDate() + i);
                const month = (currentDate.getMonth() + 1) < 10 ? "" + currentDate.getMonth() + 1 : currentDate.getMonth() + 1;
                const day = (currentDate.getDate()) < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
                date = currentDate.getFullYear() + '-' + month + '-' + day;
            }
            chartData[i] = {
                labels: date,
                revenue: chartData[i].revenue + chartData[i - 1].revenue,
            }
        }
        let labels = chartData.map(a => a.labels);
        let revenues = chartData.map(a => a.revenue);
        res.render('index', { title: 'Dashboard', labels: JSON.stringify(labels), revenues: JSON.stringify(revenues), fromDate, toDate, scripts: ['dashboard.js'] });
    }
}