var path = window.location.pathname;
if (path.match('/products/updateproduct/')) {
    window.onload = function() {
        changePQuantityValue();

    }
    document.getElementById('psize').onchange = function() {
            changePQuantityValue();
        }
        //change quantity value in table
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
}

//change quantity value in input 
function changePQuantityValue() {
    const pSizeSelect = document.getElementById('psize');
    if (pSizeSelect.selectedIndex >= 0) {
        const table = document.getElementById("psize-table");
        var totalRowCount = table.rows.length;
        for (var i = 0; i < totalRowCount; i++) {
            //find pquantity value in table
            if (table.rows[i].cells[0].innerText == pSizeSelect.value) {
                document.getElementById('pquantity').value = table.rows[i].cells[1].innerText;
            }
        }
    } else {
        document.getElementById('pquantity').value = '';
    }
}

function submitUpdateProductForm() {
    event.preventDefault();
    const pid = document.getElementById('pid').value;
    const prate = document.getElementById('prate').value;
    const pname = document.getElementById('pname').value;
    const pcategory = document.getElementById('pcategory').value;
    const pprice = document.getElementById('pprice').value;
    const pdesc = document.getElementById('pdesc').value;

    var psize = {};
    const table = document.getElementById("psize-table");
    var totalRowCount = table.rows.length;
    for (var i = 0; i < totalRowCount; i++) {
        const size = table.rows[i].cells[0].innerText;
        const quantity = table.rows[i].cells[1].innerText;
        psize[size] = quantity;
    }
    var data = {
        pid: pid,
        prate: prate,
        pname: pname,
        pcategory: pcategory,
        pprice: pprice,
        pdesc: pdesc,
        psize: psize,
    }
    $.ajax({
        contentType: "application/json",
        url: '/products/updateproduct/',
        dataType: "json",
        type: 'POST', // http method
        data: JSON.stringify(data), // data to submit
    }).done((res) => {
        $("#errorMessage").empty();
        console.log("SUCCESS respones", res);
        window.location.href = "/products";
    }).fail((res) => {
        $("#errorMessage").empty();
        const msg = res.responseJSON.message;
        $("#errorMessage").append(`<div class="alert alert-danger" role="alert">${msg}</div>`);
    });

}