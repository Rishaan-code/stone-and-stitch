/***********************
  Stone & Stitch demo store
  Fixes:
  - Reliable images that load on iPhone (no fake Unsplash IDs)
  - Mobile grid: 2 columns, smaller tiles, tighter spacing
  - Listings show price + rating + reviews + shipping line under image
************************/

const IMG = {
  // These are known-good Unsplash image IDs (stable URLs)
  denimA: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1600&q=80",
  denimB: "https://images.unsplash.com/photo-1534026609802-f7239f184d91?auto=format&fit=crop&w=1600&q=80",
  hoodieA:"https://images.unsplash.com/photo-1520975916798-6b7c1b0b6a3d?auto=format&fit=crop&w=1600&q=80",
  hoodieB:"https://images.unsplash.com/photo-1520975958225-2b89d83cfe19?auto=format&fit=crop&w=1600&q=80",
  teeA:   "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80",
  teeB:   "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1600&q=80",
  pantsA: "https://images.unsplash.com/photo-1522897355400-c4fdec73d979?auto=format&fit=crop&w=1600&q=80",
  pantsB: "https://images.unsplash.com/photo-1523654999808-59842135e652?auto=format&fit=crop&w=1600&q=80",
  shortsA:"https://images.unsplash.com/photo-1559234626-0ebf4754d937?auto=format&fit=crop&w=1600&q=80",
  shortsB:"https://images.unsplash.com/photo-1559234626-1304f83caed6?auto=format&fit=crop&w=1600&q=80",
};

const PRODUCTS = [
  // JEANS
  {
    id:"ss-denim-001",
    name:"STAINED GLASS WAXED DENIM",
    category:"Jeans",
    price:124,
    inStock:true,
    colors:["Black Wax","Indigo Wax"],
    sizes:["28","30","32","34","36"],
    rating:4.8, reviews:312,
    ships:"Ships in 1–2 days",
    desc:"Waxed denim with a structured fit and heavy hand-feel. Designed to stack clean.",
    images:[IMG.denimB, IMG.denimA, IMG.denimB, IMG.denimA],
    tags:["denim","waxed","stack"]
  },
  {
    id:"ss-denim-002",
    name:"EVERYDAY STRAIGHT DENIM",
    category:"Jeans",
    price:94,
    inStock:true,
    colors:["Vintage Blue","Washed Black"],
    sizes:["28","30","32","34","36"],
    rating:4.6, reviews:198,
    ships:"Ships in 1–2 days",
    desc:"Straight leg silhouette. Durable stitching and clean lines.",
    images:[IMG.denimA, IMG.denimB, IMG.denimA, IMG.denimB],
    tags:["denim","straight"]
  },

  // HOODIES
  {
    id:"ss-hood-001",
    name:"BRIGHT STAR ZIPUP",
    category:"Hoodies",
    price:84,
    inStock:true,
    colors:["Black","Washed Black"],
    sizes:["S","M","L","XL"],
    rating:4.7, reviews:421,
    ships:"Ships in 1–2 days",
    desc:"Heavy zip hoodie with a boxy cut. Soft interior, built for layering.",
    images:[IMG.hoodieB, IMG.hoodieA, IMG.hoodieB, IMG.hoodieA],
    tags:["hoodie","zip"]
  },
  {
    id:"ss-hood-002",
    name:"RETURN TO FOREVER HOODIE",
    category:"Hoodies",
    price:76,
    inStock:false,
    colors:["Graphite","Sand"],
    sizes:["S","M","L","XL"],
    rating:4.9, reviews:97,
    ships:"Restock soon",
    desc:"Pullover fleece hoodie. Premium ribbing, heavyweight feel.",
    images:[IMG.hoodieA, IMG.hoodieB, IMG.hoodieA, IMG.hoodieB],
    tags:["hoodie","pullover"]
  },

  // SHIRTS
  {
    id:"ss-tee-001",
    name:"PURE WHITE HEAVY TEE",
    category:"Shirts",
    price:34,
    inStock:true,
    colors:["White","Off-White"],
    sizes:["S","M","L","XL"],
    rating:4.5, reviews:542,
    ships:"Ships in 1–2 days",
    desc:"260gsm heavyweight tee with a structured drape. Minimal branding.",
    images:[IMG.teeA, IMG.teeB, IMG.teeA, IMG.teeB],
    tags:["tee","heavyweight"]
  },
  {
    id:"ss-tee-002",
    name:"BLACK CORE TEE",
    category:"Shirts",
    price:34,
    inStock:true,
    colors:["Black"],
    sizes:["S","M","L","XL"],
    rating:4.6, reviews:384,
    ships:"Ships in 1–2 days",
    desc:"Everyday essential. Slightly boxy with a clean collar.",
    images:[IMG.teeB, IMG.teeA, IMG.teeB, IMG.teeA],
    tags:["tee","black"]
  },

  // PANTS
  {
    id:"ss-pant-001",
    name:"MUSIC SWEATPANTS",
    category:"Pants",
    price:94,
    inStock:true,
    colors:["Black","Ash"],
    sizes:["S","M","L","XL"],
    rating:4.7, reviews:226,
    ships:"Ships in 1–2 days",
    desc:"Heavy sweatpants built for stacking. Deep pockets, premium drawcord.",
    images:[IMG.pantsA, IMG.pantsB, IMG.pantsA, IMG.pantsB],
    tags:["sweatpants","stack"]
  },
  {
    id:"ss-pant-002",
    name:"TECH CARGO PANTS",
    category:"Pants",
    price:98,
    inStock:true,
    colors:["Black","Olive"],
    sizes:["S","M","L","XL"],
    rating:4.6, reviews:173,
    ships:"Ships in 1–2 days",
    desc:"Technical cargo with a sharp taper. Lightweight, durable fabric.",
    images:[IMG.pantsB, IMG.pantsA, IMG.pantsB, IMG.pantsA],
    tags:["cargo","tech"]
  },

  // SHORTS
  {
    id:"ss-short-001",
    name:"NYLON TRAIL SHORT",
    category:"Shorts",
    price:48,
    inStock:true,
    colors:["Black","Stone"],
    sizes:["S","M","L","XL"],
    rating:4.4, reviews:109,
    ships:"Ships in 1–2 days",
    desc:"Quick-dry nylon short with a secure zip pocket. Clean everyday fit.",
    images:[IMG.shortsA, IMG.shortsB, IMG.shortsA, IMG.shortsB],
    tags:["nylon","trail"]
  },
  {
    id:"ss-short-002",
    name:"COTTON EVERYDAY SHORT",
    category:"Shorts",
    price:42,
    inStock:true,
    colors:["Black","Heather"],
    sizes:["S","M","L","XL"],
    rating:4.5, reviews:88,
    ships:"Ships in 1–2 days",
    desc:"Soft cotton short. Minimal branding, easy wear.",
    images:[IMG.shortsB, IMG.shortsA, IMG.shortsB, IMG.shortsA],
    tags:["cotton","everyday"]
  },
];

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const app = $("#app");
const overlay = $("#overlay");

