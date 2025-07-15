import view from "./checkoutView";
import * as model from "../main/model";

const controlGiftCode = function (giftCode) {
  const newCost = model.addGiftCode(giftCode);
  if (!newCost) return;
  view.renderGiftCode(+newCost, model.shipping());
};

const controlShopping = function () {
  const items = model.cartState();
  view.renderCartItems(items.length); // Update cart quantity
  if (model.isCartEmpty()) {
    view.renderEmptyCheckout();
    return;
  }
  const totalPrice = model.getTotalPrice();
  const shipping = model.shipping();
  view.renderSelectedItems(items, +totalPrice, shipping);
};

const controlClearCart = function () {
  model.clearCart(); // Clear cart after order is saved
  view.renderCartItems(0);
  view.clearCheckoutUI(); // No need to pass orderId
};

const controlCheckout = function () {
  if (model.isCartEmpty()) return; // Prevent checkout with empty cart
  model.storeOrderId(); // Generate and save UUID
  const orderId = model.getOrderId();
  view.showCheckoutMessage(orderId); // Show message with orderId
};

const init = function () {
  controlShopping();
  view.addHandlerGiftCode(controlGiftCode);
  view.renderCheckout(); // check if its necessary or not
  view.addHandlerCheckoutBtn(controlCheckout);
  view.addHandlerClearCart(controlClearCart);
};

init();
