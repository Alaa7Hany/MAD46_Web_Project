$(document).on("pagecreate", "#contact-page", function () {

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

        $.mobile.loading("show", {
            text: "Saving...",
            textVisible: true,
            theme: "b",
            html: ""
        });

        setTimeout(function () {
            $.mobile.loading("hide");
        }, 1000);

        var newContact = {
            id: new Date().getTime(),
            name: fullName,
            phone: phone,
            email: email,
            gender: gender
        };
        // add to contacts list
    });
});