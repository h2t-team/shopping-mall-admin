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
    }
}

function handleAddProduct(formData) {
    formData.append("pname", jQuery("#pname").val());
    formData.append("pcategory", jQuery("#pcategory").val());
    formData.append("pprice", jQuery("#pprice").val());
    formData.append("pdesc", jQuery("#pdesc").val());

    const table = document.getElementById("table-quantities");
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        formData.append(row.cells[0].innerText, row.cells[1].innerText);
    }
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

$(document).ready(function () {
    $("#dZUpload").dropzone({
        url: "/products/addproduct",
        method: "POST",
        paramName: "file",
        previewsContainer: 'div.dropzone-previews',
        addRemoveLinks: true,
        acceptedFiles: ".png, .jpg, .bpm, .jpeg",
        uploadMultiple: true,
        parallelUploads: 3,
        maxFiles: 3,
        autoProcessQueue: false,
        success: function (file, response) {
            file.previewElement.classList.add("dz-success");
            window.location.href = "/products";
        },
        error: function (file, response) {
            file.previewElement.classList.add("dz-error");
        },  
        init: function () {
            $("#pcreate-btn").bind('click', e => {
                console.log(this)
                this.processQueue();
            });
            this.on("sendingmultiple", function(data, xhr, formData) {
                handleAddProduct(formData);
            });
        }
            
    });
});
