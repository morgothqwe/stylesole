const products = [
  {
    id: "p-1",
    name: "classic long sleeve tee",
    price: 28.0,
    color: ["black", "blue", "gray", "red", "pink"],
    size: ["s", "m", "l", "xl", "2xl"],
  },
  {
    id: "p-2",
    name: "pullover hoodie",
    price: 32.0,
    color: ["black", "blue", "gray", "red", "pink"],
    size: ["s", "m", "l", "xl", "2xl"],
  },
  {
    id: "p-3",
    name: "classic unisex tee",
    price: 22.0,
    color: ["black", "blue", "gray", "red", "pink"],
    size: ["s", "m", "l", "xl", "2xl"],
  },
  {
    id: "p-4",
    name: "women's slim fit tee",
    price: 38.0,
    color: ["black", "blue", "gray", "red", "pink"],
    size: ["s", "m", "l", "xl", "2xl"],
  },
  {
    id: "p-5",
    name: "youth unisex tee",
    price: 22.0,
    color: ["black", "blue", "gray", "red", "pink"],
    size: ["s", "m", "l", "xl", "2xl"],
  },
];

const state = {
  carts: [],
};

export const addToCart = function (productInfo) {
  const product = products.find((pd) => pd.id === productInfo.productId);
  if (!product) return;

  // Create a new object to avoid mutating the original
  const cartItem = {
    ...product,
    size: productInfo.sizeId,
    color: productInfo.colorId,
  };
  state.carts.push(cartItem);
  return cartItem;
};