const cartDrawer = $("#cartDrawer");
const cartBtn = $("#cartBtn");
const closeCart = $("#closeCart");
const cartItems = $("#cartItems");
const cartSubtotal = $("#cartSubtotal");
const cartTotal = $("#cartTotal");
const shipEstimate = $("#shipEstimate");
const checkoutBtn = $("#checkoutBtn");

const favBtn = $("#favoritesBtn");
const favCount = $("#favCount");
const cartCount = $("#cartCount");

const mobileNav = $("#mobileNav");
const mobileMenuBtn = $("#mobileMenuBtn");
const closeMobileNav = $("#closeMobileNav");

const searchModal = $("#searchModal");
const openSearch = $("#openSearch");
const closeSearch = $("#closeSearch");
const searchInputGlobal = $("#searchInputGlobal");
const searchResults = $("#searchResults");

const toast = $("#toast");

// Persisted state
let cart = load("ss_cart", []); // [{id, color, size, qty}]
let favorites = load("ss_favs", {}); // {id:true}

function save(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
function load(key, fallback){
  try{ const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch{ return fallback; }
}
function money(n){
  const x = Number(n);
  return x.toLocaleString(undefined, { style:"currency", currency:"USD" });
}
function showToast(msg){
  toast.textContent = msg;
  toast.classList.remove("hidden");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.add("hidden"), 1600);
}
function setOverlay(on){
  overlay.classList.toggle("hidden", !on);
  overlay.setAttribute("aria-hidden", String(!on));
}
function anyLayerOpen(){
  return (
    !cartDrawer.classList.contains("hidden") ||
    !mobileNav.classList.contains("hidden") ||
    !searchModal.classList.contains("hidden")
  );
}
function closeAllLayers(){
  closeCartDrawer();
  closeMobileNavDrawer();
  closeSearchModal();
  setOverlay(false);
}

function openCartDrawer(){
  cartDrawer.classList.remove("hidden");
  cartDrawer.setAttribute("aria-hidden","false");
  setOverlay(true);
}
function closeCartDrawer(){
  cartDrawer.classList.add("hidden");
  cartDrawer.setAttribute("aria-hidden","true");
  if(!anyLayerOpen()) setOverlay(false);
}
function openMobileNavDrawer(){
  mobileNav.classList.remove("hidden");
  mobileNav.setAttribute("aria-hidden","false");
  setOverlay(true);
}
function closeMobileNavDrawer(){
  mobileNav.classList.add("hidden");
  mobileNav.setAttribute("aria-hidden","true");
  if(!anyLayerOpen()) setOverlay(false);
}
function openSearchModalUI(){
  searchModal.classList.remove("hidden");
  searchModal.setAttribute("aria-hidden","false");
  setOverlay(true);
  searchInputGlobal.value = "";
  renderSearchResults("");
  setTimeout(()=> searchInputGlobal.focus(), 10);
}
function closeSearchModal(){
  searchModal.classList.add("hidden");
  searchModal.setAttribute("aria-hidden","true");
  if(!anyLayerOpen()) setOverlay(false);
}

/* ---------- Routing ---------- */
function route(){
  const hash = location.hash.replace(/^#/, "") || "/";
  const parts = hash.split("/").filter(Boolean);

  closeMobileNavDrawer();
  closeSearchModal();

  if(parts.length === 0){ renderHome(); return; }
  if(parts[0] === "shop"){ renderShop(); return; }
  if(parts[0] === "product" && parts[1]){ renderProduct(parts[1]); return; }
  if(parts[0] === "favorites"){ renderFavorites(); return; }
  if(parts[0] === "contact"){ renderContact(); return; }

  renderNotFound();
}
window.addEventListener("hashchange", route);

/* ---------- Favorites ---------- */
function setFav(id, on){
  if(on) favorites[id] = true;
  else delete favorites[id];
  save("ss_favs", favorites);
  renderBadges();
}
function toggleFav(id){
  const on = !favorites[id];
  setFav(id, on);
  showToast(on ? "Added to favorites" : "Removed from favorites");
}

/* ---------- Cart ---------- */
function cartKey(line){ return `${line.id}::${line.color}::${line.size}`; }

function addToCart({id, color, size, qty}){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;

  if(!p.inStock){
    showToast("This item is sold out");
    return;
  }

  const line = {id, color, size, qty: Math.max(1, Number(qty||1))};
  const key = cartKey(line);
  const idx = cart.findIndex(x => cartKey(x) === key);

  if(idx >= 0) cart[idx].qty += line.qty;
  else cart.push(line);

  save("ss_cart", cart);
  renderBadges();
  renderCart();
  showToast("Added to cart");
}
function removeLine(key){
  cart = cart.filter(x => cartKey(x) !== key);
  save("ss_cart", cart);
  renderBadges();
  renderCart();
}
function changeQty(key, delta){
  cart = cart.map(x => (cartKey(x) !== key) ? x : ({...x, qty: Math.max(1, x.qty + delta)}));
  save("ss_cart", cart);
  renderBadges();
  renderCart();
}
function subtotal(){
  return cart.reduce((sum, line) => {
    const p = PRODUCTS.find(x=>x.id===line.id);
    return p ? sum + p.price * line.qty : sum;
  }, 0);
}
function shippingEstimate(sub){
  if(sub === 0) return 0;
  return sub >= 100 ? 0 : 8;
}
function renderBadges(){
  cartCount.textContent = String(cart.reduce((a,x)=>a+x.qty,0));
  favCount.textContent = String(Object.keys(favorites).length);
}
function renderCart(){
  const sub = subtotal();
  const ship = shippingEstimate(sub);
  const total = sub + ship;

  cartSubtotal.textContent = money(sub);
  shipEstimate.textContent = money(ship);
  cartTotal.textContent = money(total);

  if(cart.length === 0){
    cartItems.innerHTML = `<div class="muted">Your cart is empty.</div>`;
    return;
  }

  cartItems.innerHTML = cart.map(line => {
    const p = PRODUCTS.find(x=>x.id===line.id);
    const key = cartKey(line);
    const lineTotal = p ? p.price * line.qty : 0;

    return `
      <div class="cartline">
        <div class="cartline-top">
          <div>
            <div class="cartline-name">${escapeHtml(p?.name || "Item")}</div>
            <div class="cartline-meta">${escapeHtml(line.color)} • ${escapeHtml(line.size)} • ${money(p?.price || 0)}</div>
          </div>
          <button class="iconbtn" data-remove="${escapeHtml(key)}" type="button" aria-label="Remove">✕</button>
        </div>

        <div class="cartline-qty">
          <div class="qtyrow">
            <button class="qtybtn" data-dec="${escapeHtml(key)}" type="button">−</button>
            <div class="qtyval">${line.qty}</div>
            <button class="qtybtn" data-inc="${escapeHtml(key)}" type="button">+</button>
          </div>
          <strong>${money(lineTotal)}</strong>
        </div>
      </div>
    `;
  }).join("");

  $$("[data-remove]", cartItems).forEach(b => b.addEventListener("click", () => removeLine(b.getAttribute("data-remove"))));
  $$("[data-dec]", cartItems).forEach(b => b.addEventListener("click", () => changeQty(b.getAttribute("data-dec"), -1)));
  $$("[data-inc]", cartItems).forEach(b => b.addEventListener("click", () => changeQty(b.getAttribute("data-inc"), 1)));
}

/* ---------- Search ---------- */
function renderSearchResults(q){
  const query = (q||"").trim().toLowerCase();
  const results = query
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      ).slice(0, 8)
    : PRODUCTS.slice(0, 6);

  searchResults.innerHTML = results.map(p => `
    <div class="sresult">
      <div class="sleft">
        <div class="simg"><img src="${imgW(p.images[0], 200)}" alt="${escapeHtml(p.name)}" loading="lazy"></div>
        <div>
          <div class="sname">${escapeHtml(p.name)}</div>
          <div class="smini">${p.category} • ${money(p.price)} ${p.inStock ? "" : "• SOLD OUT"}</div>
        </div>
      </div>
      <a class="btn ghost" href="#/product/${encodeURIComponent(p.id)}">View</a>
    </div>
  `).join("");
}

/* ---------- Pages ---------- */
function renderHome(){
  const featured = PRODUCTS.find(p=>p.inStock) || PRODUCTS[0];

  app.innerHTML = `
    <section class="hero">
      <div class="wrap hero-grid">
        <div class="hero-card">
          <div class="hero-body">
            <div class="kicker">New drop</div>
            <div class="h1">Premium essentials.<br/>Tight, minimal UX.</div>
            <p class="hero-p">
              Mobile-first apparel storefront: filters, favorites, product pages, cart drawer, and search.
              Built to feel real so your body-scan demo looks legit.
            </p>
            <div class="btnrow">
              <a class="btn primary" href="#/shop">Shop</a>
              <a class="btn ghost" href="#/product/${encodeURIComponent(featured.id)}">Featured</a>
            </div>
          </div>
        </div>

        <div class="hero-card">
          <div class="hero-media" style="background-image:url('${imgW(featured.images[0], 1400)}')"></div>
          <div class="hero-body">
            <div class="kicker">Featured</div>
            <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-end;">
              <div style="font-weight:980;letter-spacing:.08em;text-transform:uppercase;font-size:12px">${escapeHtml(featured.name)}</div>
              <div style="font-weight:980;">${money(featured.price)}</div>
            </div>
            <div class="fine muted" style="margin-top:8px">${featured.ships}</div>
            <div class="btnrow" style="margin-top:12px;">
              <a class="btn primary wide" href="#/product/${encodeURIComponent(featured.id)}">View product</a>
            </div>
          </div>
        </div>
      </div>

      <div class="wrap">
        <div class="section-head">
          <h2 class="h2">Latest</h2>
          <a class="navlink" href="#/shop">Browse all</a>
        </div>
        <div class="grid" id="homeGrid"></div>

        <div class="footer">
          © ${new Date().getFullYear()} Stone & Stitch • Demo storefront
        </div>
      </div>
    </section>
  `;

  const grid = $("#homeGrid");
  grid.innerHTML = PRODUCTS.slice(0, 6).map(cardHTML).join("");
  wireCardButtons(grid);
}

function renderShop(){
  const state = {
    cat: "All",
    q: "",
    sort: "featured",
    priceMax: 150,
    sizes: new Set(),
    availability: "all"
  };

  const hash = location.hash;
  const qs = hash.includes("?") ? hash.split("?")[1] : "";
  const params = new URLSearchParams(qs);
  const cat = params.get("cat");
  if(cat && ["All","Jeans","Shirts","Pants","Hoodies","Shorts"].includes(cat)) state.cat = cat;

  app.innerHTML = `
    <section class="wrap">
      <div class="section-head">
        <h2 class="h2">Shop</h2>
        <div class="muted">Filters + favorites + cart work on mobile.</div>
      </div>

      <div class="shoplayout">
        <aside class="filters" aria-label="Filters">
          <div class="filter-title">Filters</div>

          <div class="fgroup">
            <div class="flabel">Search</div>
            <input class="input" id="q" type="search" placeholder="Search…" />
          </div>

          <div class="fgroup">
            <div class="flabel">Category</div>
            <select id="cat">
              <option>All</option>
              <option>Jeans</option>
              <option>Shirts</option>
              <option>Pants</option>
              <option>Hoodies</option>
              <option>Shorts</option>
            </select>
          </div>

          <div class="fgroup">
            <div class="flabel">Price (max)</div>
            <input class="range" id="priceMax" type="range" min="10" max="200" step="1" value="150" />
            <div class="row small">
              <span>Up to</span>
              <strong id="priceLabel">$150</strong>
            </div>
          </div>

          <div class="fgroup">
            <div class="flabel">Size</div>
            <div class="checks" id="sizeChecks"></div>
            <div class="small">Select multiple sizes.</div>
          </div>

          <div class="fgroup">
            <div class="flabel">Availability</div>
            <select id="availability">
              <option value="all">All</option>
              <option value="in">In stock</option>
              <option value="out">Sold out</option>
            </select>
          </div>

          <div class="fgroup">
            <div class="flabel">Sort</div>
            <select id="sort">
              <option value="featured">Featured</option>
              <option value="low">Price: low → high</option>
              <option value="high">Price: high → low</option>
              <option value="az">Name: A → Z</option>
            </select>
          </div>

          <div class="fgroup">
            <button class="btn wide" id="clearFilters" type="button">Clear filters</button>
          </div>
        </aside>

        <div>
          <div class="section-head" style="margin-top:0">
            <h2 class="h2">Results</h2>
            <div class="muted" id="resultsCount"></div>
          </div>
          <div class="grid" id="shopGrid"></div>
        </div>
      </div>

      <div class="footer">© ${new Date().getFullYear()} Stone & Stitch • Demo storefront</div>
    </section>
  `;

  const allSizes = Array.from(new Set(PRODUCTS.flatMap(p => p.sizes))).sort((a,b)=>{
    const na = Number(a), nb = Number(b);
    const aNum = !Number.isNaN(na), bNum = !Number.isNaN(nb);
    if(aNum && bNum) return na-nb;
    if(aNum) return -1;
    if(bNum) return 1;
    return String(a).localeCompare(String(b));
  });

  $("#sizeChecks").innerHTML = allSizes.map(s => `
    <label class="check">
      <input type="checkbox" value="${escapeHtml(s)}" />
      <span>${escapeHtml(s)}</span>
    </label>
  `).join("");

  const qEl = $("#q");
  const catEl = $("#cat");
  const priceEl = $("#priceMax");
  const priceLabel = $("#priceLabel");
  const availEl = $("#availability");
  const sortEl = $("#sort");
  const clearBtn = $("#clearFilters");
  const grid = $("#shopGrid");
  const resultsCount = $("#resultsCount");

  catEl.value = state.cat;

  function apply(){
    const items = filteredProducts(state);
    resultsCount.textContent = `${items.length} item(s)`;
    grid.innerHTML = items.map(cardHTML).join("");
    wireCardButtons(grid);
  }

  qEl.addEventListener("input", () => { state.q = qEl.value; apply(); });
  catEl.addEventListener("change", () => { state.cat = catEl.value; apply(); });
  priceEl.addEventListener("input", () => {
    state.priceMax = Number(priceEl.value);
    priceLabel.textContent = money(state.priceMax).replace(".00","");
    apply();
  });
  availEl.addEventListener("change", () => { state.availability = availEl.value; apply(); });
  sortEl.addEventListener("change", () => { state.sort = sortEl.value; apply(); });

  $$("#sizeChecks input").forEach(ch => {
    ch.addEventListener("change", () => {
      const v = ch.value;
      if(ch.checked) state.sizes.add(v);
      else state.sizes.delete(v);
      apply();
    });
  });

  clearBtn.addEventListener("click", () => {
    state.cat = "All";
    state.q = "";
    state.sort = "featured";
    state.priceMax = 150;
    state.sizes = new Set();
    state.availability = "all";

    qEl.value = "";
    catEl.value = "All";
    sortEl.value = "featured";
    availEl.value = "all";
    priceEl.value = "150";
    priceLabel.textContent = "$150";
    $$("#sizeChecks input").forEach(ch => ch.checked = false);

    apply();
  });

  priceLabel.textContent = "$150";
  apply();
}

function renderProduct(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p){ renderNotFound(); return; }

  let selectedColor = p.colors[0];
  let selectedSize = p.sizes[0];
  let qty = 1;

  app.innerHTML = `
    <section class="wrap">
      <div class="section-head" style="margin-top:0">
        <a class="navlink" href="#/shop">← Back to shop</a>
        <div class="muted">${p.category}</div>
      </div>

      <div class="product">
        <div class="gallery">
          <div class="gallery-main">
            <img id="mainImg" src="${imgW(p.images[0], 1400)}" alt="${escapeHtml(p.name)}" />
          </div>
          <div class="thumbs" id="thumbs"></div>
        </div>

        <div class="pinfo">
          <div class="kicker">${p.inStock ? "In stock" : "Sold out"}</div>
          <h1 class="pbig">${escapeHtml(p.name)}</h1>

          <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-end;margin-top:10px">
            <strong style="font-size:18px">${money(p.price)}</strong>
            <button class="btn ${favorites[p.id] ? "primary" : ""}" id="favToggle" type="button">
              ${favorites[p.id] ? "♥ Favorited" : "♡ Favorite"}
            </button>
          </div>

          <div class="rating">
            <span class="stars">${stars(p.rating)}</span>
            <span>${p.rating.toFixed(1)} • ${p.reviews} reviews</span>
          </div>

          <div class="fine muted" style="margin-top:8px">${p.ships}</div>

          <p class="psub">${escapeHtml(p.desc)}</p>

          <div class="divider"></div>

          <div class="variant-row">
            <div>
              <div class="flabel">Color</div>
              <div class="swatches" id="colors"></div>
            </div>

            <div>
              <div class="flabel">Size</div>
              <div class="swatches" id="sizes"></div>
            </div>

            <div class="row">
              <div>
                <div class="flabel">Quantity</div>
                <div class="qtyrow">
                  <button class="qtybtn" id="decQty" type="button">−</button>
                  <div class="qtyval" id="qtyVal">1</div>
                  <button class="qtybtn" id="incQty" type="button">+</button>
                </div>
              </div>

              <div style="min-width:160px">
                <button class="btn primary wide" id="addToCart" type="button" ${p.inStock ? "" : "disabled"}>
                  ${p.inStock ? "Add to cart" : "Sold out"}
                </button>
              </div>
            </div>

            <div class="fine muted">
              Fit hook: you can place your Body Scan UI right before checkout later.
            </div>
          </div>
        </div>
      </div>

      <div class="section-head">
        <h2 class="h2">You may also like</h2>
        <div></div>
      </div>
      <div class="grid" id="recGrid"></div>

      <div class="footer">© ${new Date().getFullYear()} Stone & Stitch • Demo storefront</div>
    </section>
  `;

  // thumbs
  const thumbs = $("#thumbs");
  thumbs.innerHTML = p.images.map((src, i) => `
    <button class="thumb ${i===0 ? "active":""}" data-src="${src}" type="button">
      <img src="${imgW(src, 400)}" alt="${escapeHtml(p.name)} thumbnail ${i+1}" loading="lazy">
    </button>
  `).join("");

  $$(".thumb", thumbs).forEach(btn=>{
    btn.addEventListener("click", ()=>{
      $$(".thumb", thumbs).forEach(x=>x.classList.remove("active"));
      btn.classList.add("active");
      const src = btn.getAttribute("data-src") || p.images[0];
      $("#mainImg").src = imgW(src, 1400);
    });
  });

  // swatches
  const colorsEl = $("#colors");
  colorsEl.innerHTML = p.colors.map((c, i) => `
    <button class="swatch ${i===0 ? "active":""}" data-color="${escapeHtml(c)}" type="button">${escapeHtml(c)}</button>
  `).join("");

  const sizesEl = $("#sizes");
  sizesEl.innerHTML = p.sizes.map((s, i) => `
    <button class="swatch ${i===0 ? "active":""}" data-size="${escapeHtml(s)}" type="button">${escapeHtml(s)}</button>
  `).join("");

  $$(".swatch", colorsEl).forEach(b=>{
    b.addEventListener("click", ()=>{
      $$(".swatch", colorsEl).forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      selectedColor = b.getAttribute("data-color") || p.colors[0];
    });
  });

  $$(".swatch", sizesEl).forEach(b=>{
    b.addEventListener("click", ()=>{
      $$(".swatch", sizesEl).forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      selectedSize = b.getAttribute("data-size") || p.sizes[0];
    });
  });

  // qty
  const qtyVal = $("#qtyVal");
  $("#decQty").addEventListener("click", ()=>{ qty = Math.max(1, qty-1); qtyVal.textContent = String(qty); });
  $("#incQty").addEventListener("click", ()=>{ qty = Math.min(20, qty+1); qtyVal.textContent = String(qty); });

  // favorite
  const favToggle = $("#favToggle");
  favToggle.addEventListener("click", ()=>{
    toggleFav(p.id);
    favToggle.textContent = favorites[p.id] ? "♥ Favorited" : "♡ Favorite";
    favToggle.classList.toggle("primary", !!favorites[p.id]);
  });

  // add to cart
  $("#addToCart").addEventListener("click", ()=>{
    addToCart({id:p.id, color:selectedColor, size:selectedSize, qty});
    openCartDrawer();
  });

  // recs
  const rec = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 3);
  const fallback = PRODUCTS.filter(x => x.id !== p.id).slice(0, 3);
  const picks = (rec.length ? rec : fallback);
  const recGrid = $("#recGrid");
  recGrid.innerHTML = picks.map(cardHTML).join("");
  wireCardButtons(recGrid);
}

