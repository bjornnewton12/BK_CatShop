let allCats = [];
let currentPage = 1;

async function fetchCats() {
    const response = await fetch("https://api.thecatapi.com/v1/breeds?limit=30");
    const breeds = await response.json();
    allCats = breeds;
    renderCats();
}

function renderCats(cats = allCats) {
    const start = (currentPage - 1) * 10;
    const pageCats = cats.slice(start, start + 10);

    document.getElementById("catGrid").innerHTML = pageCats.map(cat => `
          <div class="catCard">
              <img class="catPhoto"
                src="https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg"
                alt="${cat.name}"
                onerror="this.src='../images/Cat_Image_Default.jpg'">
              <div class="catCard-Title">
                  <h3>${cat.name}</h3>
                  <img id="cart-${cat.reference_image_id}" src="../icons/shopping_cart.svg" alt="Add to shopping cart"
                        onclick="addToCart('${cat.reference_image_id}', '${cat.name}', '${cat.origin}')">
              </div>
              <label>${cat.origin}</label>
          </div>
      `).join("");

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartIds = cart.map(c => c.imageId);
    cartIds.forEach(id => {
        const icon = document.getElementById(`cart-${id}`);
        if (icon) icon.src = "../icons/shopping_cart_active.svg";
    });

    document.getElementById("prevBtn").style.visibility = currentPage
        === 1 ? "hidden" : "visible";
    document.getElementById("nextBtn").style.visibility = currentPage
        === 3 ? "hidden" : "visible";
}

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderCats();
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentPage < 3) {
        currentPage++;
        renderCats();
    }
});

document.getElementById("searchInput").addEventListener("input", () => {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = allCats.filter(cat =>
        cat.name.toLowerCase().includes(query));
    currentPage = 1;
    renderCats(filtered);
});

document.getElementById("searchBtn").addEventListener("click", () => {
    const query =
        document.getElementById("searchInput").value.toLowerCase();
    const filtered = allCats.filter(cat =>
        cat.name.toLowerCase().includes(query));
    currentPage = 1;
    renderCats(filtered);
});

fetchCats();

function addToCart(imageId, name, origin) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ imageId, name, origin });
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById(`cart-${imageId}`).src = "../icons/shopping_cart_active.svg";
}
