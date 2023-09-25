import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

// discount indicator
document.addEventListener("DOMContentLoaded", function () {
  const priceElement = document.querySelector(".product-card__price");
  const discountElement = document.querySelector(".discount");
  // Update the discount indicator element
  const discountIndicator = document.querySelector(".discount-indicator");
  const discountAmountElement = document.querySelector(".discount-amount");

  // Get the price and discount percentage from the HTML
  const price = parseFloat(priceElement.textContent.replace("$", ""));
  const discountPercentage = parseFloat(
    discountElement.textContent.replace("Discount: ", "").replace("%", "")
  );

  // Calculate the discount amount
  const discountAmount = price - ((price * discountPercentage) / 100);

  // Update the text content of the discount indicator
  discountAmountElement.textContent = "$" + discountAmount.toFixed(0);
});
