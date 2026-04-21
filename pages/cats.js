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
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartIds = cart.map(c => c.imageId);

    document.getElementById("catGrid").innerHTML = pageCats.map(cat => { 
        const inCart = cartIds.includes(cat.reference_image_id);
        return `
          <div class="catCard">
              <img class="catPhoto"
                src="https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg"
                alt="${cat.name}"
                onerror="this.src='../images/Cat_Image_Default.jpg'">
              <div class="catCard-Title">
                  <h3>${cat.name}</h3>
              </div>
              <label>${cat.origin}</label>
              <button class="addToCartBtn${inCart ? ' inCartBtn' : ''}"
                id="btn-${cat.reference_image_id}"
                data-id="${cat.reference_image_id}"
                data-name="${cat.name}"
                data-origin="${cat.origin}" 
                onClick="toggleCart(this)">
                ${inCart ? 'Remove from cart' : 'Add to cart'}
               </button>

          </div>
          `;
    }).join("");

    document.getElementById("prevBtn").style.visibility = currentPage === 1 ? "hidden" : "visible";
    document.getElementById("nextBtn").style.visibility = currentPage === 3 ? "hidden" : "visible";
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

function toggleCart(btn) {
    const imageId = btn.dataset.id;
    const name = btn.dataset.name;
    const origin = btn.dataset.origin;
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cart.some(c => c.imageId === imageId)) {
        cart = cart.filter(c => c.imageId !== imageId);
        btn.textContent = 'Add to cart';
        btn.classList.remove('inCartBtn');
    }
    else {
        cart.push({ imageId, name, origin });
        btn.textContent = 'Remove from cart';
        btn.classList.add('inCartBtn');
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}