function renderFavorites(){
  const items = PRODUCTS.filter(p => favorites[p.id]);

  app.innerHTML = `
    <section class="wrap">
      <div class="section-head" style="margin-top:0">
        <h2 class="h2">Favorites</h2>
        <div class="muted">${items.length} item(s)</div>
      </div>

      ${items.length
        ? `<div class="grid" id="favGrid"></div>`
        : `<div class="muted">No favorites yet. Browse the shop and tap ♡.</div>`
      }

      <div class="footer">© ${new Date().getFullYear()} Stone & Stitch • Demo storefront</div>
    </section>
  `;

  if(items.length){
    const g = $("#favGrid");
    g.innerHTML = items.map(cardHTML).join("");
    wireCardButtons(g);
  }
}

function renderContact(){
  app.innerHTML = `
    <section class="wrap">
      <div class="section-head" style="margin-top:0">
        <h2 class="h2">Contact</h2>
        <div class="muted">Demo form (stored locally)</div>
      </div>

      <div style="max-width:620px">
        <div class="filters" style="position:relative;top:auto">
          <div class="filter-title">Message</div>
          <div class="fgroup">
            <div class="flabel">Email</div>
            <input class="input" id="cEmail" type="email" placeholder="you@email.com" />
          </div>
          <div class="fgroup">
            <div class="flabel">Message</div>
            <textarea class="input" id="cMsg" rows="5" placeholder="How can we help?" style="resize:vertical"></textarea>
          </div>
          <div class="fgroup">
            <button class="btn primary wide" id="sendMsg" type="button">Send</button>
          </div>
          <div class="fine muted">Wire this to your backend later if you want.</div>
        </div>
      </div>

      <div class="footer">© ${new Date().getFullYear()} Stone & Stitch • Demo storefront</div>
    </section>
  `;

  $("#sendMsg").addEventListener("click", ()=>{
    const email = ($("#cEmail").value||"").trim();
    const msg = ($("#cMsg").value||"").trim();
    if(!email || !msg){
      showToast("Please fill in email + message");
      return;
    }
    save("ss_contact_last", {email, msg, ts: Date.now()});
    $("#cEmail").value = "";
    $("#cMsg").value = "";
    showToast("Message sent (demo)");
  });
}

