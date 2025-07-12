class View {
  addHandlerGiftCode(handler) {
    document.querySelector(".gift-btn").addEventListener("click", (e) => {
      e.preventDefault();

      const giftCode = document.querySelector(".gift-card").textContent;
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

    document.querySelector(".shipping-price").textContent = shipping;
    document.querySelector(".total-price").textContent = `$${(
      totalPrice + shipping
    ).toFixed(2)}`;
  }
}

export default new View();
