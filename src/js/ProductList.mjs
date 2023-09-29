import { renderListWithTemplate } from "./utils.mjs";


export function productCardTemplate(product) {
    return `<li class="product-card">
                <a href="/product_pages/?product=${product.Id}">
                <picture>
                    <source srcset="${product.Images.PrimaryMedium}" media="(max-width: 500px)">
                    <img src="${product.Images.PrimaryLarge}" alt="${product.Name}"/>
                </picture>
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">${product.FinalPrice}</p></a>
            </li>`
}


export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        const filteredList = this.filterOutProducts(list, "FinalPrice", 179.99);
        this.renderList(filteredList);

        let title = this.category.charAt().toUpperCase() + this.category.slice(1);
        document.querySelector("title").textContent += title;
    }
    filterOutProducts(list, filterName, specificFilter) {
        const filteredList = list.filter((product) => product[filterName] !== specificFilter);
        return filteredList;
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}