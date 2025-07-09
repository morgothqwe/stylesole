import style1 from "url:../../img/style-1.webp";
import style2 from "url:../../img/style-2.webp";
import style3 from "url:../../img/style-3.webp";
import style4 from "url:../../img/style-4.webp";
import style5 from "url:../../img/style-5.webp";
import bigStyle1 from "url:../../img/bigStyle-1.webp";
import bigStyle2 from "url:../../img/bigStyle-2.webp";
import bigStyle3 from "url:../../img/bigStyle-3.webp";
import bigStyle4 from "url:../../img/bigStyle-4.webp";
import bigStyle5 from "url:../../img/bigStyle-5.webp";

const products = [
  {
    id: "p-1",
    name: "classic long sleeve tee",
    price: 28.0,
    image_path: style1,
    bigImage_path: bigStyle1,
    color: ["black", "blue", "gray", "red", "pink"],
    size: ["s", "m", "l", "xl", "2xl"],
  },
  {
    id: "p-2",
    name: "pullover hoodie",
    price: 32.0,
    image_path: style2,
    bigImage_path: bigStyle2,
    color: ["black", "blue", "gray", "red", "pink"],
    size: ["s", "m", "l", "xl", "2xl"],
  },
  {
    id: "p-3",
    name: "classic unisex tee",
    price: 22.0,
    image_path: style3,
    bigImage_path: bigStyle3,
    color: ["black", "blue", "gray", "red", "pink"],
    size: ["s", "m", "l", "xl", "2xl"],
  },
  {
    id: "p-4",
    name: "women's slim fit tee",
    price: 38.0,
    image_path: style4,
    bigImage_path: bigStyle4,
    color: ["black", "blue", "gray", "red", "pink"],
    size: ["s", "m", "l", "xl", "2xl"],
  },
  {
    id: "p-5",
    name: "youth unisex tee",
    price: 22.0,
    image_path: style5,
    bigImage_path: bigStyle5,
    color: ["black", "blue", "gray", "red", "pink"],
    size: ["s", "m", "l", "xl", "2xl"],
  },
];

const state = {
  carts: JSON.parse(localStorage.getItem("cart")) || [], // Load from localStorage on init
};

export const addToCart = function (productInfo) {
  const product = products.find((pd) => pd.id === productInfo.productId);
  if (!product) return;

  const cartItem = {
    ...product,
    size: productInfo.sizeId,
    color: productInfo.colorId,
  };
  state.carts.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(state.carts)); // Save to localStorage
  return cartItem;
};

export const cartQuantity = function () {
  return state.carts.length;
};

export const cartState = function () {
  return state.carts;
};

export const removeFromCart = function (index) {
  if (index >= 0 && index < state.carts.length) {
    state.carts.splice(index, 1); // Remove item at index
    localStorage.setItem("cart", JSON.stringify(state.carts)); // Update localStorage
  }
};

export const productPrice = function (productId) {
  const product = products.find((item) => item.id === productId);
  return product ? product.price : null;
};

export const productImage = function (productId) {
  const product = products.find((item) => item.id === productId);
  return product ? product.bigImage_path : null;
};
