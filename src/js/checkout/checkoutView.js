class View {
  constructor() {
    this._termsCheckbox = document.querySelector(".terms-checkbox");
    this._orderBtn = document.querySelector(".order-btn");
    this._bindEvents();
  }

  // Terms and Conditions Check
  _bindEvents() {
    if (this._termsCheckbox) {
      this._termsCheckbox.addEventListener("change", () =>
        this.renderCheckout()
      );
    }
  }

  _openCheckoutMessage() {
    document.querySelector(".checkout-message").style.display = "grid";
    document
      .querySelectorAll("main, header")
      .forEach((el) => (el.style.opacity = 0.6));
  }

  // After closing checkout, an order with id number should store in model.js. then localstorage get clear and UI also clean
  addHandlerClearCart(handler) {
    document.querySelector(".close-message").addEventListener("click", (e) => {
      this._openCheckoutMessage();
      handler(); // Call controller to clear cart
    });
  }

  clearCheckoutUI() {
    document.querySelector(".products-list").replaceChildren();
    document
      .querySelectorAll(".shipping-price, .total-price")
      .forEach((el) => (el.textContent = ""));
    document.querySelector(".item-number").textContent = "0";
    document.querySelector(".checkout-message").style.display = "none";
    document
      .querySelectorAll("main, header")
      .forEach((el) => (el.style.opacity = 1));
  }

  addHandlerGiftCode(handler) {
    document.querySelector(".gift-btn").addEventListener("click", (e) => {
      e.preventDefault();
      const giftCode = document.querySelector(".gift-card").value.trim();
      if (!giftCode) return;

      handler(giftCode);
    });
  }

  renderCartItems(items) {
    document.querySelector(".item-number").textContent = items;
  }

  renderSelectedItems(items, totalPrice, shipping) {
    const markups = items
      .map((item) => {
        return `
        <div class="product">
          <div class="product-img">
            <img src="${item.image_path}" alt="${item.name}" class="image" />
          </div>
          <div class="product-info">
            <div>
              <span>${item.name}</span>
              <span>(1)</span>
            </div>
            <div>
              <span>${item.color}</span>
              <span class="product-size">${item.size}</span>
            </div>
          </div>
          <div class="product-price">
            <span>$${item.price.toFixed(2)}</span>
          </div>
        </div>
    `;
      })
      .join("");

    document
      .querySelector(".products-list")
      .insertAdjacentHTML("afterbegin", markups);

    document.querySelector(".shipping-price").textContent = `$${shipping}`;
    document.querySelector(".total-price").textContent = `$${(
      totalPrice + shipping
    ).toFixed(2)}`;
  }

  renderGiftCode(totalPrice, shipping) {
    document.querySelector(".total-price").textContent = `$${
      +totalPrice + shipping
    }`;
  }

  // Enable or Disable checkout btn
  renderCheckout() {
    if (!this._termsCheckbox || !this._orderBtn) return;

    this._orderBtn.disabled = !this._termsCheckbox.checked;
    this._orderBtn.classList.toggle("enabled", this._termsCheckbox.checked);
    this._orderBtn.classList.toggle("disabled", !this._termsCheckbox.checked);
  }

  renderCheckoutBtn() {
    this._orderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this._openCheckoutMessage();
    });
  }
}

export default new View();
