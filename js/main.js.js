/* main.js — cart handling, product data, WhatsApp checkout */

/* --------------------------------------
   SETTINGS
---------------------------------------*/

// Replace with your WhatsApp phone (country code + number)
const WHATSAPP_PHONE = '919012338933';


/* --------------------------------------
   PRODUCT CATALOG
---------------------------------------*/

const PRODUCTS = [
    { id: 'p1', title: 'Custom Silver Resin Jhumka', price: 299, img: 'images/prod1.jpg' },
    { id: 'p2', title: 'Resin Bookmark — Floral', price: 149, img: 'images/prod2.jpg' },
    { id: 'p3', title: 'Resin Keyring — Initial', price: 99, img: 'images/prod3.jpg' },
    { id: 'p4', title: 'Resin Photo Frame — Small', price: 499, img: 'images/prod4.jpg' },
    { id: 'p5', title: 'Preserved Flower Pendant', price: 399, img: 'images/prod5.jpg' },
    { id: 'p6', title: 'Resin Magnet — Set of 3', price: 199, img: 'images/prod6.jpg' },
    { id: 'p7', title: 'Customized Nameplate (Resin)', price: 799, img: 'images/prod7.jpg' },
    { id: 'p8', title: 'Resin Coaster — Floral (2pcs)', price: 249, img: 'images/prod8.jpg' },
    { id: 'p9', title: 'Resin Earrings — Stud', price: 259, img: 'images/prod9.jpg' },
    { id: 'p10', title: 'Mini Resin Frame Keychain', price: 179, img: 'images/prod10.jpg' }
];


/* --------------------------------------
   CART UTILITIES
---------------------------------------*/

function loadCart() {
    const raw = localStorage.getItem('ofresin_cart');
    return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
    localStorage.setItem('ofresin_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = loadCart();
    const count = cart.reduce((s, i) => s + i.qty, 0);

    const els = [
        document.getElementById('cart-count'),
        document.getElementById('cart-count-2')
    ];

    els.forEach(e => { if (e) e.textContent = count; });
}

function addToCart(productId) {
    const cart = loadCart();
    const item = cart.find(i => i.id === productId);

    if (item) item.qty += 1;
    else cart.push({ id: productId, qty: 1 });

    saveCart(cart);
    alert('Added to cart');
}

function clearCart() {
    localStorage.removeItem('ofresin_cart');
    renderCart();
    updateCartCount();
}

function removeCartItem(productId) {
    let cart = loadCart();
    cart = cart.filter(i => i.id !== productId);
    saveCart(cart);
    renderCart();
}

/* --------------------------------------
   CHANGE QUANTITY
---------------------------------------*/

function changeQty(productId, qty) {
    const cart = loadCart();
    const item = cart.find(i => i.id === productId);

    if (!item) return;

    item.qty = qty;

    if (item.qty <= 0) {
        removeCartItem(productId);
    } else {
        saveCart(cart);
        renderCart();
    }
}


/* --------------------------------------
   RENDER CART PAGE
---------------------------------------*/

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (!container) return; // If not on cart page

    const cart = loadCart();
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `<p class="empty-msg">Your cart is empty</p>`;
        if (totalEl) totalEl.textContent = "₹0";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        const itemTotal = product.price * item.qty;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${product.img}" class="cart-img">

                <div class="cart-info">
                    <h3>${product.title}</h3>
                    <p>₹${product.price} × ${item.qty}</p>

                    <div class="qty-controls">
                        <button onclick="changeQty('${item.id}', ${item.qty - 1})">-</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty('${item.id}', ${item.qty + 1})">+</button>
                    </div>
                </div>

                <button class="remove-btn" onclick="removeCartItem('${item.id}')">Remove</button>
            </div>
        `;
    });

    if (totalEl) totalEl.textContent = "₹" + total;
}


/* --------------------------------------
   BUY NOW (Single product)
---------------------------------------*/

function buyNow(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const msg = encodeURIComponent(
        `Hello! I want to buy:\n\n` +
        `*${product.title}*\n` +
        `Price: ₹${product.price}\n\n` +
        `Please confirm availability.`
    );

    window.location.href = `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
}


/* --------------------------------------
   CHECKOUT → WHATSApp (Full Cart)
---------------------------------------*/

function checkout() {
    const cart = loadCart();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "🛒 *New Order from OfRESIN*\n\n";

    let total = 0;

    cart.forEach(item => {
        const p = PRODUCTS.find(x => x.id === item.id);
        const lineTotal = p.price * item.qty;
        total += lineTotal;

        message += `• ${p.title} (×${item.qty}) — ₹${lineTotal}\n`;
    });

    message += `\n*Total:* ₹${total}\n`;
    message += `\nPlease confirm availability.`;

    const encoded = encodeURIComponent(message);

    window.location.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}


/* --------------------------------------
   INIT
---------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCart();
});
