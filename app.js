const PRODUCTS = [
  // Jeans
  { id:"j1", name:"Selvedge Straight Jean", category:"Jeans", price:98, note:"12 oz denim • straight fit" },
  { id:"j2", name:"Relaxed Taper Jean", category:"Jeans", price:88, note:"roomy top • taper leg" },

  // Shirts
  { id:"s1", name:"Heavyweight Tee", category:"Shirts", price:34, note:"260 gsm • boxy cut" },
  { id:"s2", name:"Oxford Button Down", category:"Shirts", price:64, note:"classic collar • crisp feel" },

  // Pants
  { id:"p1", name:"Utility Cargo Pant", category:"Pants", price:82, note:"ripstop • deep pockets" },
  { id:"p2", name:"Tech Chino", category:"Pants", price:74, note:"stretch • wrinkle resistant" },

  // Hoodies
  { id:"h1", name:"Fleece Hoodie", category:"Hoodies", price:72, note:"brushed fleece • heavy" },
  { id:"h2", name:"Zip Hoodie", category:"Hoodies", price:68, note:"double-zip • relaxed" },

  // Shorts
  { id:"sh1", name:"Everyday Short", category:"Shorts", price:42, note:"6\" inseam • cotton" },
  { id:"sh2", name:"Nylon Trail Short", category:"Shorts", price:48, note:"quick dry • zip pocket" },
];

let filter = "all";
let search = "";
let sort = "featured";
let cart = {}; // id -> qty

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const year = document.getElementById("year");

const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const checkoutBtn = document.getElementById("checkoutBtn");

year.textContent = new Date().getFullYear();

function money(n){ return `$${n.toFixed(0)}`; }

function getVisibleProducts(){
  let items = PRODUCTS.slice();

  if(filter !== "all"){
    items = items.filter(p => p.category === filter);
  }
  if(search.trim()){
    const q = search.trim().toLowerCase();
    items = items.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.note.toLowerCase().includes(q)
    );
  }

  if(sort === "low") items.sort((a,b)=>a.price-b.price);
  if(sort === "high") items.sort((a,b)=>b.price-a.price);

  return items;
}

function renderProducts(){
  const items = getVisibleProducts();
  grid.innerHTML = items.map(p => `
    <article class="card">
      <div class="card-img" role="img" aria-label="${p.name}"></div>
      <div class="card-body">
        <div class="kicker">${p.category}</div>
        <h3 class="title">${p.name}</h3>
        <div class="muted">${p.note}</div>
        <div class="card-row" style="margin-top:12px;">
          <div class="price">${money(p.price)}</div>
          <button class="btn btn-primary" data-add="${p.id}">Add</button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-add]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      addToCart(btn.getAttribute("data-add"));
      openCart();
    });
  });
}

function addToCart(id){
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}

function removeFromCart(id){
  delete cart[id];
  renderCart();
}

function changeQty(id, delta){
  const next = (cart[id] || 0) + delta;
  if(next <= 0) delete cart[id];
  else cart[id] = next;
  renderCart();
}

function computeSubtotal(){
  let sum = 0;
  for(const [id, qty] of Object.entries(cart)){
    const p = PRODUCTS.find(x => x.id === id);
    if(p) sum += p.price * qty;
  }
  return sum;
}

function renderCart(){
  const entries = Object.entries(cart);
  const totalItems = entries.reduce((a,[,q])=>a+q,0);
  cartCount.textContent = totalItems;

  if(entries.length === 0){
    cartItems.innerHTML = `<div class="muted">Your cart is empty.</div>`;
  } else {
    cartItems.innerHTML = entries.map(([id, qty])=>{
      const p = PRODUCTS.find(x=>x.id===id);
      return `
        <div class="cart-item">
          <div class="cart-top">
            <div>
              <div style="font-weight:750">${p.name}</div>
              <div class="muted" style="font-size:12px">${p.category} • ${money(p.price)}</div>
            </div>
            <button class="icon-btn" data-remove="${id}" aria-label="Remove">🗑</button>
          </div>
          <div class="row">
            <div class="qty">
              <button data-qty="${id}" data-delta="-1">−</button>
              <strong>${qty}</strong>
              <button data-qty="${id}" data-delta="1">+</button>
            </div>
            <strong>${money(p.price * qty)}</strong>
          </div>
        </div>
      `;
    }).join("");
  }

  cartSubtotal.textContent = money(computeSubtotal());

  cartItems.querySelectorAll("[data-remove]").forEach(b=>{
    b.addEventListener("click", ()=> removeFromCart(b.getAttribute("data-remove")));
  });
  cartItems.querySelectorAll("[data-qty]").forEach(b=>{
    b.addEventListener("click", ()=>{
      changeQty(b.getAttribute("data-qty"), Number(b.getAttribute("data-delta")));
    });
  });
}

function openCart(){
  cartOverlay.classList.remove("hidden");
  cartDrawer.classList.remove("hidden");
  cartDrawer.setAttribute("aria-hidden","false");
}
function closeCartUI(){
  cartOverlay.classList.add("hidden");
  cartDrawer.classList.add("hidden");
  cartDrawer.setAttribute("aria-hidden","true");
}

document.querySelectorAll(".pill").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".pill").forEach(b=>b.classList.remove("is-active"));
    btn.classList.add("is-active");
    filter = btn.getAttribute("data-filter");
    renderProducts();
  });
});

searchInput.addEventListener("input", (e)=>{
  search = e.target.value;
  renderProducts();
});

sortSelect.addEventListener("change",(e)=>{
  sort = e.target.value;
  renderProducts();
});

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartUI);
cartOverlay.addEventListener("click", closeCartUI);

checkoutBtn.addEventListener("click", ()=>{
  alert("Demo checkout. To make this real, connect Stripe/Shopify.");
});

renderProducts();
renderCart();
