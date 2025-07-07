class View {
  _addToCart = document.querySelector(".add-to-cart");
  _productSize = document.querySelector(".size-picker");
  _productColor = document.querySelector(".color-picker");
  _loginMenu = document.querySelector(".login-menu");
  _login = document.querySelector(".login");

  constructor() {
    // Initialize event listeners
    this._addHandlerLogin();
    this._addHandlerColorSelection();
    this._addHandlerSizeSelection();
    this._setDefaultSelections();
    this._closeLogin();
  }

  _addHandlerLogin() {
    this._loginMenu.addEventListener("click", (e) => {
      e.preventDefault();

      if (this._login.classList.contains("hidden")) {
        this._login.classList.remove("hidden");
        document
          .querySelectorAll("main, header")
          .forEach((el) => el.classList.add("dimmed"));
      }
    });
  }

  _addHandlerColorSelection() {
    this._productColor.addEventListener("click", (e) => {
      const colorEl = e.target.closest(".pd-color");
      if (!colorEl) return;

      this._productColor
        .querySelectorAll(".pd-color")
        .forEach((el) => el.classList.remove("selected"));
      colorEl.classList.add("selected");
    });
  }

  _addHandlerSizeSelection() {
    this._productSize.addEventListener("click", (e) => {
      const sizeEl = e.target.closest(".pd-size");
      if (!sizeEl) return;

      this._productSize
        .querySelectorAll(".pd-size")
        .forEach((el) => el.classList.remove("selected"));
      sizeEl.classList.add("selected");
    });
  }

  _addHandlerProductSelection(handler) {
    document.querySelector(".style-slide").addEventListener("click", (e) => {
      const productEl = e.target.closest(".image-info");
      if (!productEl) return;

      document
        .querySelectorAll(".style-slide .image-info")
        .forEach((el) => el.classList.remove("selected"));
      // Add 'selected' class to the clicked product
      productEl.classList.add("selected");

      const productId = productEl.dataset.id;
      if (handler && productId) {
        handler(productId); // Call handler for price update
      }
    });
  }

  addHandlerProductSelection(handler) {
    this._handlerProductSelection = handler; // Store handler for default selection
    this._addHandlerProductSelection(handler); // Pass handler to internal method
  }

  renderProductPrice(price) {
    document.querySelector(".product-price").textContent = "";
    document.querySelector(".product-price").textContent = `$${price.toFixed(
      2
    )} USD`;
  }

  _setDefaultSelections() {
    // Set default color (first .pd-color)
    const defaultColor = this._productColor.querySelector(".pd-color");
    if (defaultColor) defaultColor.classList.add("selected");

    // Set default size (first .pd-size)
    const defaultSize = this._productSize.querySelector(".pd-size");
    if (defaultSize) defaultSize.classList.add("selected");

    // Set default product (first .image-info)
    const defaultProduct = document.querySelector(".style-slide .image-info");
    if (defaultProduct) defaultProduct.classList.add("selected");
  }

  addHandlerAddToCart(handler) {
    this._addToCart.addEventListener("click", (e) => {
      e.preventDefault();
      // Select product
      const product = document.querySelector(`.image-info.selected`);
      if (!product) return;

      const productId = product.dataset.id;
      if (!productId) return;

      // select product color
      const color = this._productColor.querySelector(".pd-color.selected");
      if (!color) return;

      const colorId = this._mapColorId(color.dataset.color);
      if (!colorId) return;

      // select product size
      const size = this._productSize.querySelector(".pd-size.selected");
      if (!size) return;

      const sizeId = this._mapSizeId(size.dataset.size);
      if (!sizeId) return;

      const productInfo = { productId, colorId, sizeId };
      handler(productInfo);
    });
  }

  // Map data-color to model.js color values
  _mapColorId(dataColor) {
    const colorMap = {
      "color-1": "black",
      "color-2": "blue",
      "color-3": "gray",
      "color-4": "red",
      "color-5": "pink",
    };
    return colorMap[dataColor] || null;
  }

  // Map data-size to model.js size values
  _mapSizeId(dataSize) {
    const sizeMap = {
      "size-1": "s",
      "size-2": "m",
      "size-3": "l",
      "size-4": "xl",
      "size-5": "2xl",
    };
    return sizeMap[dataSize] || null;
  }

  renderCartItems(items) {
    document.querySelector(".item-number").textContent = items;
  }

  _openPopupMessage() {
    document.querySelector(".added-message").style.display = "grid";
    document
      .querySelectorAll("main, header")
      .forEach((el) => el.classList.add("dimmed"));
  }

  _closePopupMessage() {
    document.querySelectorAll(".close-message, .shopping-btn").forEach((el) =>
      el.addEventListener("click", (e) => {
        document.querySelector(".added-message").style.display = "none";
        document
          .querySelectorAll("main, header")
          .forEach((el) => el.classList.remove("dimmed"));
      })
    );
  }

  _closeLogin() {
    document
      .querySelector(".login-close-message")
      .addEventListener("click", (e) => {
        this._login.classList.add("hidden");
        document
          .querySelectorAll("main, header")
          .forEach((el) => el.classList.remove("dimmed"));
      });
  }
}

export default new View();
