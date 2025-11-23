/* --------------------------------------
   SETTINGS
---------------------------------------*/
const WHATSAPP_PHONE = '919012338933';

/* --------------------------------------
   THEME / NIGHT MODE
---------------------------------------*/
function applyTheme(theme){
    if(theme==='dark') document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.removeAttribute('data-theme');
}

const savedTheme = localStorage.getItem('ofresin_theme');
applyTheme(savedTheme||'dark');

const themeBtn = document.getElementById('theme-toggle');
if(themeBtn){
    themeBtn.textContent = document.documentElement.hasAttribute('data-theme')?'☀️':'🌓';
    themeBtn.addEventListener('click',()=>{
        const isDark = document.documentElement.hasAttribute('data-theme');
        const newTheme = isDark?'light':'dark';
        applyTheme(newTheme);
        localStorage.setItem('ofresin_theme', newTheme);
        themeBtn.textContent = newTheme==='dark'?'☀️':'🌓';
    });
}

/* --------------------------------------
   CART UTILITIES
---------------------------------------*/
function loadCart(){ return JSON.parse(localStorage.getItem('ofresin_cart')||'[]'); }
function saveCart(cart){ localStorage.setItem('ofresin_cart', JSON.stringify(cart)); updateCartCount(); }

function updateCartCount(){
    const cart = loadCart();
    const count = cart.reduce((sum,i)=>sum+i.qty,0);
    [document.getElementById('cart-count'), document.getElementById('cart-count-2')].forEach(e=>{ if(e) e.textContent=count; });
}

function addToCart(productId){
    const cart = loadCart();
    const item = cart.find(i=>i.id===productId);
    if(item) item.qty += 1;
    else cart.push({id:productId, qty:1});
    saveCart(cart);
    if(typeof renderCart === 'function') renderCart();
    
    const product = PRODUCTS.find(p => p.id === productId);
    if(product) showToast(`${product.title} added to cart ✅`);
}


function removeCartItem(productId){
    let cart = loadCart();
    cart = cart.filter(i=>i.id!==productId);
    saveCart(cart);
    renderCart();
}

function clearCart(){
    localStorage.removeItem('ofresin_cart');
    renderCart();
    updateCartCount();
}

function changeQty(productId, qty){
    const cart = loadCart();
    const item = cart.find(i=>i.id===productId);
    if(!item) return;
    item.qty = qty;
    if(item.qty<=0) removeCartItem(productId);
    else saveCart(cart);
    renderCart();
}

