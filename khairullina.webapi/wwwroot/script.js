
async function GetFlights() {
    const response = await fetch("/api/flightapi", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok == true) {
        const flights = await response.json();

        let rows = document.querySelector("tbody");
        flights.forEach(flight => {
            // добавляем полученные элементы в таблицу
            rows.append(row(flight));
        });
    }
}
async function GetGoodbyId(id) {
    const response = await fetch("/api/flightapi/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok == true) {
        const flight = await response.json();
        const form = document.forms["airForm"];
        form.elements["id"].value = flight.id;
        form.elements["flight_num"].value = flight.flight_number;
        form.elements["flight_dep_post"].value = flight.departure_post;
        form.elements["flight_arr_post"].value = flight.arrival_post;
        form.elements["flight_dep_time"].value = flight.departure_time;
        form.elements["flight_arr_time"].value = flight.arrival_time;

    }
}

async function CreateFlight(flight_num, flight_dep_post, flight_arr_post, flight_dep_time, flight_arr_time) {
    if (flight_num == "") {
        alert("Введите хотя бы номер рейса!");
        return;
    }
    const response = await fetch("api/flightapi", {
        method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            flight_number: parseInt(flight_num),
            departure_post: flight_dep_post,
            arrival_post: flight_arr_post,
            departure_time: flight_dep_time,
            arrival_time:flight_arr_time

        })
    });

    if (response.ok === true) {
        const flight = await response.json();
        reset();
        document.querySelector("tbody").append(row(flight));
    }
}
async function EditFlight(id, flight_num, flight_dep_post, flight_arr_post, flight_dep_time, flight_arr_time) {
    if (flight_num == "") {
        alert("Введите хотя бы номер рейса!");
        return;
    }
    const response = await fetch("/api/flightapi/" + id, {
        method: "PUT",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            id: parseInt(id, 10),
            flight_number: parseInt(flight_num),
            departure_post: flight_dep_post,
            arrival_post: flight_arr_post,
            departure_time: flight_dep_time,
            arrival_time: flight_arr_time
        })
    });
    if (response.ok === true) {
        const good = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + good.id +
            "']").replaceWith(row(good));
    }
}
async function DeleteGood(id) {
    const response = await fetch("/api/flightapi/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const good = await response.json();
        document.querySelector("tr[data-rowid='" + good.id + "']").remove();

    }
}
function reset() {
    const form = document.forms["airForm"];
    form.reset();
    form.elements["id"].value = 0;
}
function row(flight) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", flight.id);
    const idTd = document.createElement("td");
    idTd.append(flight.id);
    tr.append(idTd);
    const numTB = document.createElement("td");
    numTB.append(flight.flight_number);
    tr.append(numTB);
    const flight_departure_post = document.createElement("td");
    flight_departure_post.append(flight.departure_post);
    tr.append(flight_departure_post);
    const flight_arrival_post = document.createElement("td");
    flight_arrival_post.append(flight.arrival_post);
    tr.append(flight_arrival_post);
    const flight_departure_time = document.createElement("td");
    flight_departure_time.append(flight.departure_time);
    tr.append(flight_departure_time);
    const flight_arrival_time = document.createElement("td");
    flight_arrival_time.append(flight.arrival_time);
    tr.append(flight_arrival_time);
    const linksTd = document.createElement("td");
    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", flight.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {
        e.preventDefault();
        GetGoodbyId(flight.id);

    });
    linksTd.append(editLink);
    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", flight.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {
        e.preventDefault();
        DeleteGood(flight.id);

    });
    linksTd.append(removeLink);
    tr.appendChild(linksTd);
    return tr;

}
function InitialFunction() {
    //сброс значений формы
    document.getElementById("reset").addEventListener("click", e => {
        e.preventDefault();
        reset();
    });

    document.getElementById("saveBTN").addEventListener("click", e => {
        e.preventDefault();
        const form = document.forms["airForm"];
        const id = form.elements["id"].value;
        const fl_num = form.elements["flight_num"].value;
        const fl_dep_post = form.elements["flight_dep_post"].value;
        const fl_arr_post = form.elements["flight_arr_post"].value;
        const fl_dep_time = form.elements["flight_dep_time"].value;
        const fl_arr_time = form.elements["flight_arr_time"].value;
        if (id == 0)
            CreateFlight(fl_num, fl_dep_post, fl_arr_post, fl_dep_time, fl_arr_time);
        else
            EditFlight(id, fl_num, fl_dep_post, fl_arr_post, fl_dep_time, fl_arr_time);
    });

    // отправка формы
    document.forms["airForm"].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["airForm"];
        const id = form.elements["id"].value;
        const fl_num = form.elements["flight_num"].value;
        const fl_dep_post = form.elements["flight_dep_post"].value;
        const fl_arr_post = form.elements["flight_arr_post"].value;
        const fl_dep_time = form.elements["flight_dep_time"].value;
        const fl_arr_time = form.elements["flight_arr_time"].value;
        if (id == 0)
            CreateFlight(fl_num, fl_dep_post, fl_arr_post, fl_dep_time, fl_arr_time);
        else
            EditFlight(id, fl_num, fl_dep_post, fl_arr_post, fl_dep_time, fl_arr_time);
    });
    GetFlights();
}