// Images are from Unsplash (free-to-use under Unsplash License).
// (Not Unsplash+)
const IMG = {
  shirtWhite: "https://images.unsplash.com/photo-1722310752951-4d459d28c678?auto=format&fit=crop&w=1200&q=80",
  shirtsRack: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
  jeansStreet: "https://images.unsplash.com/photo-1534026609802-f7239f184d91?auto=format&fit=crop&w=1200&q=80",
  hoodieSet: "https://images.unsplash.com/photo-1739384994765-d44f7af12029?auto=format&fit=crop&w=1200&q=80",
  pantsFlatlay: "https://images.unsplash.com/photo-1522897355400-c4fdec73d979?auto=format&fit=crop&w=1200&q=80",
  pantsLeggings: "https://images.unsplash.com/photo-1523654999808-59842135e652?auto=format&fit=crop&w=1200&q=80",
  shortsPool: "https://images.unsplash.com/photo-1559234626-1304f83caed6?auto=format&fit=crop&w=1200&q=80",
  shortsStack: "https://images.unsplash.com/photo-1559234626-0ebf4754d937?auto=format&fit=crop&w=1200&q=80",
};

const PRODUCTS = [
  // Jeans
  { id:"j1", name:"Selvedge Straight Jean", category:"Jeans", price:98, note:"12 oz denim • straight fit", img: IMG.jeansStreet, featured:true },
  { id:"j2", name:"Relaxed Taper Jean", category:"Jeans", price:88, note:"Roomy top • taper leg", img: IMG.hoodieSet, featured:false },

  // Shirts
  { id:"s1", name:"Heavyweight Tee", category:"Shirts", price:34, note:"260 gsm • boxy cut", img: IMG.shirtWhite, featured:true },
  { id:"s2", name:"Oxford Button Down", category:"Shirts", price:64, note:"Classic collar • crisp feel", img: IMG.shirtsRack, featured:false },

  // Pants
  { id:"p1", name:"Utility Cargo Pant", category:"Pants", price:82, note:"Ripstop • deep pockets", img: IMG.pantsFlatlay, featured:true },
  { id:"p2", name:"Tech Chino", category:"Pants", price:74, note:"Stretch • wrinkle resistant", img: IMG.pantsLeggings, featured:false },

  // Hoodies
  { id:"h1", name:"Fleece Hoodie", category:"Hoodies", price:72, note:"Brushed fleece • heavy", img: IMG.hoodieSet, featured:true },
  { id:"h2", name:"Zip Hoodie", category:"Hoodies", price:68, note:"Double-zip • relaxed", img: IMG.hoodieSet, featured:false },

  // Shorts
  { id:"sh1", name:"Everyday Short", category:"Shorts", price:42, note:"6\" inseam • cotton", img: IMG.shortsStack, featured:true },
  { id:"sh2", name:"Nylon Trail Short", category:"Shorts", price:48, note:"Quick dry • zip pocket", img: IMG.shortsPool, featured:false },
];

let filter = "all";
let search = "";
let sort = "featured";

let cart = load("cart", {});     // id -> qty
let wish = load("wish", {});     // id -> true

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const year = document.getElementById("year");
const statProducts = document.getElementById("statProducts");

const overlay = document.getElementById("overlay");

const cartBtn = document.getElementById("cartBtn");
const wishlistBtn = document.getElementById("wishlistBtn");
const cartCount = document.getElementById("cartCount");
const wishCount = document.getElementById("wishCount");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const checkoutBtn = document.getElementById("checkoutBtn");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const mTitle = document.getElementById("mTitle");
const mKicker = document.getElementById("mKicker");
const mImg = document.getElementById("mImg");
const mPrice = document.getElementById("mPrice");
const mNote = document.getElementById("mNote");
const mAdd = document.getElementById("mAdd");
const mWish = document.getElementById("mWish");

const checkout = document.getElementById("checkout");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");

const toast = document.getElementById("toast");

