function getReserva(reservaId) {
    var myUrl = "/reservas/" + reservaId;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function (data) {
            $("#resPelicula").html(JSON.stringify(data[0]));
        },
        error: function (res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}

function postReserva(centro, pista, capacity) {
    $.ajax({
        type: "POST",
        url: "/reservas",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "centro": centro,
            "pista": pista,
            "personas": Number(capacity),
            "date": "",
            "duration": "",
            "hour": ""
        }),
        success: function (data) {
            var peli = JSON.parse(data);
            $("#resPelicula").html(peli.msg);
            console.log("success " + data);
        },
        error: function (res) {
            alert("ERROR: " + res.statusText + " (" + res.status + ")");
            console.log("fail" + res);
        },
        beforeSend: function (tmp) {
            console.log("before send");
        },
        complete: function () {
            console.log("complete");
        }
    });
}

function getAllReservas(callback) {
    var myUrl = "/reservas";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        contentType: "application/json",
        success: function (data) {
            callback(null, data);
        },
        error: function (res) {
            callback(new Error("ERROR " + res.statusText));
        }
    });
}

function deleteReserva(reservaId) {
    var myUrl = "/reservas/" + reservaId;
    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: myUrl,
        success: function (data) {
            $("#resReserva").html(data.msg);
        },
        error: function (res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}

function deleteAllReservas() {
    var myUrl = "/reservas/";
    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: myUrl,
        success: function (data) {
            $("#resReserva").html(data.msg);
        },
        error: function (res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}

function putReserva(reservaId, centro, pista, capacity, date, hour, duration) {
    var myUrl = "/reservas/" + reservaId;
    $.ajax({
        type: "PUT",
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify({
            "centro": centro,
            "pista": pista,
            "personas": Number(capacity),
            "date": date,
            "duration": duration,
            "hour": hour
        }),
        url: myUrl,
        success: function (data) {
            $("#resPelicula").html("Archivo actualizado");
        },
        error: function (res) {
            alert("ERROR: ");
        }
    });
}