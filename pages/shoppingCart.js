const cart = JSON.parse(localStorage.getItem("cart") || "[]");

document.getElementById("cartGrid").innerHTML = cart.map(cat => `
      <div class="catCard">
          <img class="catPhoto"
              src="https://cdn2.thecatapi.com/images/${cat.imageId}.jpg"
              alt="${cat.name}"
              onerror="this.src='../images/Cat_Image_Default.jpg'">
          <div class="catCard-Title">
              <h3>${cat.name}</h3>
          </div>
          <label>${cat.origin}</label>
      </div>
  `).join("");

document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let message = `Name: ${name}\nEmail: ${email}\nAddress ${address}\n\nOrdered cats:\n`;

    cart.forEach(cat => {
        message += `-${cat.name}\n`;
    });

    alert(message);
});