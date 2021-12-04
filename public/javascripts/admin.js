var path = window.location.pathname;
if (path.match('/admins/addadmin')) {
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict';

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach((form) => {
            form.addEventListener('submit', (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    })();
    const password = document.getElementById("password"),
        confirmPassword = document.getElementById("confirmPassword");

    function validatePassword() {
        if (password.value != confirmPassword.value) {
            confirmPassword.setCustomValidity("Password do not match.");
        } else {
            confirmPassword.setCustomValidity('');
        }
    }
    password.onchange = validatePassword;
    confirmPassword.onkeyup = validatePassword;

    function submitAddAdminForm() {
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
        });
    }
}