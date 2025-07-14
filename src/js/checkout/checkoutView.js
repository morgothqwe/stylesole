class View {
  constructor() {
    this._termsCheckbox = document.querySelector(".terms-checkbox");
    this._orderBtn = document.querySelector(".order-btn");
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
    document.querySelector(".checkout-message").style.display = "grid";
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
    const messageEl = document.querySelector(".checkout-message");
    if (orderId && messageEl) {
      const shortOrderId = orderId.slice(0, 8);
      messageEl.querySelector(
        ".message-text"
      ).textContent = `Order #${shortOrderId} successfully placed`;
    }
    this._openCheckoutMessage();
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
    this._termsCheckbox.checked = !this._termsCheckbox.checked;
    this._orderBtn.classList.toggle(
      "disabled",
      !this._termsCheckbox.checked || isCartEmpty
    );
  }

  renderEmptyCheckout() {
    document.querySelector(".products-list").replaceChildren();
    document
      .querySelectorAll(".shipping-price, .total-price")
      .forEach((el) => (el.textContent = ""));
    document.querySelector(".item-number").textContent = "0";
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

  renderCheckout() {
    if (!this._termsCheckbox || !this._orderBtn) return;

    const isCartEmpty =
      document.querySelector(".item-number").textContent === "0";
    this._orderBtn.disabled = !this._termsCheckbox.checked || isCartEmpty;
    this._orderBtn.classList.toggle(
      "enabled",
      this._termsCheckbox.checked && !isCartEmpty
    );
    this._orderBtn.classList.toggle(
      "disabled",
      !this._termsCheckbox.checked || isCartEmpty
    );
  }
}

export default new View();
