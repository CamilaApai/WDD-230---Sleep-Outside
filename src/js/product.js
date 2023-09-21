import { setLocalStorage, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();

function addProductToCart(addProduct) {
  setLocalStorage("so-cart", addProduct);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const cartProduct = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(cartProduct);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
