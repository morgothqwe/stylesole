class View {
  constructor() {
    this._termsCheckbox = document.querySelector(".terms-checkbox");
    this._orderBtn = document.querySelector(".order-btn");
    this._productsList = document.querySelector(".products-list");
    this._shippingPrice = document.querySelector(".shipping-price");
    this._totalPrice = document.querySelector(".total-price");
    this._itemNumber = document.querySelector(".item-number");
    this._checkoutMessage = document.querySelector(".checkout-message");
    this._mainHeader = document.querySelectorAll("main, header");
    this._bindEvents();
  }

  _bindEvents() {
    if (this._termsCheckbox) {
      this._termsCheckbox.addEventListener("change", () =>
        this.renderCheckout()
      );
    }
  }

  _openCheckoutMessage() {
    this._checkoutMessage.style.display = "grid";
    document
      .querySelectorAll("main, header")
      .forEach((el) => (el.style.opacity = 0.6));
  }

  addHandlerCheckoutBtn(handler) {
    this._orderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler(); // Call controller to generate orderId and show message
    });
  }

  addHandlerClearCart(handler) {
    const closeButton = document.querySelector(".close-message");
    if (closeButton) {
      closeButton.addEventListener(
        "click",
        (e) => {
          handler();
        },
        { once: true }
      );
    } else {
      console.warn("Close message button not found");
    }
  }

  showCheckoutMessage(orderId) {
    const messageEl = this._checkoutMessage;
    if (orderId && messageEl) {
      const shortOrderId = orderId.slice(0, 8);
      messageEl.querySelector(
        ".message-text"
      ).textContent = `Order #${shortOrderId} successfully placed`;
    }
    this._openCheckoutMessage();
  }

  clearCartUI() {
    this._productsList.replaceChildren();
    this._shippingPrice.textContent = "";
    this._totalPrice.textContent = "";
    this._itemNumber.textContent = "0";
    this._checkoutMessage.style.display = "none";
    this._mainHeader.forEach((el) => (el.style.opacity = 1));
    this._termsCheckbox.checked = false;
    this._orderBtn.classList.add("disabled");
    this._orderBtn.disabled = true;
  }

  clearCheckoutUI() {
    this.clearCartUI();
  }

  renderEmptyCheckout() {
    this.clearCartUI();
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
    this._itemNumber.textContent = items;
  }

  _generateProductMarkup(item) {
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
  }

  renderSelectedItems(items, totalPrice, shipping) {
    const markups = items.map(this._generateProductMarkup).join("");
    this._productsList.insertAdjacentHTML("afterbegin", markups);
    this._shippingPrice.textContent = `$${shipping.toFixed(2)}`;
    this._totalPrice.textContent = `$${(totalPrice + shipping).toFixed(2)}`;
  }

  renderGiftCode(totalPrice, shipping) {
    this._totalPrice.textContent = `$${+totalPrice + shipping}`;
  }

  renderCheckout() {
    if (!this._termsCheckbox || !this._orderBtn) return;
    const isCartEmpty = this._itemNumber.textContent === "0";
    this._orderBtn.disabled = !this._termsCheckbox.checked || isCartEmpty;
  }
}

export default new View();
