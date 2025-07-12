import view from "./checkoutView";
import * as model from "../main/model";

const controlGiftCode = function (giftCode) {
  model.addGiftCode(giftCode);
};

const init = function () {
  const storedCarts = model.cartQuantity();
  view.renderCartItems(storedCarts);

  const items = model.cartState();
  const totalPrice = model.getTotalPrice();
  const shipping = model.shipping();
  view.renderSelectedItems(items, +totalPrice, shipping);
};

init();
