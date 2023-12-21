import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    }));
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.localTaxes = .06;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    // calculate and display the total cost of the items in the cart, and the number of items.
      const cartTotal = document.getElementById("cartTotal");
      const numItems = document.getElementById("num-items");

      numItems.innerText = this.list.length;
      const amount = this.list.map((item) => item.FinalPrice);
      this.itemTotal = amount.reduce((total, item) => total + item);
      cartTotal.innerText = "$" + this.itemTotal;
  }

  calculateOrderTotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total

    // display the totals.
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * this.localTaxes).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();    
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  }
  
  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    try {
      const res = await services.checkout(json);
      setLocalStorage("so-cart", [res]); //not sure if res here is correct
      location.assign("/checkout/success.html");
    } catch (err) {
      // get rid of any preexisting alerts.
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
    }
  }
}