document.getElementById('add-product-btn').addEventListener('click', () => {
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
    }
})

function handleAddProduct(form) {
    alert(form)
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
        const response = await fetch('/products', options)
        location.reload();
    } catch(err) {
        console.log(err.message)
    }
}