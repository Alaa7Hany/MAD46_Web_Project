function getContacts() {
    var storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
        return JSON.parse(storedContacts);
    } else {
        var defaults = [
            {
                id: 1,
                name: "Mohamed Ali",
                phone: "0100000",
                email: "mohamed@mail.com",
                img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg",
            },
            {
                id: 2,
                name: "Alaa Hany",
                phone: "0111111",
                email: "alla@mail.com",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFU7U2h0umyF0P6E_yhTX45sGgPEQAbGaJ4g&s",
            }
        ];
        localStorage.setItem("contacts", JSON.stringify(defaults));
        return defaults;
    }
}

function renderList() {
    var contacts = getContacts();
    var list = $("#contactList");

    list.empty();

    if (contacts.length === 0) {
        list.append("<li>No contacts found.</li>");
    } else {
        contacts.forEach((c) => {
            list.append(`
                <li>
                    <a href="#details" class="contact" data-id="${c.id}" data-transition="slide">
                        <img src="${c.img}"> 
                        <h2>${c.name}</h2>
                        <p>${c.phone}</p>
                    </a>
                </li>
            `);
        });
    }


    try {
        list.listview("refresh");
    } catch (e) {
        list.trigger("create");
    }
}


$(document).on("pagebeforeshow", "#list", function () {
    renderList();
});

$(document).on("click", ".contact", function () {
    var selectedId = $(this).data("id");
    var contacts = getContacts();
    var c = contacts.find((x) => x.id == selectedId);

    if (c) {
        $("#detailsName").text(c.name);
        $("#detailsPhone").text(c.phone);
        $("#detailsEmail").text(c.email);
        $("#detailsImg").attr("src", c.img);
    }
    $("#editBtn").attr("href", "new_contact.html?id=" + c.id);
    $("#deleteBtn").data("id", c.id);

});

$(document).on("click", "#deleteBtn", function (e) {
    e.preventDefault();

    var idToDelete = $(this).data("id");

    if (confirm("Are you sure you want to delete this contact?")) {

        var contacts = getContacts();


        var newContacts = contacts.filter(c => c.id != idToDelete);

        localStorage.setItem("contacts", JSON.stringify(newContacts));


        window.location.href = "index.html";
    }
});