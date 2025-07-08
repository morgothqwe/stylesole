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

const controlImage = function (productId) {
  const image = model.productImage(productId);
  if (image !== null) {
    view.renderImage(image);
  } else {
    console.error("Product not found for ID:", productId);
  }
};

// New combined handler function
const controlProductSelection = function (productId) {
  controlPrice(productId); // Call price handler
  controlImage(productId); // Call image handler
};

const init = function () {
  view.addHandlerAddToCart(controlAddToCart);
  view.addHandlerProductSelection(controlProductSelection); // Pass single handler
};

init();
