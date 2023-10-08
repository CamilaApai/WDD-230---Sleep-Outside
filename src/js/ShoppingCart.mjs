import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">${item.Quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }
  async init() {
    const list = getLocalStorage(this.key);
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }
  calculateListTotal(list) {
    const totalAmount = list.map((item) => item.FinalPrice * item.Quantity);
    this.total = totalAmount.reduce((sum, item) => sum + item);
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    console.log(cartItems);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    document.querySelector(".cart-total").innerText += ` $${this.total}`;
  }
}