class View {
  _addToCart = document.querySelector(".add-to-cart");
  _productSize = document.querySelector(".size-picker");
  _productColor = document.querySelector(".color-picker");

  constructor() {
    // Initialize event listeners for color and size selection
    this._addHandlerColorSelection();
    this._addHandlerSizeSelection();
    this._addHandlerProductSelection();
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

  _addHandlerProductSelection() {
    document.querySelector(".style-slide").addEventListener("click", (e) => {
      const productEl = e.target.closest(".image-info");
      if (!productEl) return;

      document
        .querySelectorAll(".style-slide .image-info")
        .forEach((el) => el.classList.remove("selected"));
      // Add 'selected' class to the clicked product
      productEl.classList.add("selected");
    });
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
}

export default new View();
