window.onload = function() {
    changePQuantityValue();
}
document.getElementById('psize').onchange = function() {
    changePQuantityValue();
}

function changePQuantityValue() {
    const pSizeSelect = document.getElementById('psize');
    if (pSizeSelect.selectedIndex >= 0) {
        const table = document.getElementById("psize-table");
        var totalRowCount = table.rows.length;
        for (var i = 0; i < totalRowCount; i++) {

            if (table.rows[i].cells[0].innerText == pSizeSelect.value) {
                document.getElementById('pquantity').value = table.rows[i].cells[1].innerText;
            }
        }
    } else {
        document.getElementById('pquantity').value = null;
    }
}

document.getElementById('update-product-btn').addEventListener('click', () => {
    const productQuantity = document.getElementById('pquantity').value;
    const pSizeSelect = document.getElementById('psize');

    if (productQuantity > 0 && pSizeSelect.value) {
        const table = document.getElementById("psize-table");
        var totalRowCount = table.rows.length;
        for (var i = 0; i < totalRowCount; i++) {

            if (table.rows[i].cells[0].innerText == pSizeSelect.value) {
                table.rows[i].cells[1].innerText = productQuantity;
            }
        }
        //Remove selectedOption and change pquantity value
        pSizeSelect.remove(pSizeSelect.selectedIndex);
        changePQuantityValue();
    }
})