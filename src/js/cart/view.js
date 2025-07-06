import cartEmptyImg from "url:../../img/cart-empty.svg";

class View {
  _cartInfo = document.querySelector(".cart-info");

  constructor() {
    this._handlerRemoveProduct = null; // Store callback for remove action
  }

  addHandlerRemoveProduct(handler) {
    this._handlerRemoveProduct = handler; // Save handler from controller
    this._cartInfo.addEventListener("click", (e) => {
      const removeBtn = e.target.closest(".remove-product");
      if (!removeBtn) return;

      const form = removeBtn.closest(".product-form");
      const index = Array.from(form.parentNode.children).indexOf(form) - 2; // Adjust for shop-link and cart-label
      this._handlerRemoveProduct(index); // Call controller handler with index
    });
  }

  renderCartState(cartState) {
    if (Array.isArray(cartState) && cartState.length === 0) {
      const markup = `
        <span class="empty-cart">
          <img
            src="${cartEmptyImg}"
            alt="empty cart"
            class="empty-cart-img"
          />
        </span>
        <span class="empty-cart-message">your cart is empty</span>
        <a href="index.html" class="explore-shop">Add something to it.</a>
      `;
      this._cartInfo.innerHTML = "";
      if (this._cartInfo.classList.contains("full-cart")) {
        this._cartInfo.classList.remove("full-cart");
      }
      this._cartInfo.classList.add("empty-cart");
      this._cartInfo.insertAdjacentHTML("afterbegin", markup);
    }

    if (Array.isArray(cartState) && cartState.length !== 0) {
      const colorMap = {
        black: "color-1",
        blue: "color-2",
        gray: "color-3",
        red: "color-4",
        pink: "color-5",
      };

      const markup = cartState
        .map((item) => {
          const selectedColorClass = colorMap[item.color] || "color-1";
          return `
        <form action="" class="product-form">
          <img src="${item.image_path}" alt="${
            item.name
          }" class="product-image" />
          <input
            type="number"
            name=""
            id=""
            class="cart-qty"
            value="1"
            min="1"
            step="1"
          />
          <select name="" id="" class="product-list">
            <option value="Pullover_Hoodie" ${
              item.name === "pullover hoodie" ? "selected" : ""
            }>Pullover Hoodie</option>
            <option value="Classic_Long_Sleeve_Tee" ${
              item.name === "classic long sleeve tee" ? "selected" : ""
            }>Classic Long Sleeve Tee</option>
            <option value="Classic_Unisex_Tee" ${
              item.name === "classic unisex tee" ? "selected" : ""
            }>Classic Unisex Tee</option>
            <option value="Women_Slim_Fit_Tee" ${
              item.name === "women's slim fit tee" ? "selected" : ""
            }>Women's Slim Fit Tee</option>
            <option value="Youth_Unisex_Tee" ${
              item.name === "youth unisex tee" ? "selected" : ""
            }>Youth Unisex Tee</option>
          </select>
          <select name="" id="" class="product-size">
            <option value="empty">--</option>
            <option value="s" ${item.size === "s" ? "selected" : ""}>s</option>
            <option value="m" ${item.size === "m" ? "selected" : ""}>m</option>
            <option value="l" ${item.size === "l" ? "selected" : ""}>l</option>
            <option value="xl" ${
              item.size === "xl" ? "selected" : ""
            }>xl</option>
            <option value="2xl" ${
              item.size === "2xl" ? "selected" : ""
            }>2xl</option>
          </select>
          <span class="product-price">
            <span>$${item.price.toFixed(2)}</span>
            <span>USD</span>
          </span>
          <span class="remove-product"></span>
          <span class="color-picker">
            <span class="pd-color color-1 ${
              selectedColorClass === "color-1" ? "selected" : ""
            }" data-color="color-1"></span>
            <span class="pd-color color-2 ${
              selectedColorClass === "color-2" ? "selected" : ""
            }" data-color="color-2"></span>
            <span class="pd-color color-3 ${
              selectedColorClass === "color-3" ? "selected" : ""
            }" data-color="color-3"></span>
            <span class="pd-color color-4 ${
              selectedColorClass === "color-4" ? "selected" : ""
            }" data-color="color-4"></span>
            <span class="pd-color color-5 ${
              selectedColorClass === "color-5" ? "selected" : ""
            }" data-color="color-5"></span>
          </span>
        </form>
      `;
        })
        .join("");

      this._cartInfo.innerHTML = "";
      if (this._cartInfo.classList.contains("empty-cart")) {
        this._cartInfo.classList.toggle("empty-cart");
      }
      this._cartInfo.classList.add("full-cart");
      this._cartInfo.insertAdjacentHTML(
        "afterbegin",
        `
        <a href="index.html" class="shop-link">green apple books</a>
        <div class="cart-label">
          <span class="qty">qty</span>
          <span class="product-name">product</span>
          <span class="size">size</span>
          <span class="price">price</span>
        </div>
        `
      );
      this._cartInfo.insertAdjacentHTML("beforeend", markup);
      this._cartInfo.insertAdjacentHTML(
        "beforeend",
        `
        <div class="check-out">
          <a href="#" class="check-out-card">Check out with Card</a>
          <a href="#" class="check-out-crypto"
            >Check out with <em class="btc">Bitcoin</em></a
          >
        </div>
        `
      );
    }
  }

  updateCartQuantity(quantity) {
    document.querySelector(".item-number").textContent = quantity;
  }
}

export default new View();
