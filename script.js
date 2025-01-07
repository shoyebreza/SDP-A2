


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
                    <button class="btn btn-outline-primary" onclick='addToCart({
                        "id": "${product.idDrink}",
                        "name": "${product.strDrink}",
                        "category": "${product.strCategory}",
                        "image": "${product.strDrinkThumb}"
                    })'>Add to Cart</button>

                    <button class="btn btn-outline-primary" onclick="loadProductDetails(${product.idDrink})">Detail</button>
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

// Function to load product details by ID
const loadProductDetails = (productId) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${productId}`)
        .then(res => res.json())
        .then(data => displayProductDetails(data.drinks[0]))
        .catch(error => console.error("Error Something Wrong:", error));
};

// Function to display product details in the modal
const displayProductDetails = (product) => {
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="${product.strDrinkThumb}" class="img-fluid rounded" alt="${product.strDrink}">
            </div>
            <div class="col-md-8">
                <h4>${product.strDrink}</h4>
                <p><strong>Category:</strong> ${product.strCategory}</p>
                <p><strong>Glass:</strong> ${product.strGlass}</p>
                <p><strong>Instructions:</strong> ${product.strInstructions}</p>
                <p><strong>Ingredients:</strong></p>
                <ul>
                ${[1, 2, 3, 4, 5].map(i => product[`strIngredient${i}`] ? `<li>${product[`strIngredient${i}`]} (${product[`strMeasure${i}`] || ''})</li>` : '').join('')}

                </ul>
            </div>
        </div>
    `;
    // Show the modal
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
};

let cart = [];

const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1; 
    } else {
        cart.push({ ...product, quantity: 1 }); 
    }
    displayCart();
};

const displayCart = () => {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = '<li class="list-group-item">Cart is empty</li>';
        return;
    }

    cart.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${item.name} (x${item.quantity})
            <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.id}')"><i class="bi bi-trash"></i></button>
        `;
        cartItems.appendChild(li);
    });
};


const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    displayCart();
};

window.onload = () => loadProduct();
