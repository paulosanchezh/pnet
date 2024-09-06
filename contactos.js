
function validateNames(firstname, lastname) {
    if (/[0-9]/.test(firstname) || /[0-9]/.test(lastname)) {
        const ErrorMessage = document.getElementById('error_message');
        ErrorMessage.textContent = "ERROR: el nombre y los apellidos sólo pueden contener letras";
        ErrorMessage.style.display = 'block';
        setTimeout(function () {
            console.log("bad name");
            ErrorMessage.style.display = 'none';
            return false;
        }, 4500);
    }
    else return false;
    return true;
}

function validateMail(email) {
    const mailTester = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (mailTester.test(email))
        return false
    else {
        const ErrorMessage = document.getElementById('error_message');
        ErrorMessage.textContent = "ERROR: dirección de correo electrónico no válida";
        ErrorMessage.style.display = 'block';
        setTimeout(function () {
            ErrorMessage.style.display = 'none';
            return false;
        }, 4500);
    }
    return true;
}

function validateForm() {
    const Firstname = document.forms["contactosForm"]["firstname"].value;
    const Lastname = document.forms["contactosForm"]["lastname"].value;
    const Mail = document.forms["contactosForm"]["email"].value;
    const Title = document.forms["contactosForm"]["title"].value;
    const Message = document.forms["contactosForm"]["message"].value;

    console.log(Firstname + Lastname + Mail + Title + Message);
    if (Firstname === '' || Lastname === '' || Mail === '' ||
        Title === '' || Message === '') {
        console.log("no data")
        const ErrorMessage = document.getElementById('error_message');
        ErrorMessage.textContent = 'ERROR: uno de los campos no se ha rellenado correctamente';
        ErrorMessage.style.display = 'block';
        setTimeout(function () {
            ErrorMessage.style.display = 'none';
            return false;
        }, 4500);
    }
    else if (validateNames(Firstname, Lastname) !== false || validateMail(Mail) !== false) {
        return false;
    }
    else {
        const SuccessMessage = document.getElementById('success_message');
        SuccessMessage.textContent = 'Su mensaje ha sido enviado, le responderemos lo antes posible';
        SuccessMessage.style.display = 'block';
        setTimeout(function () {
            SuccessMessage.style.display = 'none';
            return true;
        }, 4000);
    }
}