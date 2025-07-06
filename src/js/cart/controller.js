import view from "./view";
import * as model from "../model";

const controlCartState = function () {
  const cartState = model.cartState();
  view.renderCartState(cartState);
};

const init = function () {
  controlCartState();
};

init();
