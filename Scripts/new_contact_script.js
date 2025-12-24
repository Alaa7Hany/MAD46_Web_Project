$(document).on("pagecreate", "#contact-page", function () {

    function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    var currentId = getParameterByName("id");
    var isEditMode = currentId != null;

    if (isEditMode) {
        $("h1").text("Edit Contact");

        var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        var contact = contacts.find(x => x.id == currentId);

        if (contact) {
            $("#name").val(contact.name);
            $("#phone").val(contact.phone);
            $("#email").val(contact.email);
            $("#gender").val(contact.gender).slider("refresh");
        }
    }

    $("#submitBtn").on("tap", function (e) {
        e.preventDefault();

        var fullName = $("#name").val().trim();
        var phone = $("#phone").val().trim();
        var email = $("#email").val().trim();
        var gender = $("#gender").val();

        if (fullName === "" || phone === "") {
            alert("Name and Phone are required.");
            return;
        }

        $.mobile.loading("show", { text: "Saving...", textVisible: true, theme: "b", html: "" });

        var contacts = JSON.parse(localStorage.getItem("contacts")) || [];

        if (isEditMode) {
            var contactIndex = contacts.findIndex(x => x.id == currentId);
            if (contactIndex > -1) {
                contacts[contactIndex].name = fullName;
                contacts[contactIndex].phone = phone;
                contacts[contactIndex].email = email;
                contacts[contactIndex].gender = gender;
            }
        } else {
            var newContact = {
                id: Date.now(),
                name: fullName,
                phone: phone,
                email: email,
                gender: gender,
                img: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            };
            contacts.push(newContact);
        }

        localStorage.setItem("contacts", JSON.stringify(contacts));

        setTimeout(function () {
            $.mobile.loading("hide");
            window.location.href = "index.html";
        }, 500);
    });
});