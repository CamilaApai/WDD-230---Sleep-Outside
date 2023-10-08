import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();

const cartItems = cart.getCartItems();
const totalElement = document.querySelector(".list-total");    
let total = 0;

// Total$ in Cart
if (cartItems.length > 0) {

    for (const item of cartItems) {
      total += item.FinalPrice;
    }

    totalElement.innerHTML = `Total: $${total.toFixed(2)}`;

} else {
    totalElement.style.display = "none";
  }

const cartFooter = document.querySelector(".list-footer");
cartFooter.classList.remove("hide");