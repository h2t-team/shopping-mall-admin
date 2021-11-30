const helpers = (hbs) => {
    hbs.registerHelper('currencyFormat', money => 
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money));

    // Huy sẽ sửa cái này sau
    hbs.registerHelper('page', (currentPage, maxPage, search) => {
        const searchTerm = typeof search !== 'undefined' ? `keyword=${search}&` : '';

        let item = `<li class="page-item d-none d-sm-block ${currentPage == 1 ? "disabled" : ""}">
                        <a class="page-link" href="?${searchTerm}page=${currentPage - 1}" aria-label="Previous">
                            <i class="bi bi-caret-left-fill"></i>
                        </a>
                    </li>`;
        for (let i = 1; i <= maxPage; i++) {
            item += `<li class="page-item ${i == currentPage ? "active" : ""}">
                        <a class="page-link" href="?${searchTerm}page=${i}" aria-label="${i}">
                            <span>${i}</span>
                        </a>
                    </li>`;
        }
        item += `<li class="page-item d-none d-sm-block ${currentPage == maxPage ? "disabled" : ""}">
                        <a class="page-link" href="?${searchTerm}page=${currentPage + 1}" aria-label="Next">
                            <i class="bi bi-caret-right-fill"></i>
                        </a>
                    </li>`;
        return item;
    });
}

module.exports ={
    helpers
}