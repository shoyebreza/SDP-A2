// JavaScript to handle cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const cartItems = document.getElementById('cart-items');
        const productName = this.closest('.card-body').querySelector('.card-title').textContent;

        // Add item to cart
        const newItem = document.createElement('li');
        newItem.className = 'list-group-item';
        newItem.textContent = productName;

        // Replace "Cart is empty" if it exists
        if (cartItems.children[0] && cartItems.children[0].textContent === 'Cart is empty') {
            cartItems.innerHTML = '';
        }

        cartItems.appendChild(newItem);
    });
});