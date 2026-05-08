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
          <p class="catOrigin">${cat.origin}</p>
          <button class="inCartBtn" onClick="removeFromCart('${cat.imageId}')">Remove</button>
      </div>
  `).join("");

if (cart.length === 0) {
    document.querySelector('.cartGrid').innerHTML = `<div class="catCard emptyCartMessage">There are currently no cats in your cart.</div>`;
    document.querySelector('.cartGrid').style.gridTemplateColumns = '1fr';
    document.querySelector('.cartGrid').style.width = '100%';
    document.querySelector('.cartGrid').style.maxWidth = '664px';
    document.querySelector('.cartGrid').style.boxSizing = 'border-box';

} else {
    const cols = Math.min(cart.length, 3);
    document.querySelector('.cartGrid').style.gridTemplateColumns =
        `repeat(${cols}, auto)`;
}

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    if (!name || !email || !address) {
        alert("Please fill in all fields before sending your order.");
        return;
    }
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let message = `Name: ${name}\nEmail: ${email}\nAddress ${address}\n\nOrdered cats:\n`;

    cart.forEach(cat => {
        message += `-${cat.name}\n`;
    });

    alert(message);
    localStorage.setItem("cart", "[]");
    location.reload();
});

function removeFromCart(imageId) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter(c => c.imageId !== imageId);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}