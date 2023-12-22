// import { VITE_SERVER_URL as baseURL } from "../../vite.config.js"; 
const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
async function convertToJson(res) {
  const data = await res.json();
  return res.ok ? data : { name: "servicesError", message: data };
}

export default class ExternalServices {
  constructor() {

  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
