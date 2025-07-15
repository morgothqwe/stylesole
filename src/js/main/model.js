import { v4 as uuidv4 } from "uuid";
import { STORAGE_KEY, DEFAULT_SHIPPING } from "./config";
import { GIFT_CODE } from "../checkout/checkoutConfig";

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

// Helper function to calculate total price
const calculateTotalPrice = (carts) => {
  const totalPrice = carts
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);
  return totalPrice;
};

const findProduct = (productId) => products.find((pd) => pd.id === productId);

const getStoredData = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return {
      orderId: data.orderId || null,
      carts: data.carts || [],
      totalPrice: data.totalPrice || calculateTotalPrice(data.carts || []),
      shipping: data.shipping || DEFAULT_SHIPPING,
      orders: data.orders || [],
    };
  } catch (e) {
    console.error("Error parsing localStorage data:", e);
    return {
      orderId: null,
      carts: [],
      totalPrice: "0.00",
      shipping: DEFAULT_SHIPPING,
      orders: [],
    };
  }
};

const state = {
  orderId: getStoredData().orderId,
  carts: getStoredData().carts,
  totalPrice: getStoredData().totalPrice,
  shipping: getStoredData().shipping,
  orders: getStoredData().orders,
  isDiscount: false,
};

export const storeOrderId = function () {
  const order = {
    id: uuidv4(),
    items: [...state.carts], // Copy current cart items
    totalPrice: state.totalPrice,
    shipping: state.shipping,
    isDiscount: state.isDiscount,
    timestamp: new Date().toISOString(), // Optional: store order date
  };
  state.orders.push(order); // Add to orders array
  state.orderId = order.id; // Update current orderId
  setLocalStorage();
};

export const addToCart = function (productInfo) {
  const product = findProduct(productInfo.productId);
  console.log(product);
  if (!product) return;

  const cartItem = {
    ...product,
    size: productInfo.sizeId,
    color: productInfo.colorId,
  };
  state.carts.push(cartItem);
  state.totalPrice = calculateTotalPrice(state.carts);
  setLocalStorage();
  return cartItem;
};

export const cartQuantity = function () {
  return state.carts.length;
};

export const cartState = function () {
  return state.carts;
};

export const getTotalPrice = function () {
  return state.totalPrice;
};

export const shipping = function () {
  return state.shipping;
};

export const isCartEmpty = function () {
  return state.carts.length === 0;
};

export const removeFromCart = function (index) {
  if (index >= 0 && index < state.carts.length) {
    state.carts.splice(index, 1); // Remove item at index
    state.totalPrice = calculateTotalPrice(state.carts);
    setLocalStorage();
  }
};

export const productPrice = function (productId) {
  const product = findProduct(productId);
  return product ? product.price : null;
};

export const productImage = function (productId) {
  const product = findProduct(productId);
  return product ? product.bigImage_path : null;
};

export const addGiftCode = function (giftCode) {
  if (giftCode !== GIFT_CODE) return null;
  state.isDiscount = true;
  return (state.totalPrice * 0.9).toFixed(2); // 10% discount
};

// to retrieve the order history for potential UI display
export const getOrderHistory = function () {
  return state.orders;
};

export const getOrderId = function () {
  return state.orderId;
};

export const setLocalStorage = function () {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state }));
};

export const getLocalStorage = function () {
  try {
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storedData && Array.isArray(storedData.carts)) {
      state.carts = storedData.carts;
      state.totalPrice =
        storedData.totalPrice || calculateTotalPrice(storedData.carts);
      state.shipping = storedData.shipping;
    }
  } catch (e) {
    console.error("Error parsing localStorage data:", e);
    state.carts = [];
    state.totalPrice = "0.00";
    state.shipping = DEFAULT_SHIPPING;
  }
};

export const clearCart = function () {
  state.carts = [];
  state.totalPrice = "0.00";
  state.shipping = DEFAULT_SHIPPING;
  state.isDiscount = false;
  setLocalStorage();
};

export const clearLocalStorage = function () {
  localStorage.removeItem(STORAGE_KEY);
};
