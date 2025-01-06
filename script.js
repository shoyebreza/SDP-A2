


const loadProduct = (search = "margarita") => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(data => {
            if (data.drinks) {
                displayProduct(data.drinks);
            } else {
                displayNoResults();
            }
        })
        .catch(error => console.error("Error fetching products:", error));
};

const displayProduct = (products) => {
    const container = document.getElementById("grid");
    container.innerHTML = "";
    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "col";
        div.innerHTML = `
            <div class="card h-100">
                <img src="${product.strDrinkThumb}" class="card-img-top" alt="Product Image">
                <div class="card-body">
                    <h5 class="card-title">Name: ${product.strDrink}</h5>
                    <p class="card-text">Category: ${product.strCategory}</p>
                    <p class="card-text">Instruction: ${product.strInstructions.slice(0,15)}</p>
                    <button class="btn btn-outline-primary">Add to Cart</button>
                    <button class="btn btn-outline-primary">Detail</button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
};

const displayNoResults = () => {
    const container = document.getElementById("grid");
    container.innerHTML = "<h3 class='text-center text-muted'>No products found. Please try a different search term.</h3>";
};

const searchProduct = (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("search-input").value.trim();
    if (searchInput) {
        loadProduct(searchInput);
    } else {
        alert("Please enter a search term.");
    }
};

window.onload = () => loadProduct();
