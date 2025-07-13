import view from "./checkoutView";
import * as model from "../main/model";

const controlGiftCode = function (giftCode) {
  const newCost = model.addGiftCode(giftCode);
  if (!Number.isFinite(newCost)) return;
  const totalPrice = newCost;

  view.renderGiftCode(totalPrice);
};

const controlCartItems = function () {
  const storedCarts = model.cartQuantity();
  view.renderCartItems(storedCarts);
};

const controlShopping = function () {
  const items = model.cartState();
  const totalPrice = model.getTotalPrice();
  const shipping = model.shipping();
  view.renderSelectedItems(items, +totalPrice, shipping);
};

const controlCheckoutMessage = function () {
  view.renderCheckoutBtn();
};

const init = function () {
  controlCartItems();
  controlShopping();
  view.addHandlerGiftCode(controlGiftCode);
  view.renderCheckout();
  controlCheckoutMessage();
};

init();
