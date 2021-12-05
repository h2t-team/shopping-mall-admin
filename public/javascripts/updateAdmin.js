var path = window.location.pathname;
if (path.match('/admins/updateadmin/')) {
    $("#update-admin-form").validate({
        rules: {
            "email": {
                email: true,
            },
            "telephone": {
                maxlength: 10
            }
        },
        messages: {
            "email": {
                email: "You have entered an invalid email address"
            },
            "telephone": {
                maxlength: "Your telephone number must be at most 10 characters long"
            }
        },
        errorPlacement: function(error, element) {
            isValid = false;
            element.css('background-color', '#ffdddd');
            error.css('color', 'red');
            error.css('margin-top', '10px');
            error.insertAfter(element);
        },
        unhighlight: function(element) {
            isValid = true;
            $(element).css('background-color', 'var(--mint)');
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        const id = document.getElementById("id").value;
        const lastName = document.getElementById("lastName").value;
        const firstName = document.getElementById("firstName").value;
        const email = document.getElementById("email").value;
        const telephone = document.getElementById("telephone").value;
        var data = {
            id: id,
            lastName: lastName,
            firstName: firstName,
            email: email,
            telephone: telephone,
        }
        console.log(data);
        $.ajax({
            contentType: "application/json",
            url: '/admins/updateadmin/',
            dataType: "json",
            type: 'POST', // http method
            data: JSON.stringify(data), // data to submit
        }).done((res) => {
            $("#errorMessage").empty();
            console.log("SUCCESS respones", res);
            window.location.href = "/admins";
        }).fail((res) => {
            $("#errorMessage").empty();
            const msg = res.responseJSON.message;
            $("#errorMessage").append(`<div class="alert alert-danger" role="alert">${msg}</div>`);
        });
    }
}