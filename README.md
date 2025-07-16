# 🛍️ StyleSole - Shopping Website

**StyleSole** is a minimalist shopping website project built with HTML, CSS, and JavaScript. It features a clean product detail layout inspired by Bonfire, with functional cart management and a mock checkout flow.

Live Demo: [https://stylesole.netlify.app](https://stylesole.netlify.app)

## 🚀 Features

- 🖼️ Product display with title, description, price, and large images
- 🛒 Add-to-cart functionality with cart count indicator
- 💾 Cart persistence using localStorage
- 🧾 Cart page with product summary and quantity management
- ✅ Mock checkout form with basic validation and order confirmation message
- 🎨 Clean, modern UI with **Inter** Google Font

## 📁 Project Structure

```
stylesole/
├── index.html          # Product page (home)
├── cart.html           # Cart page
├── checkout.html       # Checkout page
├── src/
│   ├── css/
│   │   └── main.css
│   │   └── cart.css
│   │   └── checkout.css
│   ├── js/
│   │   ├── main/
│   │   │   └── model.js
│   │   │   └── controller.js
│   │   │   └── view.js
│   │   │   └── config.js
│   │   ├── cart/
│   │   │   └── cartController.js
│   │   │   └── cartView.js
│   │   ├── cart/
│   │   │   └── checkoutController.js
│   │   │   └── checkoutView.js
│   │   │   └── checkoutConfig.js
└── img/
```

## 🧪 How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/morgothqwe/stylesole.git
cd stylesole
```

2. Open `index.html` in your browser to browse products.

3. Use the cart icon to view and manage your cart.

## ✅ Future Improvements (Optional)

- Add product filtering or sorting options
- Enhance checkout form validation

## 📄 License

This project is open-source and available under the MIT License.
