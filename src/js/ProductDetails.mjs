import { getLocalStorage, setLocalStorage, updateCountDisplay, alertMessage } from "./utils.mjs";


export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(this.product)
    document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    let cartContents = getLocalStorage("so-cart");
    // Check to see if there was anything there or if it's not an array
    if (!cartContents || !Array.isArray(cartContents)) {
      cartContents = [];
    }
    // Then add the current product to the list
    cartContents.push(this.product);
    setLocalStorage("so-cart", cartContents);
    updateCountDisplay();
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
  }

  renderProductDetails(data) {
    document.querySelector(".divider").innerHTML = "";
    document.querySelector(".divider").innerHTML = productTemplate(data);

    document.getElementById("colorSelector").addEventListener("change", () => updateProductImage(data));
  }
}

function updateProductImage(data) {
  const selectedColorData = data.Colors.find(color => color.ColorName === document.getElementById("colorSelector").value);
  const productImage = document.querySelector(".divider img");
  productImage.src = selectedColorData.ColorPreviewImageSrc;
}

function productTemplate(data) {
  const colorOptions = data.Colors.map(color => `<option value="${color.ColorName}">${color.ColorName}</option>`);

  return `<section class="product-detail">
    <h3>${data.Brand.Name}</h3>
    <h2 class="divider">${data.NameWithoutBrand}</h2>
    <img class="divider" src="${data.Images.PrimaryLarge}" alt="${data.NameWithoutBrand}"/>
    <p class="product-card__price">${data.FinalPrice}</p>
    
    <label for="colorSelector">Select Color:</label>
    <select id="colorSelector" class="product__color">
      ${colorOptions.join("")}
    </select>
    
    <p class="product__description">
      ${data.DescriptionHtmlSimple}
    </p>
    
    <div class="product-detail__add">
      <button id="addToCart" data-id="${data.Id}">Add to Cart</button>
    </div>
  </section>`;
}