const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const productList = document.getElementById("product-list");

searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const searchTerm = searchInput.value;

    // Replace 'YOUR_API_URL' with the actual API endpoint for product search
    const apiUrl = `../json/sleeping-bags.json?query=${searchTerm}`;

    // Fetch data from the API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Clear previous search results
            productList.innerHTML = "";

            // Display search results
            if (data.length === 0) {
                productList.innerHTML = "<p>No products found.</p>";
            } else {
                data.forEach((product) => {
                    const productItem = document.createElement("div");
                    productItem.classList.add("product-item");
                    productItem.innerHTML = `<h2>${product.name}</h2><p>${product.description}</p>`;
                    productList.appendChild(productItem);
                });
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});
