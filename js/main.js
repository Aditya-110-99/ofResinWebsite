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
    { id: 'p1', title: 'Custom Silver Resin Jhumka', price: 299, img: 'images/prod1.svg', description: 'Hand-poured silver-tone jhumka with preserved flowers embedded in crystal-clear resin. Lightweight and hypoallergenic.', meta:{material:'Resin & Alloy', size:'3.2cm × 2.5cm', sku:'OF-P1'} },
    { id: 'p2', title: 'Resin Bookmark — Floral', price: 149, img: 'images/prod2.svg', description: 'Slim resin bookmark with pressed florals and gold leaf accents — perfect for book lovers.', meta:{material:'Resin, Dried Flowers', size:'15cm × 4cm', sku:'OF-P2'} },
    { id: 'p3', title: 'Resin Keyring — Initial', price: 99, img: 'images/prod3.svg', description: 'Personalized initial keyring encased in glossy resin. Add a charm or color on request.', meta:{material:'Resin, Metal Ring', size:'4cm × 3cm', sku:'OF-P3'} },
    { id: 'p4', title: 'Resin Photo Frame — Small', price: 499, img: 'images/prod4.svg', description: 'Mini resin photo frame with embedded petals — keeps memories safe and beautiful on your desk.', meta:{material:'Resin, Paper', size:'10cm × 8cm', sku:'OF-P4'} },
    { id: 'p5', title: 'Preserved Flower Pendant', price: 399, img: 'images/prod5.svg', description: 'Delicate preserved flower pendant sealed in resin; comes with a stainless chain.', meta:{material:'Resin, Flower, Steel', size:'2.8cm × 2.2cm', sku:'OF-P5'} },
    { id: 'p6', title: 'Resin Magnet — Set of 3', price: 199, img: 'images/prod6.svg', description: 'Set of three colourful resin magnets — practical and decorative for fridges or whiteboards.', meta:{material:'Resin, Magnet', size:'various', sku:'OF-P6'} },
    { id: 'p7', title: 'Customized Nameplate (Resin)', price: 799, img: 'images/prod7.svg', description: 'Custom nameplate with hand-mixed pigments and optional decals — make it uniquely yours.', meta:{material:'Resin, Vinyl', size:'20cm × 6cm', sku:'OF-P7'} },
    { id: 'p8', title: 'Resin Coaster — Floral (2pcs)', price: 249, img: 'images/prod8.svg', description: 'A pair of resin coasters with preserved florals and protective cork backing.', meta:{material:'Resin, Cork', size:'10cm dia', sku:'OF-P8'} },
    { id: 'p9', title: 'Resin Earrings — Stud', price: 259, img: 'images/prod9.svg', description: 'Minimalist resin stud earrings with colorful inclusions — suitable for everyday wear.', meta:{material:'Resin, Stainless Post', size:'1.2cm × 1.2cm', sku:'OF-P9'} },
    { id: 'p10', title: 'Mini Resin Frame Keychain', price: 179, img: 'images/prod10.svg', description: 'Tiny photo frame keychain that holds a miniature photo or keepsake.', meta:{material:'Resin, Metal Ring', size:'3.5cm × 2.5cm', sku:'OF-P10'} }
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


/* --------------------------------------
   CART UTILITIES
---------------------------------------*/

/* --------------------------------------
   Lightweight analytics (client-side)
   - Stores recent events and counters in localStorage under `ofresin_analytics`
   - Use `Export Analytics` button to download JSON
   - Privacy: data stays in user's browser unless exported/shared
---------------------------------------*/
function loadAnalytics(){
    try{
        const raw = localStorage.getItem('ofresin_analytics');
        return raw ? JSON.parse(raw) : { events: [], counters: {} };
    }catch(e){ return { events: [], counters: {} }; }
}

function saveAnalytics(a){
    try{ localStorage.setItem('ofresin_analytics', JSON.stringify(a)); }catch(e){}
}