/* --------------------------------------
   RENDER CART
---------------------------------------*/
function renderCart(){
    const cartEl = document.getElementById('cart-items');
    if(!cartEl) return;
    const cart = loadCart();
    cartEl.innerHTML = '';
    let total = 0;

    cart.forEach(item=>{
        const p = PRODUCTS.find(x=>x.id===item.id);
        const line = p.price*item.qty;
        total+=line;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span class="cart-title">${p.title}</span>
            <span class="cart-qty">
                <button class="qty-btn" onclick="changeQty('${p.id}', ${item.qty-1})">-</button>
                ${item.qty}
                <button class="qty-btn" onclick="changeQty('${p.id}', ${item.qty+1})">+</button>
            </span>
            <span class="cart-price">₹${line}</span>
            <button class="cart-remove" onclick="removeCartItem('${p.id}')">×</button>
        `;
        cartEl.appendChild(div);
    });

    const totalEl = document.getElementById('cart-total');
    if(totalEl) totalEl.textContent = '₹'+total;
}

/* --------------------------------------
   PRODUCT CATALOG (Use your PRODUCTS array)
---------------------------------------*/

/* --------------------------------------
   PRODUCT CATALOG
---------------------------------------*/

const PRODUCTS = [
    { id: 'p1',
         title: 'Custom Floral Resin Jhumka',
          price: 500,
           img: 'images/prod1.png',
            customisable: true,
             description: 'Hand-poured Floral jhumka with real preserved flowers embedded in crystal-clear resin. Lightweight and hypoallergenic.',
              meta: { material: 'Resin & Alloy',
                 size: '4.2cm × 4.2cm',
                  sku: 'OF-P1'
 } 
                },
    {
        id: 'p2',
        title: 'Resin Bookmark — Black & Gold Gradient',
        price: 350,
        img: 'images/prod2.png',
       
        description: 'A sleek black-to-clear gradient bookmark with shimmering golden foil suspended inside — a minimal, elegant accessory that adds a touch of luxury to every reader’s journey.',
        meta: {
            material: 'Resin, Golden Foil',
            size: '15cm × 4cm',
            sku: 'OF-P2'
        }
    },
    {
        id: 'p3',
        title: 'Resin Bookmark — Yellow Daisy Bloom',
        price: 350,
        img: 'images/prod3.png',
        description: 'A delicate clear-resin bookmark featuring a bright yellow daisy and floating gold foil accents — a sunny, nature-inspired piece that adds warmth and charm to every page you read.',
        meta: {
            material: 'Resin, Dried Flowers, Gold Foil',
            size: '15cm × 4cm',
            sku: 'OF-P3'
        }
    },
    {
        id: 'p4',
        title: 'Resin Bookmark — Purple & White Gradient',
        price: 350,
        img: 'images/prod4.png',
        description: 'A soft purple-to-white gradient bookmark that feels like calm in your hands. The dreamy blend makes every page feel a little more special — and honestly, if this caught your eye even for a second, it’s probably meant for you.',
        meta: {
            material: 'Resin',
            size: '15cm × 4cm',
            sku: 'OF-P3'
        }
    },
    {
        id: 'p5',
        title: 'Silver Daisy Floral Jhumka',
        price: 500,
        img: 'images/prod5.png',
        customisable: true,
        description: 'A dreamy silver jhumka featuring a preserved white daisy set against a soft purple backdrop. Light, feminine, and made to steal hearts — the kind of piece you can already imagine yourself wearing.',
        meta: {
            material: 'Resin, Daisy Flower, Silver-Toned Alloy',
            size: '4.2cm × 4.2cm',
            sku: 'OF-P5'
        }
    },
    {
        id: 'p6',
        title: 'Floral Resin Keyring — Clear Bloom Circle',
        price: 250,
        img: 'images/prod6.png',
        customisable: true,
        description: 'A clear circular resin keyring featuring real daisies and Queen Anne florals suspended inside — a soft, elegant keepsake you can carry everywhere.',
        meta: {
            material: 'Resin, Dried Flowers',
            size: '4cm (approx.)',
            sku: 'OF-P6'
        }
    },
    {
        id: 'p7',
        title: 'Yellow Daisy Resin Jhumka',
        price: 450,
        img: 'images/prod7.png',
        customisable: true,
        description: 'A charming resin jhumka featuring a bright yellow daisy set against a soft blue backdrop, finished with silver-toned detailing — a cheerful, everyday-wear piece that instantly lifts your look.',
        meta: {
            material: 'Resin, Dried Flower, Silver Findings',
            size: '4.2cm × 4.2cm',
            sku: 'OF-P7'
        }
    },
    {
        id: 'p8',
        title: 'Custom Resin Keyring',
        price: 99,
        img: 'images/prod8.png',
        customisable: true,
        description: 'A premium resin keyring that can be personalised with your initial, name, or charm style — crafted in crystal-clear resin and designed to be uniquely yours.',
        meta: {
            material: 'Resin, Metal Keyring',
            size: 'Standard Keyring Size',
            sku: 'OF-P8'
        }
    },
    {
        id: 'p9',
        title: 'Resin Butterfly Keyring — Satin Finish',
        price: 120,
        img: 'images/prod9.png',
        customisable: true,
        description: 'A charming butterfly-shaped resin keyring featuring a smooth satin-textured backdrop. Lightweight, glossy, and crafted to stand out — with customizable colors to match your style.',
        meta: {
            material: 'Resin, Alloy Keyring',
            size: '4cm × 3.5cm',
            sku: 'OF-P9'
        }
    },
    {
        id: 'p10',
        title: 'Mini Resin Frame Keychain',
        price: 300,
        img: 'images/prod10.png',
        customisable: true,
        description: 'A tiny resin photo frame you can carry everywhere — perfect for keeping your child’s smile, your partner’s picture, your family photo, or even a small blessing close to you at all times. A sentimental keepsake you’ll always want with you.',
        meta: {
            material: 'Resin, Metal Ring',
            size: '3.5cm × 2.5cm',
            sku: 'OF-P10'
        }
    }
];
function showToast(message){
    const toast = document.getElementById('toast');
    if(!toast) return;
    
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.right = '20px'; // slide in

    setTimeout(()=>{
        toast.style.right = '-300px'; // slide out
        toast.style.opacity = '0';
    }, 2000); // visible for 2 seconds
}


function renderProducts(sortBy='default', filterCustomisable=false){
    const grid = document.getElementById('products-grid');
    if(!grid) return;
    grid.innerHTML='';

    let productsToRender = [...PRODUCTS];
    if(filterCustomisable) productsToRender = productsToRender.filter(p=>p.customisable);

    switch(sortBy){
        case 'price-asc': productsToRender.sort((a,b)=>a.price-b.price); break;
        case 'price-desc': productsToRender.sort((a,b)=>b.price-a.price); break;
        case 'title-asc': productsToRender.sort((a,b)=>a.title.localeCompare(b.title)); break;
        case 'title-desc': productsToRender.sort((a,b)=>b.title.localeCompare(a.title)); break;
        case 'newest': productsToRender.sort((a,b)=>b.id.localeCompare(a.id)); break;
    }

    productsToRender.forEach(p=>{
        const div = document.createElement('div'); div.className='product-card';

        const imgWrap = document.createElement('div'); imgWrap.className='product-image-wrap'; imgWrap.style.position='relative';
        const img = document.createElement('img'); img.src=p.img; img.alt=p.title; img.className='product-img';
        imgWrap.appendChild(img); div.appendChild(imgWrap);

        if(p.customisable){
            const badge = document.createElement('div'); badge.className='tag-customise';
            badge.textContent='Customisable';
            imgWrap.appendChild(badge);
        }

        const title = document.createElement('div'); title.className='product-title'; title.textContent=p.title;
        const price = document.createElement('div'); price.className='price'; price.textContent='₹'+p.price;

        const addBtn = document.createElement('button'); addBtn.className='btn'; addBtn.textContent='Add to Cart'; addBtn.onclick=()=>addToCart(p.id);
        const buyBtn = document.createElement('button'); buyBtn.className='btn btn-primary'; buyBtn.textContent='Buy on WhatsApp'; buyBtn.onclick=()=>buyNow(p.id);

        const actions = document.createElement('div'); actions.className='product-actions'; actions.appendChild(addBtn); actions.appendChild(buyBtn);

        div.appendChild(title); div.appendChild(price); div.appendChild(actions);
        grid.appendChild(div);
    });
}

/* --------------------------------------
   BUY / CHECKOUT
---------------------------------------*/
function buyNow(productId){
    const product = PRODUCTS.find(p=>p.id===productId);
    if(!product) return;
    const msg = encodeURIComponent(`Hello! I want to buy:\n\n*${product.title}*\nPrice: ₹${product.price}\n\nPlease confirm availability.`);
    window.location.href=`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
}

function checkout(){
    const cart = loadCart();
    if(cart.length===0){ alert("Your cart is empty!"); return; }
    let message = "🛒 *New Order from OfRESIN*\n\n";
    let total=0;
    cart.forEach(item=>{ const p=PRODUCTS.find(x=>x.id===item.id); const line=p.price*item.qty; total+=line; message+=`• ${p.title} (×${item.qty}) — ₹${line}\n`; });
    message+=`\n*Total:* ₹${total}\n\nPlease confirm availability.`;
    window.location.href=`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/* --------------------------------------
   INITIALIZE
---------------------------------------*/
document.addEventListener('DOMContentLoaded',()=>{
    renderProducts();
    renderCart();
    updateCartCount();

    const sortSelect = document.getElementById('sort-products');
    const filterCheckbox = document.getElementById('filter-customisable');
    if(sortSelect) sortSelect.addEventListener('change',()=>renderProducts(sortSelect.value, filterCheckbox.checked));
    if(filterCheckbox) filterCheckbox.addEventListener('change',()=>renderProducts(sortSelect.value, filterCheckbox.checked));

    const buyBtn = document.getElementById('buy-whatsapp'); if(buyBtn) buyBtn.addEventListener('click', checkout);
    const clearBtn = document.getElementById('clear-cart'); if(clearBtn) clearBtn.addEventListener('click', ()=>{ if(confirm('Clear cart?')) clearCart(); });
});
