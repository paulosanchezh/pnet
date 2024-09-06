const fieldList = document.getElementById('fieldList');
const searchInput = document.querySelector('.search input');
const editDiv = document.querySelector('.edit');
const displayListButton = document.getElementById('displayListButton');
const cancelButton = document.getElementById('cancel_button');


function displayFields(fields) {
    fieldList.innerHTML = '';
    const items = fields.map(function (field) {
        const li = document.createElement('li');
        li.textContent = field.centro + ' - ' + field.pista;
        clickableTiles(li, field.personas, field.date, field.duration, field.hour, field._id, field.centro, field.pista);
        return li;
    });
    fieldList.append(...items);
}

function validateEditForm() {
    const center = document.forms["editFieldForm"]["editCenter"].value;
    const sport = document.forms["editFieldForm"]["editSport"].value;
    const capacity = document.forms["editFieldForm"]["editCapacity"].value;
    const date = document.forms["editFieldForm"]["editDate"].value;
    const hour = document.forms["editFieldForm"]["editHour"].value;
    const duration = document.forms["editFieldForm"]["editDuration"].value;
    const _id = document.forms["editFieldForm"]["_id"].value;

    putReserva(_id, center, sport, capacity, date, hour, duration);
}

function editButtonClick(centro, nbPeople, pista, date, hour, duration, id) {
    editDiv.style.display = 'block';
    document.forms["editFieldForm"]["editCenter"].value = centro;
    document.forms["editFieldForm"]["editSport"].value = pista;
    document.forms["editFieldForm"]["editCapacity"].value = nbPeople;
    document.forms["editFieldForm"]["editDate"].value = date;
    document.forms["editFieldForm"]["editHour"].value = hour;
    document.forms["editFieldForm"]["editDuration"].value = duration;
    document.forms["editFieldForm"]["_id"].value = id;
}

function clickableTiles(currentTile, nbPeople, date, duration, hour, id, centro, pista) {
    let reserved;
    let button;

    currentTile.addEventListener('click', function () {
        if (currentTile.classList.contains('clicked')) {
            currentTile.classList.remove('clicked');
            const data = currentTile.querySelector('.data');
            if (data) {
                currentTile.removeChild(data);
            }
            if (reserved) {
                currentTile.removeChild(reserved);
                currentTile.removeChild(button);
                currentTile.removeChild(editButton);
            }
        }
        else {

            button = document.createElement('delete_button');
            button.textContent = 'Delete';
            button.classList.add('delete_button');
            currentTile.appendChild(button);

            editButton = document.createElement('edit_button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit_button');
            currentTile.appendChild(editButton);

            const data = document.createElement('div');
            data.classList.add('data');
            data.textContent = "Capacity: " + nbPeople;
            currentTile.appendChild(data);

            reserved = document.createElement('div');
            reserved.classList.add('data', 'reserved');
            if (hour == "")
                reserved.textContent = "This field is not booked.";
            else
                reserved.textContent = "Next reservation: " + date + " at " + hour + " for " + duration + " hour(s).";
            currentTile.appendChild(reserved);
            currentTile.classList.add('clicked');

            editButton.addEventListener('click', function () {
                editButtonClick(centro, nbPeople, pista, date, hour, duration, id);
            });
            button.addEventListener('click', function () {
                deleteReserva(id);
            });
        }
    })
}

cancelButton.addEventListener('click', function () {
    editDiv.style.display = 'none';
})

displayListButton.addEventListener('click', function () {
    if (fieldList.innerHTML !== '') {
        fieldList.innerHTML = '';
        displayListButton.textContent = 'Display list';
    }
    else {
        displayListButton.textContent = 'Clear List';
        getAllReservas(function (err, data) {
            if (err) {
                console.error(err);
                return;
            }
            displayFields(data);
        });
    }
});

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    getAllReservas(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        const filteredFields = data.filter(function (field) {
            return field.centro.toLowerCase().includes(searchTerm) || field.pista.toLowerCase().includes(searchTerm);
        });
        displayFields(filteredFields);
    });
});

function validateForm() {
    const Center = document.forms["newFieldForm"]["center"].value;
    const Sport = document.forms["newFieldForm"]["sport"].value;
    const Capacity = document.forms["newFieldForm"]["capacity"].value;

    console.log("coucou")

    if (Center === '' || Sport === '' || Capacity === '') {
        const ErrorMessage = document.getElementById('error_message');
        ErrorMessage.textContent = 'ERROR: uno de los campos no se ha rellenado correctamente';
        ErrorMessage.style.display = 'block';
        setTimeout(function () {
            ErrorMessage.style.display = 'none';
        }, 4500);
        return false;
    }
    else {
        postReserva(Center, Sport, Capacity);
    }
}

window.validateForm = validateForm;