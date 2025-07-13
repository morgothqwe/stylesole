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

  _openPopupMessage() {
    document.querySelector(".added-message").style.display = "grid";
    document
      .querySelectorAll("main, header")
      .forEach((el) => el.classList.add("dimmed"));
  }

  _closePopupMessage() {
    document.querySelector(".close-message").addEventListener("click", (e) => {
      document.querySelector(".added-message").style.display = "none";
      document
        .querySelectorAll("main, header")
        .forEach((el) => el.classList.remove("dimmed"));
    });
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

  renderGiftCode(totalPrice) {
    document.querySelector(".total-price").textContent = `$${+totalPrice}`;
  }

  renderCheckout() {
    if (!this._termsCheckbox || !this._orderBtn) return;

    this._orderBtn.disabled = !this._termsCheckbox.checked;
    this._orderBtn.classList.toggle("enabled", this._termsCheckbox.checked);
    this._orderBtn.classList.toggle("disabled", !this._termsCheckbox.checked);
  }
}

export default new View();
