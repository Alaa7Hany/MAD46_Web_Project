let contacts = [
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
  },
];
let selectedId = null;

function renderList() {
  $("#contactList").empty();
  contacts.forEach((c) => {
    $("#contactList").append(`
      <li>
        <a href="#details" class="contact" data-id="${c.id}">
          <img src="${c.img}" width="40">
          <span>${c.name}</span>
        </a>
      </li>
    `);
  });
}

$(document).on("pagebeforeshow", "#list", function () {
  renderList();
});

// When a contact is clicked, show the details
$(document).on("click", ".contact", function () {
  selectedId = $(this).data("id");
  let c = contacts.find((x) => x.id === selectedId);
  $("#detailsName").text(c.name);
  $("#detailsPhone").text(c.phone);
  $("#detailsEmail").text(c.email);
  $("#detailsImg").attr("src", c.img);
});