const heroImg = document.getElementById("heroImg");
const heroTitle = document.getElementById("heroTitle");
const heroPrice = document.getElementById("heroPrice");
const heroQuickView = document.getElementById("heroQuickView");
const scrollBtn = document.getElementById("scrollBtn");

year.textContent = new Date().getFullYear();
statProducts.textContent = String(PRODUCTS.length);

let currentModalId = null;

function money(n){ return `$${n.toFixed(0)}`; }

function save(key, obj){ localStorage.setItem(key, JSON.stringify(obj)); }
function load(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }catch{ return fallback; }
}

function showToast(msg){
  toast.textContent = msg;
  toast.classList.remove("hidden");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=> toast.classList.add("hidden"), 1700);
}

function setOverlay(open){
  if(open) overlay.classList.remove("hidden");
  else overlay.classList.add("hidden");
}

function openDrawer(){
  setOverlay(true);
  cartDrawer.classList.remove("hidden");
  cartDrawer.setAttribute("aria-hidden","false");
}
function closeDrawer(){
  setOverlay(false);
  cartDrawer.classList.add("hidden");
  cartDrawer.setAttribute("aria-hidden","true");
}

function openModal(productId){
  const p = PRODUCTS.find(x=>x.id===productId);
  if(!p) return;

  currentModalId = productId;
  mTitle.textContent = p.name;
  mKicker.textContent = `${p.category}`;
  mImg.src = p.img;
  mImg.alt = p.name;
  mPrice.textContent = money(p.price);
  mNote.textContent = p.note;

  mWish.textContent = wish[p.id] ? "♥ Saved" : "♡ Save";

  setOverlay(true);
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden","false");
}

function closeModalUI(){
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden","true");
  setOverlay(false);
}

function openCheckout(){
  checkoutTotal.textContent = money(computeSubtotal());
  setOverlay(true);
  checkout.classList.remove("hidden");
  checkout.setAttribute("aria-hidden","false");
}

function closeCheckoutUI(){
  checkout.classList.add("hidden");
  checkout.setAttribute("aria-hidden","true");
  setOverlay(false);
}

function getVisibleProducts(){
  let items = PRODUCTS.slice();

  if(filter !== "all") items = items.filter(p => p.category === filter);

  if(search.trim()){
    const q = search.trim().toLowerCase();
    items = items.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.note.toLowerCase().includes(q)
    );
  }

  if(sort === "featured"){
    items.sort((a,b)=> Number(!!b.featured) - Number(!!a.featured));
  } else if(sort === "low"){
    items.sort((a,b)=>a.price-b.price);
  } else if(sort === "high"){
    items.sort((a,b)=>b.price-a.price);
  }

  return items;
}

