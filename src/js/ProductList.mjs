import { productDiscount, renderListWithTemplate } from "./utils.mjs";


export function productCardTemplateNoDiscount(product) {
    return `<li class="product-card">
                <a href="product_pages/?product=${product.Id}">
                <img src="${product.Image}" alt="${product.Name}"/>
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">${product.FinalPrice}</p></a>
            </li>`
}
export function productCardTemplateYesDiscount(product) {
    return `<li class="product-card">
                <a href="product_pages/?product=${product.Id}">
                <img src="${product.Image}" alt="${product.Name}"/>
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>

                <p class="product-card__price">${product.FinalPrice}</p>
                <div class="discount-info">
                    <p class="discount-percent">Discount: ${product.DiscountPercent}</p>
                    <div class="discount-div">
                        <span class="discount-amount">${product.FinalPrice - ((product.FinalPrice * product.DiscountPercent)/100)}</span>
                    </div>
                </div>
                </a>
            </li>`
}


export default class ProductList {
    constructor(category, dataSource, listElement, discounted=false) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.discounted = discounted;
    }
    async init() {
        const list = await this.dataSource.getData();
        const filteredList = this.filterOutProducts(list, "FinalPrice", 179.99);
        this.renderList(filteredList);
    }
    filterOutProducts(list, filterName, specificFilter) {
        const filteredList = list.filter((product) => product[filterName] !== specificFilter);
        return filteredList;
    }
    
    renderList(list) {
        if (!this.discounted) {
            renderListWithTemplate(productCardTemplateNoDiscount, this.listElement, list);
        }
        else {
            productDiscount();
            renderListWithTemplate(productCardTemplateYesDiscount, this.listElement, list);
        }
    }
}