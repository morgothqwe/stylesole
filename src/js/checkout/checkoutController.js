import view from "./checkoutView";
import * as model from "../main/model";

const controlGiftCode = function (giftCode) {
  const newCost = model.addGiftCode(giftCode);
  if (!Number.isFinite(newCost)) return;
  const totalPrice = newCost;
  const shipping = model.shipping();

  view.renderGiftCode(totalPrice, shipping);
};

const controlCartItems = function () {
  const storedCarts = model.cartQuantity();
  view.renderCartItems(storedCarts);
};

const controlShopping = function () {
  const items = model.cartState();
  if (model.isCartEmpty()) {
    view.renderEmptyCheckout(); // For initial load/refresh with empty cart
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

const controlCheckoutMessage = function () {
  view.addHandlerCheckoutBtn(controlCheckout); // New handler
  view.addHandlerClearCart(controlClearCart);
};

const controlCheckout = function () {
  if (model.isCartEmpty()) return; // Prevent checkout with empty cart
  model.storeOrderId(); // Generate and save UUID
  const orderId = model.getOrderId();
  view.showCheckoutMessage(orderId); // Show message with orderId
};

const init = function () {
  controlCartItems();
  controlShopping();
  view.addHandlerGiftCode(controlGiftCode);
  view.renderCheckout();
  controlCheckoutMessage();
};

init();
