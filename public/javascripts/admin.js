var path = window.location.pathname;
if (path.match('/admins/addadmin') || path.match('/admins/addAdmin')) {
    $("#add-admin-form").validate({
        rules: {
            "username": {
                required: true,
            },
            "password": {
                required: true,
                minlength: 6
            },
            "confirmPassword": {
                required: true,
                equalTo: "#password",
                minlength: 6
            },
            "email": {
                required: true,
                email: true,
            },
            "telephone": {
                maxlength: 10,
            }
        },
        messages: {
            "username": {
                required: "Please enter a username",
            },
            "password": {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
            },
            "confirmPassword": {
                required: "Please provide a password",
                equalTo: "Please enter the same password as above",
                minlength: "Your password must be at least 6 characters long",
            },
            "email": {
                required: "Please provide an email",
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
        const lastName = document.getElementById("lastName").value;
        const firstName = document.getElementById("firstName").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const telephone = document.getElementById("telephone").value;
        const password = document.getElementById("password").value;
        var data = {
            lastName: lastName,
            firstName: firstName,
            username: username,
            email: email,
            telephone: telephone,
            password: password,
        }
        console.log(data);
        $.ajax({
            contentType: "application/json",
            url: '/admins/addadmin/',
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
async function removeAdmin(id) {
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await fetch('/admins', options)
        location.reload();
    } catch (err) {
        console.log(err.message)
    }
}