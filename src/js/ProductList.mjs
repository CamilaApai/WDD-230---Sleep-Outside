// ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
};
export default class ProductList {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
  
    async init() {
      try {
        const list = await this.dataSource.getData();
        this.renderList(list);
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      }
    }
  
    renderList(list) {
      renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
};
  