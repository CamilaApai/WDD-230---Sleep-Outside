// Import the ProductListing class from ProductList.mjs
import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

// Example usage:
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, listElement);

listing.init();
