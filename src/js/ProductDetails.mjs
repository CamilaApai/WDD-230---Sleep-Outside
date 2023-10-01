
export default class ProductDetails {
    constructor(productId, dataSource, discounted=false) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
        this.discounted = discounted;
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
    }

    addToCart(product) {
        setLocalStorage("so-cart", product);
    }

    renderProductDetails(data) {
        document.querySelector(".divider").innerHTML = "";
        if (!this.discounted) {
            document.querySelector(".divider").innerHTML = productTemplateNoDiscount(data);
        }
        else {
            document.querySelector(".divider").innerHTML = productTemplateYesDiscount(data);
        }
    }
}

function productTemplateYesDiscount(data) {
    return `<section class="product-detail">
    <h3>${data.Brand.Name}</h3>

    <h2 class="divider">${data.NameWithoutBrand}</h2>

    <img
      class="divider"
      src="${data.Image}"
      alt="${data.NameWithoutBrand}"
    />

    <p class="product-card__price">${data.FinalPrice}</p>
    <div class="discount-info">
        <p class="discount-percent">Discount: ${data.DiscountPercent}</p>
        <div class="discount-div">
            <span class="discount-amount">${data.FinalPrice - ((data.FinalPrice * data.DiscountPercent)/100)}</span>
        </div>
    </div>

    <p class="product__color">${data.Colors[0].ColorName}</p>

    <p class="product__description">
        ${data.DescriptionHtmlSimple}
    </p>

    <div class="product-detail__add">
      <button id="addToCart" data-id="${data.Id}">Add to Cart</button>
    </div>
  </section>`
}
function productTemplateNoDiscount(data) {
    return `<section class="product-detail">
    <h3>${data.Brand.Name}</h3>

    <h2 class="divider">${data.NameWithoutBrand}</h2>

    <img
      class="divider"
      src="${data.Image}"
      alt="${data.NameWithoutBrand}"
    />

    <p class="product-card__price">${data.FinalPrice}</p>

    <p class="product__color">${data.Colors[0].ColorName}</p>

    <p class="product__description">
        ${data.DescriptionHtmlSimple}
    </p>

    <div class="product-detail__add">
      <button id="addToCart" data-id="${data.Id}">Add to Cart</button>
    </div>
  </section>`
}