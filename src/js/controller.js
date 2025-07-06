import view from "./view";
import * as model from "./model";

const controlAddToCart = function (productInfo) {
  model.addToCart(productInfo);
  const cartQuantity = model.cartQuantity();
  view.renderCartItems(cartQuantity);

  view._openPopupMessage();
  view._closePopupMessage();
};

const controlPrice = function (productId) {
  const price = model.productPrice(productId);
  if (price !== null) {
    view.renderProductPrice(price);
  } else {
    console.error("Product not found for ID:", productId);
  }
};

const init = function () {
  view.addHandlerAddToCart(controlAddToCart);
  view.addHandlerProductSelection(controlPrice);
};

init();
