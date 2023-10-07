import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();

const cartItems = cart.getCartItems();
const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);

const totalElement = document.querySelector(".list-total");
totalElement.innerHTML = `Total: $${total.toFixed(2)}`;

const cartFooter = document.querySelector(".list-footer");
cartFooter.classList.remove("hide");
