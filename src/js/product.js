import { getParams, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// discount indicator
/*
document.addEventListener("DOMContentLoaded", function () {
  const priceElement = document.querySelector(".product-card__price");
  const discountElement = document.querySelector(".discount");
  // Update the discount indicator element
  // const discountIndicator = document.querySelector(".discount-indicator");
  const discountAmountElement = document.querySelector(".discount-amount");

  // Get the price and discount percentage from the HTML
  const price = parseFloat(priceElement.textContent.replace("$", ""));
  const discountPercentage = parseFloat(
    discountElement.textContent.replace("Discount: ", "").replace("%", "")
  );

  // Calculate the discount amount
  const discountAmount = price - (price * discountPercentage) / 100;

  // Update the text content of the discount indicator
  discountAmountElement.textContent = "$" + discountAmount.toFixed(0);
});
*/