function trackEvent(name, payload){
    const now = new Date().toISOString();
    const a = loadAnalytics();
    a.counters[name] = (a.counters[name] || 0) + 1;
    a.events.push({ event: name, payload: payload || null, ts: now });
    // keep only recent 1000 events to limit storage
    if (a.events.length > 1000) a.events = a.events.slice(a.events.length - 1000);
    saveAnalytics(a);
    // helpful console debug
    if (window.console && console.debug) console.debug('[analytics]', name, payload || '');
}

function exportAnalytics(){
    const a = loadAnalytics();
    const blob = new Blob([JSON.stringify(a, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = `ofresin-analytics-${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.json`;
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
    URL.revokeObjectURL(url);
}


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
    // show non-blocking toast with undo
    showToast('Added to cart', 'Undo', () => undoAdd(productId));
    // analytics
    trackEvent('add_to_cart', { productId });
    // If the products page has a cart section, update it immediately and scroll to it.
    try {
        if (typeof renderCart === 'function') renderCart();
        const cartEl = document.getElementById('cart');
        if (cartEl) cartEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
        // silent fail — page may not include cart section
    }
}

function undoAdd(productId){
    const cart = loadCart();
    const item = cart.find(i => i.id === productId);
    if (!item) return; // nothing to undo
    item.qty -= 1;
    if (item.qty <= 0) {
        const idx = cart.findIndex(i=>i.id===productId);
        if (idx !== -1) cart.splice(idx,1);
    }
    saveCart(cart);
    if (typeof renderCart === 'function') renderCart();
}

/* Toast helpers */
function ensureToastContainer(){
    let container = document.querySelector('.toast-container');
    if (!container){
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

function showToast(message, actionText, actionFn, timeout=3500){
    const container = ensureToastContainer();
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<div class="msg">${message}</div>`;
    const actions = document.createElement('div');
    actions.className = 'actions';
    if (actionText && actionFn){
        const btn = document.createElement('button');
        btn.textContent = actionText;
        btn.onclick = () => { actionFn(); container.removeChild(t); };
        actions.appendChild(btn);
    }
    const close = document.createElement('button');
    close.className = 'close';
    close.textContent = '✕';
    close.onclick = () => { if (t.parentNode) t.parentNode.removeChild(t); };
    actions.appendChild(close);
    t.appendChild(actions);
    container.appendChild(t);

    setTimeout(()=>{ if (t.parentNode) t.parentNode.removeChild(t); }, timeout);
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
    // analytics - record intent to buy single product
    try{ trackEvent('buy_now', { productId }); }catch(e){}
}


/* --------------------------------------
   CHECKOUT → WHATSApp (Full Cart)
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
    // analytics - record full cart checkout attempt
    try{ trackEvent('checkout', { cart }); }catch(e){}
    let total=0;
    cart.forEach(item=>{ const p=PRODUCTS.find(x=>x.id===item.id); const line=p.price*item.qty; total+=line; message+=`• ${p.title} (×${item.qty}) — ₹${line}\n`; });
    message+=`\n*Total:* ₹${total}\n\nPlease confirm availability.`;
    window.location.href=`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/* --------------------------------------
   INITIALIZE
---------------------------------------*/

function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';
    PRODUCTS.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';

        const img = document.createElement('img');
        img.src = p.img;
        img.alt = p.title;
        // open product modal when image or card clicked
        img.addEventListener('click', ()=>{ openProductModal(p.id); try{ trackEvent('product_view', { productId: p.id }); }catch(e){} });
        div.addEventListener('click', (e)=>{
            // avoid triggering when clicking buttons inside card
            if (e.target.tagName.toLowerCase() === 'button') return;
            openProductModal(p.id);
        });

        const title = document.createElement('div');
        title.className = 'product-title';
        title.textContent = p.title;

        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = '₹' + p.price;

        const addBtn = document.createElement('button');
        addBtn.className = 'btn';
        addBtn.textContent = 'Add to Cart';
        addBtn.setAttribute('title','Add to Cart');
        addBtn.setAttribute('aria-label','Add to Cart');
        addBtn.onclick = () => addToCart(p.id);

        const buyBtn = document.createElement('button');
        buyBtn.className = 'btn btn-primary';
        buyBtn.textContent = 'Buy on WhatsApp';
        buyBtn.setAttribute('title','Buy on WhatsApp');
        buyBtn.setAttribute('aria-label','Buy on WhatsApp');
        buyBtn.onclick = () => buyNow(p.id);

        // actions container keeps buttons aligned at the card footer
        const actions = document.createElement('div');
        actions.className = 'product-actions';
        actions.appendChild(addBtn);
        actions.appendChild(buyBtn);

        div.appendChild(img);
        div.appendChild(title);
        div.appendChild(price);
        div.appendChild(actions);

        grid.appendChild(div);
    });
}

/* Product modal: shows title, image, description, meta and actions */
function openProductModal(productId){
    const p = PRODUCTS.find(x=>x.id===productId);
    if (!p) return;

    // prevent multiple modals
    if (document.querySelector('.product-modal')) return;
    const overlay = document.createElement('div');
    overlay.className = 'product-modal-overlay pm-fade-in';

    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-labelledby', `pm-title-${p.id}`);
    modal.innerHTML = `
        <button class="pm-close" aria-label="Close">✕</button>
        <div class="pm-body">
            <div class="pm-image"><img src="${p.img}" alt="${p.title}"></div>
            <div class="pm-info">
                <h2 id="pm-title-${p.id}">${p.title}</h2>
                <div class="pm-price">₹${p.price}</div>
                <p class="pm-desc">${p.description}</p>
                <ul class="pm-meta">
                  <li><strong>Material:</strong> ${p.meta.material}</li>
                  <li><strong>Size:</strong> ${p.meta.size}</li>
                  <li><strong>SKU:</strong> ${p.meta.sku}</li>
                </ul>
                <div class="pm-actions">
                  <button class="btn add-cart">Add to Cart</button>
                  <button class="btn btn-primary buy-now">Buy on WhatsApp</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    // prevent background scroll
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    // focus management and focus-trap
    const previouslyFocused = document.activeElement;
    const closeBtn = modal.querySelector('.pm-close');
    const focusableSelector = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex]:not([tabindex="-1"])';
    function getFocusable(){ return Array.from(modal.querySelectorAll(focusableSelector)).filter(el=>el.offsetParent!==null); }
    // open animation
    requestAnimationFrame(()=> modal.classList.add('pm-open'));
    // move focus into modal
    const focusable = getFocusable();
    (focusable[0] || closeBtn).focus();

    function onKey(e){
        if (e.key === 'Escape') { e.preventDefault(); startClose(); }
        if (e.key === 'Tab'){
            const nodes = getFocusable();
            if (nodes.length === 0) { e.preventDefault(); return; }
            const first = nodes[0];
            const last = nodes[nodes.length-1];
            if (e.shiftKey){ if (document.activeElement === first){ e.preventDefault(); last.focus(); } }
            else { if (document.activeElement === last){ e.preventDefault(); first.focus(); } }
        }
    }
    document.addEventListener('keydown', onKey);

    overlay.addEventListener('click', startClose);
    closeBtn.addEventListener('click', startClose);

    function startClose(){
        // add closing class to animate out
        modal.classList.remove('pm-open');
        modal.classList.add('pm-closing');
        overlay.classList.add('pm-fade-out');
        document.removeEventListener('keydown', onKey);
        // cleanup after transition or timeout fallback
        const done = ()=>{
            if (modal.parentNode) modal.parentNode.removeChild(modal);
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            document.documentElement.style.overflow = prevOverflow || '';
            if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
        };
        modal.addEventListener('transitionend', done, { once:true });
        setTimeout(done, 350);
    }

    // actions
    modal.querySelector('.add-cart').addEventListener('click', ()=>{ addToCart(p.id); startClose(); });
    modal.querySelector('.buy-now').addEventListener('click', ()=>{ buyNow(p.id); startClose(); });
}

document.addEventListener('DOMContentLoaded', () => {
document.addEventListener('DOMContentLoaded',()=>{
    renderProducts();
    renderCart();
    updateCartCount();

    const buyBtn = document.getElementById('buy-whatsapp');
    if (buyBtn) buyBtn.addEventListener('click', checkout);

    const clearBtn = document.getElementById('clear-cart');
    if (clearBtn) clearBtn.addEventListener('click', () => { if (confirm('Clear cart?')) clearCart(); });

    // mobile nav toggle
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle){
        navToggle.addEventListener('click', ()=>{
            document.querySelector('.site-header').classList.toggle('nav-open');
        });
    }
    // export analytics button
    const exportBtn = document.getElementById('export-analytics');
    if (exportBtn){
        exportBtn.addEventListener('click', (e)=>{ e.preventDefault(); exportAnalytics(); });
    }
    // theme toggle
    function applyTheme(t){
        if (t === 'dark') document.documentElement.setAttribute('data-theme','dark');
        else document.documentElement.removeAttribute('data-theme');
    }

    // prefer saved theme or system preference
        const savedTheme = localStorage.getItem('ofresin_theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            // Make dark theme the primary/default when no saved preference exists
            applyTheme('dark');
            try { localStorage.setItem('ofresin_theme','dark'); } catch(e){}
        }

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn){
        // set initial label
        themeBtn.textContent = document.documentElement.hasAttribute('data-theme') ? '☀️' : '🌓';
        themeBtn.addEventListener('click', ()=>{
            const isDark = document.documentElement.hasAttribute('data-theme');
            const newTheme = isDark ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('ofresin_theme', newTheme);
            themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌓';
        });
    }
});


/* Layered parallax: `.parallax-bg` (far) + `.parallax-mid` (mid) */
(function(){
    const MIN_WIDTH = 720; // disable on small screens
    const BG_MULT = 0.28;  // far layer moves slower
    const MID_MULT = 0.45; // mid layer moves faster for depth

    function initParallax(){
        const far = document.querySelector('.parallax-bg');
        const mid = document.querySelector('.parallax-mid');
        if (!far && !mid) return;

        if (window.innerWidth < MIN_WIDTH) {
            if (far) far.style.transform = '';
            if (mid) mid.style.transform = '';
            return;
        }

        let ticking = false;

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const sc = window.scrollY || window.pageYOffset;

                    if (far) {
                        const off = Math.round(sc * BG_MULT);
                        far.style.transform = `translate3d(0, ${off}px, 0)`;
                    }

                    if (mid) {
                        const off2 = Math.round(sc * MID_MULT);
                        mid.style.transform = `translate3d(0, ${off2}px, 0)`;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', () => {
            if (window.innerWidth < MIN_WIDTH) {
                if (far) far.style.transform = '';
                if (mid) mid.style.transform = '';
            }
        });

        // initial position
        onScroll();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initParallax);
    else initParallax();

})();
    const sortSelect = document.getElementById('sort-products');
    const filterCheckbox = document.getElementById('filter-customisable');
    if(sortSelect) sortSelect.addEventListener('change',()=>renderProducts(sortSelect.value, filterCheckbox.checked));
    if(filterCheckbox) filterCheckbox.addEventListener('change',()=>renderProducts(sortSelect.value, filterCheckbox.checked));

    const buyBtn = document.getElementById('buy-whatsapp'); if(buyBtn) buyBtn.addEventListener('click', checkout);
    const clearBtn = document.getElementById('clear-cart'); if(clearBtn) clearBtn.addEventListener('click', ()=>{ if(confirm('Clear cart?')) clearCart(); });
});