function renderProducts(){
  const items = getVisibleProducts();

  grid.innerHTML = items.map(p => `
    <article class="card reveal">
      <div class="card-media" role="img" aria-label="${escapeHtml(p.name)} image">
        <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy" />
      </div>

      <div class="card-body">
        <div class="kicker">${p.category} • <span class="tag">${p.featured ? "Featured" : "Core"}</span></div>
        <h3 class="title">${escapeHtml(p.name)}</h3>
        <div class="muted">${escapeHtml(p.note)}</div>

        <div class="card-row">
          <div class="price">${money(p.price)}</div>
          <div class="card-actions">
            <button class="btn btn-ghost" data-view="${p.id}">View</button>
            <button class="btn btn-primary" data-add="${p.id}">Add</button>
          </div>
        </div>

        <div class="card-row" style="margin-top:10px;">
          <button class="btn w-full" data-wish="${p.id}">
            ${wish[p.id] ? "♥ Saved" : "♡ Save"}
          </button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-add]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      addToCart(btn.getAttribute("data-add"));
      showToast("Added to cart");
    });
  });

  grid.querySelectorAll("[data-view]").forEach(btn=>{
    btn.addEventListener("click", ()=> openModal(btn.getAttribute("data-view")));
  });

  grid.querySelectorAll("[data-wish]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      toggleWish(btn.getAttribute("data-wish"));
      renderProducts();
    });
  });

  // trigger reveal animation for newly rendered cards
  requestAnimationFrame(()=> runRevealOnce());
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

function addToCart(id){
  cart[id] = (cart[id] || 0) + 1;
  save("cart", cart);
  renderCart();
}

function removeFromCart(id){
  delete cart[id];
  save("cart", cart);
  renderCart();
}

function changeQty(id, delta){
  const next = (cart[id] || 0) + delta;
  if(next <= 0) delete cart[id];
  else cart[id] = next;
  save("cart", cart);
  renderCart();
}

function toggleWish(id){
  if(wish[id]) delete wish[id];
  else wish[id] = true;
  save("wish", wish);
  renderCounts();
  showToast(wish[id] ? "Saved" : "Removed");
}

function computeSubtotal(){
  let sum = 0;
  for(const [id, qty] of Object.entries(cart)){
    const p = PRODUCTS.find(x => x.id === id);
    if(p) sum += p.price * qty;
  }
  return sum;
}

function renderCounts(){
  const totalItems = Object.values(cart).reduce((a,q)=>a+q,0);
  cartCount.textContent = totalItems;

  const w = Object.keys(wish).length;
  wishCount.textContent = w;
}

function renderCart(){
  const entries = Object.entries(cart);
  renderCounts();

  if(entries.length === 0){
    cartItems.innerHTML = `<div class="muted">Your cart is empty.</div>`;
  } else {
    cartItems.innerHTML = entries.map(([id, qty])=>{
      const p = PRODUCTS.find(x=>x.id===id);
      return `
        <div class="cart-item">
          <div class="cart-top">
            <div>
              <div style="font-weight:850">${escapeHtml(p.name)}</div>
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

// Reveal animation
function runRevealOnce(){
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight - 40){
      el.classList.add("is-in");
    }
  });
}

function wireRevealObserver(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("is-in");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el=> io.observe(el));
}

// Hero featured
function initHero(){
  const featured = PRODUCTS.find(p=>p.featured) || PRODUCTS[0];
  heroImg.style.backgroundImage = `url("${featured.img}")`;
  heroTitle.textContent = featured.name;
  heroPrice.textContent = money(featured.price);

  heroQuickView.addEventListener("click", ()=> openModal(featured.id));
  scrollBtn.addEventListener("click", ()=> document.getElementById("shop").scrollIntoView({behavior:"smooth"}));
}

// Category pills
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

// Cart open/close
cartBtn.addEventListener("click", openDrawer);
closeCart.addEventListener("click", closeDrawer);

// Wishlist button = quick filter (shows toast)
wishlistBtn.addEventListener("click", ()=>{
  const n = Object.keys(wish).length;
  showToast(n ? `${n} saved item(s)` : "Wishlist is empty");
});

// Overlay click closes whatever is open
overlay.addEventListener("click", ()=>{
  closeDrawer();
  closeModalUI();
  closeCheckoutUI();
});

// Quick view modal buttons
closeModal.addEventListener("click", closeModalUI);
mAdd.addEventListener("click", ()=>{
  if(!currentModalId) return;
  addToCart(currentModalId);
  showToast("Added to cart");
});
mWish.addEventListener("click", ()=>{
  if(!currentModalId) return;
  toggleWish(currentModalId);
  mWish.textContent = wish[currentModalId] ? "♥ Saved" : "♡ Save";
});

// Size selection UI only
document.querySelectorAll(".size").forEach(s=>{
  s.addEventListener("click", ()=>{
    document.querySelectorAll(".size").forEach(x=>x.classList.remove("is-active"));
    s.classList.add("is-active");
  });
});

// Checkout modal
checkoutBtn.addEventListener("click", ()=>{
  if(Object.keys(cart).length === 0){
    showToast("Cart is empty");
    return;
  }
  openCheckout();
});

closeCheckout.addEventListener("click", closeCheckoutUI);

checkoutForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  cart = {};
  save("cart", cart);
  renderCart();
  closeCheckoutUI();
  closeDrawer();
  showToast("Order placed (demo)");
});

// Init
wireRevealObserver();
initHero();
renderProducts();
renderCart();
runRevealOnce();
