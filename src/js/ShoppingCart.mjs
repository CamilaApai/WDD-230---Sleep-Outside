import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const totalItemPrice = (item.FinalPrice * item.Quantity).toFixed(2); 
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">Quantity:
      <input type="number" class="quantity-input" value="${item.Quantity}" data-id="${item.Id}">
    </p>
    <p class="cart-card__price">$${totalItemPrice}</p>
    <span class="remove-item" data-id="${item.Id}">X</span>
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
    const amounts = list.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + item);
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
  
    const quantityInputs = document.querySelectorAll(".quantity-input");
    quantityInputs.forEach((input) => {
      input.addEventListener("change", (event) => {
        const itemId = event.target.getAttribute("data-id");
        const newQuantity = parseInt(event.target.value);
 
        const updatedCartItems = cartItems.map((item) => {
          if (item.Id === itemId) {
            item.Quantity = newQuantity;
            item.TotalPrice = item.FinalPrice * newQuantity; 
            const totalElement = document.querySelector(".list-total");
            totalElement.innerHTML = `Total:  $${item.TotalPrice.toFixed(2)} `;
          }
          return item;
        });
  
        this.updateCart(updatedCartItems);
        this.calculateListTotal(updatedCartItems);
        this.renderCartContents(updatedCartItems);
      });
    });
  

  }
  
  getCartItems() {
    const cartContents = JSON.parse(localStorage.getItem(this.key)) || [];
    return cartContents;
  }
   
  updateCart(newCartItems) {
    localStorage.setItem(this.key, JSON.stringify(newCartItems));
  }
}

