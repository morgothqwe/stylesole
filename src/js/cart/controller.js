import view from "./view";
import * as model from "../model";

const controlCartState = function () {
  const cartState = model.cartState();
  view.renderCartState(cartState);
  view.updateCartQuantity(model.cartQuantity());
};

const controlRemoveFromCart = function (index) {
  model.removeFromCart(index); // Update model and localStorage
  const cartState = model.cartState(); // Get updated state
  view.renderCartState(cartState); // Re-render cart
  view.updateCartQuantity(model.cartQuantity()); // Update quantity
};

const init = function () {
  controlCartState();
  view.addHandlerRemoveProduct(controlRemoveFromCart); // Pass remove handler to view
};

init();
