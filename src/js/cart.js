import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();

if (cart.total > 0) {
  document.querySelector(".cart-footer").classList.remove("hide");
}

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

// Remove from Cart
const removeButton = document.querySelectorAll(".remove-item");

removeButton.forEach((button) => {
  button.addEventListener("click", RemoveItem);
});

function RemoveItem(event) {
  const itemIdToRemove = event.target.getAttribute("data-id");
  const itemIndex = cartItems.findIndex((item) => item.Id === itemIdToRemove);

  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    cart.updateCart(cartItems);
    cart.renderCartContents();
    totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
  }
}