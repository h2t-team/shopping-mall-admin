const helpers = (hbs) => {
    hbs.registerHelper('currencyFormat', money => 
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money));

    hbs.registerHelper('page', (currentPage, maxPage, url) => {
        //check exists pagination in url
        url = url.includes('page') ? url.substring(0, url.indexOf('page') - 1) : url;
        const urlTerm = url === '/' ? '?' : `${url.substring(1)}&`;

        let item = `<li class="page-item d-none d-sm-block ${currentPage == 1 ? "disabled" : ""}">
                        <a class="page-link" href="${urlTerm}page=${currentPage - 1}" aria-label="Previous">
                            <i class="bi bi-caret-left-fill"></i>
                        </a>
                    </li>`;
        for (let i = 1; i <= maxPage; i++) {
            item += `<li class="page-item ${i == currentPage ? "active" : ""}">
                        <a class="page-link" href="${urlTerm}page=${i}" aria-label="${i}">
                            <span>${i}</span>
                        </a>
                    </li>`;
        }
        item += `<li class="page-item d-none d-sm-block ${currentPage == maxPage ? "disabled" : ""}">
                        <a class="page-link" href="${urlTerm}page=${currentPage + 1}" aria-label="Next">
                            <i class="bi bi-caret-right-fill"></i>
                        </a>
                    </li>`;
        return item;
    });
}

module.exports ={
    helpers
}