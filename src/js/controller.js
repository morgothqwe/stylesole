import view from "./view";
import * as model from "./model";

const controlAddToCart = function (productInfo) {
  const product = model.addToCart(productInfo);
  console.log(product);
};

const init = function () {
  view.addHandlerAddToCart(controlAddToCart);
};

init();
