function validateNames(firstname, lastname) {
    if (/[0-9]/.test(firstname) || /[0-9]/.test(lastname)) {
        const ErrorMessage = document.getElementById('error_message');
        ErrorMessage.textContent = "ERROR: el nombre y los apellidos sólo pueden contener letras";
        ErrorMessage.style.display = 'block';
        setTimeout(function () {
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

function validateDate(date) {
    const today = new Date();
    selectedDate = new Date(date);
    if (selectedDate < today) {
        const ErrorMessage = document.getElementById('error_message');
        ErrorMessage.textContent = "ERROR: esta fecha está en el pasado";
        ErrorMessage.style.display = 'block';
        setTimeout(function () {
            ErrorMessage.style.display = 'none';
            return false;
        }, 4500);
    }
    else
        return false;
    return true;
}

function validateHour(hour, duration, closingTime) {
    if (Number(hour) + Number(duration) > closingTime) {
        const ErrorMessage = document.getElementById('error_message');
        ErrorMessage.textContent = "ERROR: la duración supera la hora de cierre";
        ErrorMessage.style.display = 'block';
        setTimeout(function () {
            ErrorMessage.style.display = 'none';
            return false;
        }, 4500);
    }
    else return false;
    return true;
}

function validatePeople(players, capacity) {
    if (Number(players) > capacity) {
        const ErrorMessage = document.getElementById('error_message');
        ErrorMessage.textContent = "ERROR: el terreno es demasiado pequeño para tantos jugadores";
        ErrorMessage.style.display = 'block';
        setTimeout(function () {
            ErrorMessage.style.display = 'none';
            return false;
        }, 4500);
    }
    else return false;
    return true;
}

function validateForm() {
    const Firstname = document.forms["reservasForm"]["fname"].value;
    const Lastname = document.forms["reservasForm"]["lname"].value;
    const Mail = document.forms["reservasForm"]["email"].value;
    const Date = document.forms["reservasForm"]["date"].value;
    const Hour = document.forms["reservasForm"]["hour"].value;
    const Duration = document.forms["reservasForm"]["duration"].value;
    const Material = document.forms["reservasForm"]["material"].value;
    const People = document.forms["reservasForm"]["people"].value;

    if (Firstname === '' || Lastname === '' || Mail === '' ||
        Date === '' || Hour === '' || Duration === '' || Material === '') {
        const ErrorMessage = document.getElementById('error_message');
        ErrorMessage.textContent = 'ERROR: uno de los campos no se ha rellenado correctamente';
        ErrorMessage.style.display = 'block';
        setTimeout(function () {
            ErrorMessage.style.display = 'none';
            return false;
        }, 4500);
    }
    else if (validateNames(Firstname, Lastname) !== false || validateMail(Mail) !== false || validateDate(Date) !== false || validateHour(Hour, Duration, 20) !== false || validatePeople(People, 12) !== false) {
        return false;
    }
    else {
        const SuccessMessage = document.getElementById('success_message');
        SuccessMessage.textContent = 'Su reserva se ha completado con éxito';
        SuccessMessage.style.display = 'block';
        setTimeout(function () {
            SuccessMessage.style.display = 'none';
            return true;
        }, 4000);
    }
}
window.validateForm = validateForm;