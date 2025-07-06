import cartEmptyImg from "url:../../img/cart-empty.svg";
import shopImg from "url:../../img/style-1.webp";

class View {
  _cartInfo = document.querySelector(".cart-info");

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
      const markup = cartState.map(
        (item) => `
        <a href="index.html" class="shop-link">green apple books</a>
        <div class="cart-label">
          <span class="qty">qty</span>
          <span class="product-name">product</span>
          <span class="size">size</span>
          <span class="price">price</span>
        </div>
        <form action="" class="product-form">
          <img src="${shopImg}" alt="" class="product-image" />
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
            <option value="Pullover_Hoodie">Pullover Hoodie</option>
            <option value="Classic_Long_Sleeve_Tee">
              Classic Long Sleeve Tee
            </option>
            <option value="Classic_Unisex_Tee">Classic Unisex Tee</option>
            <option value="Women_Slim_Fit_Tee">Women's Slim Fit Tee</option>
            <option value="Youth_Unisex_Tee">Youth Unisex Tee</option>
          </select>
          <select name="" id="" class="product-size">
            <option value="empty">--</option>
            <option value="s">s</option>
            <option value="m">m</option>
            <option value="l">l</option>
            <option value="xl">xl</option>
            <option value="2xl">2xl</option>
          </select>
          <span class="product-price">
            <span>$${item.price.toFixed(2)}</span>
            <span>USD</span>
          </span>
          <span class="remove-product"></span>
          <span class="color-picker">
            <span class="pd-color color-1" data-color="color-1"></span>
            <span class="pd-color color-2" data-color="color-2"></span>
            <span class="pd-color color-3" data-color="color-3"></span>
            <span class="pd-color color-4" data-color="color-4"></span>
            <span class="pd-color color-5" data-color="color-5"></span>
          </span>
        </form>

        <div class="check-out">
          <a href="#" class="check-out-card">Check out with Card</a>
          <a href="#" class="check-out-crypto"
            >Check out with <em class="btc">Bitcoin</em></a
          >
        </div>
      `
      );
      this._cartInfo.innerHTML = "";
      if (this._cartInfo.classList.contains("empty-cart")) {
        this._cartInfo.classList.toggle("empty-cart");
      }
      this._cartInfo.classList.add("full-cart");
      this._cartInfo.insertAdjacentHTML("afterbegin", markup);
    }
  }
}

export default new View();
