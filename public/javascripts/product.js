function addSize() {
    const productQuantity = document.getElementById('pquantity').value;
    const pSizeSelect = document.getElementById('psize');

    if (productQuantity > 0 && pSizeSelect.value) {
        //Create a size element
        const pSizeElement = document.createElement("td");
        pSizeElement.appendChild(document.createTextNode(pSizeSelect.value.toUpperCase()));
        pSizeElement.classList.add("text-center");

        // Create a quantity element
        const pQuantityElement = document.createElement("td");
        pQuantityElement.appendChild(document.createTextNode(productQuantity));
        pQuantityElement.classList.add("text-center");
        
        // add elements to the table
        const table = document.getElementById("psize-table");
        let element = document.createElement("tr");
        element.appendChild(pSizeElement);
        element.appendChild(pQuantityElement);
        table.appendChild(element);

        // Remove selectedOption
        pSizeSelect.remove(pSizeSelect.selectedIndex);

        // add values to form
    }
}

function handleAddProduct() {
    const form = document.getElementById("add-product-form");
    const table = document.getElementById("table-quantities");
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];

        input = document.createElement('input');
        input.setAttribute('name', row.cells[0].innerText);
        input.setAttribute('value', row.cells[1].innerText);
        input.setAttribute('type', 'hidden');
        form.append(input);
    }
    form.submit();
}
async function removeProduct(id) {
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await fetch('/products', options)
        location.reload();
    } catch(err) {
        console.log(err.message)
    }
}