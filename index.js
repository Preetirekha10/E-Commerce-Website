let slides = document.querySelectorAll(".slideCard");
let card = document.querySelectorAll(".card");
let count = 0;
let cartItems = [];
let cartCount = 0;

// Slide positioning
slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

function slideCarousel() {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${count * 100}%)`;
  });
}

setInterval(() => {
  count++;
  if (count === slides.length) count = 0;
  slideCarousel();
}, 2000);

// Show product detail
card.forEach(function (cards) {
  cards.addEventListener("click", function () {
    document.querySelector(".container").style.display = "none";

    let title = cards.getAttribute("data-title");
    let price = cards.getAttribute("data-price");

    let div = document.createElement("div");
    div.classList.add("product-detail");
    div.innerHTML = `
      <div class="product-img">
        <img src="${cards.querySelector("img").src}" alt="">
      </div>
      <div class="product-info">
        <h2>${title}</h2>
        <h3>Price: ₹${price}</h3>
        <p>🌟🌟🌟🌟☆</p>
        <p>Select Size:</p>
        <select id="sizeSelect">
          <option value="">--Select--</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
        <div class="buttons">
          <button id="buyBtn">Buy Now</button>
          <button id="cartBtn">Add To Cart</button>
          <button class="back">Back</button>
        </div>
        <p style="margin-top:10px;"><strong>Cart Items:</strong> <span id="cartCounter">${cartCount}</span></p>
      </div>
    `;
    document.body.appendChild(div);

    // Buy Now
    div.querySelector("#buyBtn").addEventListener("click", () => {
      const selectedSize = document.querySelector("#sizeSelect").value;
      if (!selectedSize) {
        alert("Please select a size!");
        return;
      }
      alert(`Thank you for buying ${title} (Size: ${selectedSize})!`);
    });

    // Add to Cart
    div.querySelector("#cartBtn").addEventListener("click", () => {
      const selectedSize = document.querySelector("#sizeSelect").value;
      if (!selectedSize) {
        alert("Please select a size to add to cart!");
        return;
      }

      cartItems.push({ 
        image: cards.querySelector("img").src, 
        size: selectedSize, 
        title: title, 
        price: Number(price)
      });
      cartCount++;
      document.querySelector("#cartCounter").textContent = cartCount;
      alert(`${title} (Size: ${selectedSize}) added to cart`);
    });

    // Back Button
    div.querySelector(".back").addEventListener("click", () => {
      div.remove();
      document.querySelector(".container").style.display = "block";
    });
  });
});

// Search functionality
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  card.forEach((c) => {
    const title = c.getAttribute("data-title").toLowerCase();
    if (title.includes(query)) {
      c.style.display = "block";
    } else {
      c.style.display = "none";
    }
  });
});

// Show cart panel
const bagIcon = document.querySelector("#bagIcon");
const cartPanel = document.querySelector("#cartPanel");
bagIcon.addEventListener("click", () => {
  if (cartPanel.style.display === "block") {
    cartPanel.style.display = "none";
  } else {
    updateCartPanel();
    cartPanel.style.display = "block";
  }
});

// Update cart panel content
function updateCartPanel() {
  const list = document.querySelector("#cartItemList");
  list.innerHTML = "";

  let total = 0;
  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.image}" width="40" style="border-radius:5px;"> 
      ${item.title} - Size: ${item.size} - ₹${item.price}
    `;
    list.appendChild(li);
    total += item.price;
  });

  document.querySelector("#cartTotal").textContent = `Total: ₹${total}`;
}