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
    this.renderCartContents();
  }
  
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    this.total = cartItems.reduce((total, item) => total + item.TotalPrice, 0);
    this.updateTotalDisplay(this.total);
  
    const quantityInputs = document.querySelectorAll(".quantity-input");
    quantityInputs.forEach((input) => {
      input.addEventListener("change", (event) => {
        const itemId = event.target.getAttribute("data-id");
        const newQuantity = parseInt(event.target.value);
  
        const updatedCartItems = cartItems.map((item) => {
          if (item.Id === itemId) {
            item.Quantity = newQuantity;
            item.TotalPrice = item.FinalPrice * newQuantity;
          }
          return item;
        });
  
        this.total = updatedCartItems.reduce((total, item) => total + item.TotalPrice, 0);
        this.updateTotalDisplay(this.total);
        this.updateCart(updatedCartItems);
        this.renderCartContents();
      });
    });
  }
  
  updateTotalDisplay(total) {
    const totalElement = document.querySelector(".list-total");
    totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
  }
  
  getCartItems() {
    const cartContents = JSON.parse(localStorage.getItem(this.key)) || [];
    return cartContents;
  }
   
  updateCart(newCartItems) {
    localStorage.setItem(this.key, JSON.stringify(newCartItems));
  }
}