function renderNotFound(){
  app.innerHTML = `
    <section class="wrap">
      <div class="section-head" style="margin-top:0">
        <h2 class="h2">Not found</h2>
        <div></div>
      </div>
      <div class="muted">That page doesn’t exist.</div>
      <div class="btnrow" style="margin-top:12px">
        <a class="btn primary" href="#/">Go home</a>
        <a class="btn ghost" href="#/shop">Shop</a>
      </div>
    </section>
  `;
}

/* ---------- Filtering ---------- */
function filteredProducts(state){
  let items = PRODUCTS.slice();

  if(state.cat && state.cat !== "All") items = items.filter(p => p.category === state.cat);
  if(state.availability === "in") items = items.filter(p => p.inStock);
  if(state.availability === "out") items = items.filter(p => !p.inStock);

  if(state.q && state.q.trim()){
    const q = state.q.trim().toLowerCase();
    items = items.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  items = items.filter(p => p.price <= state.priceMax);

  if(state.sizes && state.sizes.size){
    items = items.filter(p => p.sizes.some(s => state.sizes.has(s)));
  }

  if(state.sort === "featured"){
    items.sort((a,b)=> Number(b.inStock) - Number(a.inStock));
  } else if(state.sort === "low"){
    items.sort((a,b)=>a.price-b.price);
  } else if(state.sort === "high"){
    items.sort((a,b)=>b.price-a.price);
  } else if(state.sort === "az"){
    items.sort((a,b)=>a.name.localeCompare(b.name));
  }

  return items;
}

/* ---------- Cards ---------- */
function cardHTML(p){
  const sold = !p.inStock;
  const favOn = !!favorites[p.id];

  return `
    <article class="card">
      <a class="media" href="#/product/${encodeURIComponent(p.id)}" aria-label="View ${escapeHtml(p.name)}">
        <img src="${imgW(p.images[0], 900)}" alt="${escapeHtml(p.name)}" loading="lazy" />
        ${sold ? `<div class="sold">SOLD OUT</div>` : ``}
      </a>

      <div class="cardbody">
        <h3 class="pname">${escapeHtml(p.name)}</h3>

        <div class="meta">
          <div class="muted">${p.category}</div>
          <div class="price">${money(p.price)}</div>
        </div>

        <div class="rating">
          <span class="stars">${stars(p.rating)}</span>
          <span>${p.rating.toFixed(1)} • ${p.reviews}</span>
        </div>

        <div class="fine muted" style="margin-top:6px">${p.ships}</div>

        <div class="cardbtns">
          <button class="btn ${favOn ? "primary heart on" : "heart"}" data-fav="${escapeHtml(p.id)}" type="button" aria-label="Favorite">
            ${favOn ? "♥" : "♡"}
          </button>
          <a class="btn wide" href="#/product/${encodeURIComponent(p.id)}">View</a>
          <button class="btn primary wide" data-quickadd="${escapeHtml(p.id)}" type="button" ${sold ? "disabled" : ""}>
            ${sold ? "Sold out" : "Quick add"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function wireCardButtons(root){
  $$("[data-fav]", root).forEach(b=>{
    b.addEventListener("click", (e)=>{
      e.preventDefault();
      e.stopPropagation();
      const id = b.getAttribute("data-fav");
      toggleFav(id);
      route();
    });
  });

  $$("[data-quickadd]", root).forEach(b=>{
    b.addEventListener("click", ()=>{
      const id = b.getAttribute("data-quickadd");
      const p = PRODUCTS.find(x=>x.id===id);
      if(!p) return;

      addToCart({ id:p.id, color:p.colors[0], size:p.sizes[0], qty:1 });
      openCartDrawer();
    });
  });
}

/* ---------- Helpers ---------- */
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

// Force reliable sizing (helps iPhone load faster too)
function imgW(url, w){
  // Unsplash supports width query param; if url already has ?, append &
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}auto=format&fit=crop&w=${w}&q=80`;
}

function stars(r){
  // 5-star display with filled stars only (simple + clean)
  const full = Math.max(0, Math.min(5, Math.round(r)));
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5-full);
}

