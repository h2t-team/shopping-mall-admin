const helpers = (hbs) => {
    hbs.registerHelper('currencyFormat', money => 
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money));

    // Huy sẽ sửa cái này sau
    hbs.registerHelper('page', (currentPage, maxPage, search) => {
        const searchTerm = typeof search !== 'undefined' ? `search=${search}&` : '';
        let item = "<li class=\"page-item " + (currentPage == 1 ? "disabled" : "") + "\">" + 
                        "<a class=\"page-link\" href=\"?" + searchTerm + "page=" + (currentPage - 1) + "\" aria-label=\"Previous\">" +
                            " <i class=\"bi bi-caret-left-fill\"></i>" +
                        "</a>"+
                    "</li>\n";
        for (let i = 1; i <= maxPage; i++) {
            item += "<li class=\"page-item " + (i == currentPage ? "active" : "") + "\">" + 
                        "<a class=\"page-link\" href=\"?" + searchTerm + "page=" + i + "\" aria-label=\"" + i + "\">" +
                            "<span>" + i + "</span>" +
                        "</a>"+
                    "</li>\n";
        }
        item += "<li class=\"page-item " + (currentPage == maxPage ? "disabled" : "") + "\">" + 
                        "<a class=\"page-link\" href=\"?" + searchTerm + "page=" + (currentPage + 1) + "\" aria-label=\"Previous\">" +
                            " <i class=\"bi bi-caret-right-fill\"></i>" +
                        "</a>"+
                    "</li>\n";
        return item;
    });
}

module.exports ={
    helpers
}