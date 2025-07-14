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
  model.storeOrderId();
  const orderId = model.getOrderId(); // New function to get current orderId
  model.clearCart();
  view.renderCartItems(0);
  view.clearCheckoutUI(orderId); // Pass orderId to view
};

const controlCheckoutMessage = function () {
  view.renderCheckoutBtn();
  view.addHandlerClearCart(controlClearCart); // Add handler for clearing cart
};

const init = function () {
  controlCartItems();
  controlShopping();
  view.addHandlerGiftCode(controlGiftCode);
  view.renderCheckout();
  controlCheckoutMessage();
};

init();
