import view from "./view";
import * as model from "./model";

const controlAddToCart = function (productInfo) {
  model.addToCart(productInfo);
  const cartQuantity = model.cartQuantity();
  view.renderCartItems(cartQuantity);
};

const init = function () {
  view.addHandlerAddToCart(controlAddToCart);
};

init();
