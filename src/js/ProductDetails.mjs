import { setLocalStorage } from "./utils.mjs";

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

        document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));


        let title = this.product.NameWithoutBrand.charAt().toUpperCase() + this.product.NameWithoutBrand.slice(1);
        document.querySelector("title").textContent += title;
    }

    addToCart(product) {
        setLocalStorage("so-cart", product);
    }

    renderProductDetails(data) {
        document.querySelector("main.divider").innerHTML = "";
        document.querySelector("main.divider").innerHTML = productTemplate(data);
    }

}

function productTemplate(data) {
    return `<section class="product-detail">
    <h3>${data.Brand.Name}</h3>

    <h2 class="divider">${data.NameWithoutBrand}</h2>

    <picture>
        <source srcset="${data.Images.PrimaryLarge}" media="(max-width: 500px)">
        <img
        class="divider"
        src="${data.Images.PrimaryExtraLarge}"
        alt="${data.NameWithoutBrand}"
        />
    </picture>

    <p class="product-card__price">$${data.FinalPrice}</p>

    <p class="product__color">${data.Colors[0].ColorName}</p>

    <p class="product__description">
        ${data.DescriptionHtmlSimple}
    </p>

    <div class="product-detail__add">
      <button id="addToCart" data-id="${data.Id}">Add to Cart</button>
    </div>
  </section>`
}