/* ---------- Global wiring ---------- */
function init(){
  renderBadges();
  renderCart();
  route();
  renderSearchResults("");

  cartBtn.addEventListener("click", openCartDrawer);
  closeCart.addEventListener("click", (e)=>{ e.preventDefault(); e.stopPropagation(); closeCartDrawer(); });

  favBtn.addEventListener("click", ()=> { location.hash = "#/favorites"; });

  mobileMenuBtn.addEventListener("click", openMobileNavDrawer);
  closeMobileNav.addEventListener("click", (e)=>{ e.preventDefault(); e.stopPropagation(); closeMobileNavDrawer(); });

  openSearch.addEventListener("click", openSearchModalUI);
  closeSearch.addEventListener("click", (e)=>{ e.preventDefault(); e.stopPropagation(); closeSearchModal(); });

  searchInputGlobal.addEventListener("input", ()=> renderSearchResults(searchInputGlobal.value));

  overlay.addEventListener("click", ()=>{
    if(!searchModal.classList.contains("hidden")) { closeSearchModal(); return; }
    if(!mobileNav.classList.contains("hidden")) { closeMobileNavDrawer(); return; }
    if(!cartDrawer.classList.contains("hidden")) { closeCartDrawer(); return; }
    setOverlay(false);
  });

  document.addEventListener("keydown", (e)=>{
    if(e.key !== "Escape") return;
    closeAllLayers();
  });

  checkoutBtn.addEventListener("click", ()=>{
    if(cart.length === 0){
      showToast("Your cart is empty");
      return;
    }
    // Hook point for your API later
    showToast("Checkout hook ready (integrate your API here)");
  });
}

init();
