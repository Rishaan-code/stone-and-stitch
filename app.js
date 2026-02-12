// Classy modern storefront demo: filters, favorites, cart, search, product page.
// No payments. LocalStorage persistence.

const IMG = {
  denim1: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1600&q=80",
  denim2: "https://images.unsplash.com/photo-1534026609802-f7239f184d91?auto=format&fit=crop&w=1600&q=80",
  denim3: "https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=1600&q=80",
  denim4: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80",

  hood1: "https://images.unsplash.com/photo-1520975958225-2b89d83cfe19?auto=format&fit=crop&w=1600&q=80",
  hood2: "https://images.unsplash.com/photo-1520975916798-6b7c1b0b6a3d?auto=format&fit=crop&w=1600&q=80",
  hood3: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
  jacket1:"https://images.unsplash.com/photo-1520975693411-16a7a3c7d2f3?auto=format&fit=crop&w=1600&q=80",

  tee1:  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80",
  tee2:  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1600&q=80",
  tee3:  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
  tee4:  "https://images.unsplash.com/photo-1520975681070-7c1e6d2dfd8f?auto=format&fit=crop&w=1600&q=80",

  pant1: "https://images.unsplash.com/photo-1522897355400-c4fdec73d979?auto=format&fit=crop&w=1600&q=80",
  pant2: "https://images.unsplash.com/photo-1520975721395-3b0c4b2d4f0b?auto=format&fit=crop&w=1600&q=80",
  pant3: "https://images.unsplash.com/photo-1520975750291-6d7c9e86f3d8?auto=format&fit=crop&w=1600&q=80",

  short1:"https://images.unsplash.com/photo-1559234626-0ebf4754d937?auto=format&fit=crop&w=1600&q=80",
  short2:"https://images.unsplash.com/photo-1559234626-1304f83caed6?auto=format&fit=crop&w=1600&q=80",
  short3:"https://images.unsplash.com/photo-1520975741502-4a9a4f2c3a65?auto=format&fit=crop&w=1600&q=80",

  acc1:  "https://images.unsplash.com/photo-1520975698728-8dfd2ed5b6af?auto=format&fit=crop&w=1600&q=80",
  acc2:  "https://images.unsplash.com/photo-1590739225287-bd31519780db?auto=format&fit=crop&w=1600&q=80",
  acc3:  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1600&q=80",
  acc4:  "https://images.unsplash.com/photo-1520975648212-9fe2ad653d77?auto=format&fit=crop&w=1600&q=80",
};

const PRODUCTS = [
  // JEANS (sizes 28-36)
  {id:"jean-01", name:"Waxed Indigo Denim", category:"Jeans", price:124, inStock:true,  colors:["Indigo","Black Wax"], sizes:["28","30","32","34","36"], ship:"Ships 1–2 days", img:IMG.denim1, tags:["denim","waxed","stack"]},
  {id:"jean-02", name:"Straight Vintage Denim", category:"Jeans", price:94, inStock:true,  colors:["Vintage Blue","Washed Black"], sizes:["28","30","32","34","36"], ship:"Ships 1–2 days", img:IMG.denim2, tags:["denim","straight"]},
  {id:"jean-03", name:"Stone Wash Denim", category:"Jeans", price:98, inStock:false, colors:["Grey Wash"], sizes:["28","30","32","34","36"], ship:"Restock soon", img:IMG.denim3, tags:["denim","wash"]},
  {id:"jean-04", name:"Slim Rip Denim", category:"Jeans", price:108, inStock:true,  colors:["Washed Black"], sizes:["28","30","32","34","36"], ship:"Ships 1–2 days", img:IMG.denim4, tags:["denim","ripped"]},

  // HOODIES (S-XL)
  {id:"hood-01", name:"Zip Hoodie — Black", category:"Hoodies", price:84, inStock:true,  colors:["Black"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.hood1, tags:["hoodie","zip"]},
  {id:"hood-02", name:"Zip Hoodie — Ivory", category:"Hoodies", price:84, inStock:true,  colors:["Ivory"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.hood2, tags:["hoodie","zip"]},
  {id:"hood-03", name:"Pullover Hoodie — Graphite", category:"Hoodies", price:76, inStock:false, colors:["Graphite"], sizes:["S","M","L","XL"], ship:"Restock soon", img:IMG.hood3, tags:["hoodie","pullover"]},
  {id:"hood-04", name:"Lightweight Jacket", category:"Outerwear", price:118, inStock:true, colors:["Black"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.jacket1, tags:["jacket","outer"]},

  // SHIRTS (S-XL)
  {id:"tee-01", name:"Heavy Tee — White", category:"Shirts", price:34, inStock:true,  colors:["White","Off-White"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.tee1, tags:["tee","heavy"]},
  {id:"tee-02", name:"Core Tee — Black", category:"Shirts", price:34, inStock:true,  colors:["Black"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.tee2, tags:["tee","core"]},
  {id:"tee-03", name:"Graphic Tee", category:"Shirts", price:42, inStock:true, colors:["Black"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.tee3, tags:["tee","graphic"]},
  {id:"tee-04", name:"Overshirt", category:"Shirts", price:68, inStock:true, colors:["Charcoal"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.tee4, tags:["shirt","overshirt"]},

  // PANTS (S-XL)
  {id:"pant-01", name:"Tech Cargo", category:"Pants", price:98, inStock:true,  colors:["Black","Olive"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.pant1, tags:["cargo","tech"]},
  {id:"pant-02", name:"Music Sweatpants", category:"Pants", price:94, inStock:true, colors:["Black","Ash"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.pant2, tags:["sweatpants"]},
  {id:"pant-03", name:"Wide-Leg Trouser", category:"Pants", price:112, inStock:true, colors:["Black"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.pant3, tags:["trouser","wide"]},

  // SHORTS (S-XL)
  {id:"short-01", name:"Nylon Trail Short", category:"Shorts", price:48, inStock:true, colors:["Black","Stone"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.short1, tags:["shorts","nylon"]},
  {id:"short-02", name:"Everyday Cotton Short", category:"Shorts", price:42, inStock:true, colors:["Heather","Black"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.short2, tags:["shorts","cotton"]},
  {id:"short-03", name:"Mesh Gym Short", category:"Shorts", price:38, inStock:true, colors:["Black"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.short3, tags:["shorts","mesh"]},

  // ACCESSORIES (OS)
  {id:"acc-01", name:"Fitted Cap", category:"Accessories", price:42, inStock:true, colors:["Black"], sizes:["OS"], ship:"Ships 1–2 days", img:IMG.acc1, tags:["hat","cap"]},
  {id:"acc-02", name:"Leather Belt", category:"Accessories", price:68, inStock:true, colors:["Black"], sizes:["OS"], ship:"Ships 1–2 days", img:IMG.acc2, tags:["belt"]},
  {id:"acc-03", name:"Mini Crossbody Bag", category:"Accessories", price:58, inStock:true, colors:["Black"], sizes:["OS"], ship:"Ships 1–2 days", img:IMG.acc3, tags:["bag"]},
  {id:"acc-04", name:"Logo Beanie", category:"Accessories", price:28, inStock:true, colors:["Black","Grey"], sizes:["OS"], ship:"Ships 1–2 days", img:IMG.acc4, tags:["beanie"]},
];

// ---------- helpers ----------
const $ = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
function save(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function load(k,f){ try{ const r=localStorage.getItem(k); return r?JSON.parse(r):f; }catch{ return f; } }
function money(n){ return Number(n).toLocaleString(undefined,{style:"currency",currency:"USD"}); }
function esc(s){ return String(s).replace(/[&<>"']/g,m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[m])); }

// ---------- state ----------
let cart = load("ss_cart", []);         // [{id,color,size,qty}]
let favorites = load("ss_favs", {});    // {id:true}

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

// ---------- UI layers ----------
function setOverlay(on){
  overlay.classList.toggle("hidden", !on);
  overlay.setAttribute("aria-hidden", String(!on));
}
function anyLayerOpen(){
  return !cartDrawer.classList.contains("hidden") ||
         !mobileNav.classList.contains("hidden") ||
         !searchModal.classList.contains("hidden");
}
function closeAll(){
  closeCartDrawer();
  closeMobileNavDrawer();
  closeSearchModal();
  setOverlay(false);
}
function openCartDrawer(){ cartDrawer.classList.remove("hidden"); cartDrawer.setAttribute("aria-hidden","false"); setOverlay(true); }
function closeCartDrawer(){ cartDrawer.classList.add("hidden"); cartDrawer.setAttribute("aria-hidden","true"); if(!anyLayerOpen()) setOverlay(false); }

function openMobileNavDrawer(){ mobileNav.classList.remove("hidden"); mobileNav.setAttribute("aria-hidden","false"); setOverlay(true); }
function closeMobileNavDrawer(){ mobileNav.classList.add("hidden"); mobileNav.setAttribute("aria-hidden","true"); if(!anyLayerOpen()) setOverlay(false); }

function openSearchModalUI(){
  searchModal.classList.remove("hidden");
  searchModal.setAttribute("aria-hidden","false");
  setOverlay(true);
  searchInputGlobal.value="";
  renderSearch("");
  setTimeout(()=>searchInputGlobal.focus(), 10);
}
function closeSearchModal(){
  searchModal.classList.add("hidden");
  searchModal.setAttribute("aria-hidden","true");
  if(!anyLayerOpen()) setOverlay(false);
}

// ---------- toast ----------
function toastMsg(m){
  toast.textContent = m;
  toast.classList.remove("hidden");
  clearTimeout(toastMsg._t);
  toastMsg._t = setTimeout(()=>toast.classList.add("hidden"), 1400);
}

// ---------- favorites ----------
function toggleFav(id){
  if(favorites[id]) delete favorites[id];
  else favorites[id] = true;
  save("ss_favs", favorites);
  renderBadges();
  toastMsg(favorites[id] ? "Added to favorites" : "Removed from favorites");
}

// ---------- cart ----------
function cartKey(l){ return `${l.id}::${l.color}::${l.size}`; }

function addToCart({id,color,size,qty}){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  if(!p.inStock){ toastMsg("Sold out"); return; }

  const line = {id, color, size, qty: Math.max(1, Number(qty||1))};
  const key = cartKey(line);
  const idx = cart.findIndex(x => cartKey(x) === key);
  if(idx >= 0) cart[idx].qty += line.qty;
  else cart.push(line);

  save("ss_cart", cart);
  renderBadges();
  renderCart();
  toastMsg("Added to cart");
}

function subtotal(){
  return cart.reduce((s,l)=>{
    const p = PRODUCTS.find(x=>x.id===l.id);
    return p ? s + p.price*l.qty : s;
  }, 0);
}
function ship(sub){ return sub===0 ? 0 : (sub>=100 ? 0 : 8); }

function removeLine(key){
  cart = cart.filter(x => cartKey(x) !== key);
  save("ss_cart", cart);
  renderBadges();
  renderCart();
}
function changeQty(key, d){
  cart = cart.map(x => cartKey(x)!==key ? x : ({...x, qty: Math.max(1, x.qty+d)}));
  save("ss_cart", cart);
  renderBadges();
  renderCart();
}

function renderBadges(){
  cartCount.textContent = String(cart.reduce((a,x)=>a+x.qty,0));
  favCount.textContent = String(Object.keys(favorites).length);
}

function renderCart(){
  const sub = subtotal();
  const s = ship(sub);
  const t = sub + s;

  cartSubtotal.textContent = money(sub);
  shipEstimate.textContent = money(s);
  cartTotal.textContent = money(t);

  if(cart.length === 0){
    cartItems.innerHTML = `<div class="muted">Your cart is empty.</div>`;
    return;
  }

  cartItems.innerHTML = cart.map(l=>{
    const p = PRODUCTS.find(x=>x.id===l.id);
    const key = cartKey(l);
    return `
      <div class="cartline">
        <div class="cartline-top">
          <div>
            <div class="cartline-name">${esc(p.name)}</div>
            <div class="muted fine">${esc(l.color)} • ${esc(l.size)} • ${money(p.price)}</div>
          </div>
          <button class="iconbtn" data-remove="${esc(key)}" type="button">✕</button>
        </div>
        <div class="row" style="margin-top:10px">
          <div class="qtyrow">
            <button class="btn" data-dec="${esc(key)}" type="button">−</button>
            <div style="min-width:26px;text-align:center">${l.qty}</div>
            <button class="btn" data-inc="${esc(key)}" type="button">+</button>
          </div>
          <strong>${money(p.price*l.qty)}</strong>
        </div>
      </div>
    `;
  }).join("");

  $$("[data-remove]", cartItems).forEach(b=>b.addEventListener("click",()=>removeLine(b.getAttribute("data-remove"))));
  $$("[data-dec]", cartItems).forEach(b=>b.addEventListener("click",()=>changeQty(b.getAttribute("data-dec"),-1)));
  $$("[data-inc]", cartItems).forEach(b=>b.addEventListener("click",()=>changeQty(b.getAttribute("data-inc"), 1)));
}

// ---------- search ----------
function renderSearch(q){
  const query=(q||"").trim().toLowerCase();
  const results = query
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.tags.some(t=>t.includes(query))
      )
    : PRODUCTS;

  searchResults.innerHTML = results.slice(0,12).map(p=>`
    <a class="drawer-link" href="#/product/${encodeURIComponent(p.id)}">
      ${esc(p.name)} — ${money(p.price)} ${p.inStock ? "" : "(SOLD OUT)"}
    </a>
  `).join("");
}

// ---------- routing ----------
function route(){
  const hash = location.hash.replace(/^#/,"") || "/";
  const parts = hash.split("/").filter(Boolean);

  closeMobileNavDrawer();
  closeSearchModal();

  if(parts.length===0){ renderHome(); return; }
  if(parts[0]==="shop"){ renderShop(); return; }
  if(parts[0]==="favorites"){ renderFavorites(); return; }
  if(parts[0]==="contact"){ renderContact(); return; }
  if(parts[0]==="product" && parts[1]){ renderProduct(parts[1]); return; }

  renderNotFound();
}
window.addEventListener("hashchange", route);

// ---------- pages ----------
function renderHome(){
  const heroImg = IMG.denim1;
  app.innerHTML = `
    <section class="wrap">
      <div class="hero">
        <div class="hero-media" style="background-image:url('${heroImg}')"></div>
        <div class="hero-body">
          <h1 class="h1">Classy essentials.<br/>Modern storefront UX.</h1>
          <div class="hero-sub">
            Filters, favorites, cart drawer, search, and responsive layout built for clean demos.
          </div>
          <div class="btnrow">
            <a class="btn primary" href="#/shop">Shop</a>
            <button class="btn" id="openSearch2" type="button">Search</button>
          </div>
        </div>
      </div>

      <div class="section-head">
        <h2 class="h2">Featured</h2>
        <a class="navlink" href="#/shop">View all</a>
      </div>

      <div class="grid" id="featGrid"></div>
    </section>
  `;

  $("#openSearch2").addEventListener("click", openSearchModalUI);

  const g = $("#featGrid");
  const featured = PRODUCTS.filter(p=>p.inStock).slice(0,8);
  g.innerHTML = featured.map(cardHTML).join("");
  wireCardButtons(g);
}

function renderShop(){
  const state={cat:"All", q:"", sort:"featured", priceMax:150, sizes:new Set(), availability:"all"};

  app.innerHTML = `
    <section class="wrap">
      <div class="section-head" style="margin-top:0">
        <h2 class="h2">Shop</h2>
        <div class="muted">Use filters like a real store</div>
      </div>

      <div class="shoplayout">
        <aside class="filters">
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
              <option>Outerwear</option>
              <option>Shorts</option>
              <option>Accessories</option>
            </select>
          </div>

          <div class="fgroup">
            <div class="flabel">Price (max)</div>
            <input class="range" id="priceMax" type="range" min="10" max="200" step="1" value="150" />
            <div class="row fine muted"><span>Up to</span><strong id="priceLabel">$150</strong></div>
          </div>

          <div class="fgroup">
            <div class="flabel">Size</div>
            <div class="checks" id="sizeChecks"></div>
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
              <option value="low">Price low → high</option>
              <option value="high">Price high → low</option>
              <option value="az">Name A → Z</option>
            </select>
          </div>

          <button class="btn wide" id="clear" type="button">Clear</button>
        </aside>

        <div>
          <div class="section-head" style="margin-top:0">
            <h2 class="h2">Results</h2>
            <div class="muted" id="count"></div>
          </div>

          <div class="grid" id="grid"></div>
        </div>
      </div>
    </section>
  `;

  const allSizes = Array.from(new Set(PRODUCTS.flatMap(p=>p.sizes))).sort((a,b)=>a.localeCompare(b));
  $("#sizeChecks").innerHTML = allSizes.map(s=>`
    <label class="check"><input type="checkbox" value="${esc(s)}" /><span>${esc(s)}</span></label>
  `).join("");

  const qEl=$("#q"), catEl=$("#cat"), priceEl=$("#priceMax"), priceLabel=$("#priceLabel"),
        availEl=$("#availability"), sortEl=$("#sort"), clear=$("#clear"),
        grid=$("#grid"), count=$("#count");

  function apply(){
    const items = filter(state);
    count.textContent = `${items.length} item(s)`;
    grid.innerHTML = items.map(cardHTML).join("");
    wireCardButtons(grid);
  }

  qEl.addEventListener("input",()=>{state.q=qEl.value; apply();});
  catEl.addEventListener("change",()=>{state.cat=catEl.value; apply();});
  priceEl.addEventListener("input",()=>{
    state.priceMax=Number(priceEl.value);
    priceLabel.textContent = money(state.priceMax).replace(".00","");
    apply();
  });
  availEl.addEventListener("change",()=>{state.availability=availEl.value; apply();});
  sortEl.addEventListener("change",()=>{state.sort=sortEl.value; apply();});

  $$("#sizeChecks input").forEach(ch=>{
    ch.addEventListener("change",()=>{
      ch.checked ? state.sizes.add(ch.value) : state.sizes.delete(ch.value);
      apply();
    });
  });

  clear.addEventListener("click",()=>{
    state.cat="All"; state.q=""; state.sort="featured"; state.priceMax=150; state.sizes=new Set(); state.availability="all";
    qEl.value=""; catEl.value="All"; sortEl.value="featured"; availEl.value="all"; priceEl.value="150"; priceLabel.textContent="$150";
    $$("#sizeChecks input").forEach(ch=>ch.checked=false);
    apply();
  });

  apply();
}

function renderFavorites(){
  const items = PRODUCTS.filter(p=>favorites[p.id]);
  app.innerHTML = `
    <section class="wrap">
      <div class="section-head" style="margin-top:0">
        <h2 class="h2">Favorites</h2>
        <div class="muted">${items.length} item(s)</div>
      </div>
      ${items.length ? `<div class="grid" id="favGrid"></div>` : `<div class="muted">No favorites yet.</div>`}
    </section>
  `;
  if(items.length){
    const g=$("#favGrid");
    g.innerHTML = items.map(cardHTML).join("");
    wireCardButtons(g);
  }
}

function renderContact(){
  app.innerHTML = `
    <section class="wrap">
      <div class="section-head" style="margin-top:0">
        <h2 class="h2">Contact</h2><div></div>
      </div>

      <div class="filters" style="max-width:640px">
        <div class="filter-title">Message</div>
        <div class="fgroup"><div class="flabel">Email</div><input class="input" id="em" type="email" placeholder="you@email.com"></div>
        <div class="fgroup"><div class="flabel">Message</div><input class="input" id="msg" placeholder="Write something…"></div>
        <button class="btn primary wide" id="send" type="button">Send</button>
        <div class="fine muted" style="margin-top:10px">Demo form — wire to your backend later.</div>
      </div>
    </section>
  `;
  $("#send").addEventListener("click",()=>{
    const em=($("#em").value||"").trim();
    const msg=($("#msg").value||"").trim();
    if(!em || !msg){ toastMsg("Fill email + message"); return; }
    save("ss_contact_last",{em,msg,ts:Date.now()});
    $("#em").value=""; $("#msg").value="";
    toastMsg("Sent (demo)");
  });
}

function renderProduct(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p){ renderNotFound(); return; }

  let color=p.colors[0], size=p.sizes[0], qty=1;

  app.innerHTML = `
    <section class="wrap">
      <div class="section-head" style="margin-top:0">
        <a class="navlink" href="#/shop">← Back</a>
        <div class="muted">${p.category}</div>
      </div>

      <div class="grid" style="grid-template-columns:repeat(12,1fr)">
        <div class="card" style="grid-column:span 7">
          <a class="media" href="#/product/${encodeURIComponent(p.id)}">
            <img src="${p.img}" alt="${esc(p.name)}" />
            ${p.inStock ? "" : `<div class="sold">Sold out</div>`}
          </a>
        </div>

        <div class="card" style="grid-column:span 5">
          <div class="cardbody">
            <div class="pname">${esc(p.name)}</div>
            <div class="row" style="margin-top:8px">
              <div class="muted">${p.inStock?"In stock":"Sold out"}</div>
              <div class="price">${money(p.price)}</div>
            </div>
            <div class="sub">${p.ship}</div>

            <div class="fgroup" style="margin-top:14px">
              <div class="flabel">Color</div>
              <select id="color">${p.colors.map(c=>`<option>${esc(c)}</option>`).join("")}</select>
            </div>

            <div class="fgroup">
              <div class="flabel">Size</div>
              <select id="size">${p.sizes.map(s=>`<option>${esc(s)}</option>`).join("")}</select>
            </div>

            <div class="fgroup">
              <div class="flabel">Quantity</div>
              <div class="row">
                <div class="row" style="justify-content:flex-start;gap:8px">
                  <button class="btn" id="dec" type="button">−</button>
                  <div style="min-width:22px;text-align:center" id="qv">1</div>
                  <button class="btn" id="inc" type="button">+</button>
                </div>
                <button class="btn primary" id="add" type="button" ${p.inStock?"":"disabled"}>
                  ${p.inStock ? "Add to cart" : "Sold out"}
                </button>
              </div>
            </div>

            <div class="fgroup">
              <button class="btn wide" id="fav" type="button">${favorites[p.id]?"♥ Favorited":"♡ Favorite"}</button>
            </div>

            <div class="fine muted">Checkout hook ready — integrate your body-scan flow at checkout later.</div>
          </div>
        </div>
      </div>
    </section>
  `;

  $("#color").addEventListener("change",(e)=>{color=e.target.value;});
  $("#size").addEventListener("change",(e)=>{size=e.target.value;});
  $("#dec").addEventListener("click",()=>{qty=Math.max(1,qty-1); $("#qv").textContent=String(qty);});
  $("#inc").addEventListener("click",()=>{qty=Math.min(20,qty+1); $("#qv").textContent=String(qty);});

  $("#add").addEventListener("click",()=>{
    addToCart({id:p.id, color, size, qty});
    openCartDrawer();
  });

  $("#fav").addEventListener("click",()=>{
    toggleFav(p.id);
    $("#fav").textContent = favorites[p.id] ? "♥ Favorited" : "♡ Favorite";
  });
}

function renderNotFound(){
  app.innerHTML = `
    <section class="wrap">
      <div class="section-head" style="margin-top:0">
        <h2 class="h2">Not found</h2><div></div>
      </div>
      <div class="muted">That page doesn’t exist.</div>
      <div class="btnrow" style="margin-top:12px">
        <a class="btn primary" href="#/">Home</a>
        <a class="btn" href="#/shop">Shop</a>
      </div>
    </section>
  `;
}

// ---------- filtering + cards ----------
function filter(state){
  let items = PRODUCTS.slice();

  if(state.cat !== "All") items = items.filter(p=>p.category===state.cat);
  if(state.availability === "in") items = items.filter(p=>p.inStock);
  if(state.availability === "out") items = items.filter(p=>!p.inStock);

  if(state.q.trim()){
    const q = state.q.trim().toLowerCase();
    items = items.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t=>t.includes(q))
    );
  }

  items = items.filter(p => p.price <= state.priceMax);

  if(state.sizes.size){
    items = items.filter(p => p.sizes.some(s => state.sizes.has(s)));
  }

  if(state.sort==="featured") items.sort((a,b)=>Number(b.inStock)-Number(a.inStock));
  if(state.sort==="low") items.sort((a,b)=>a.price-b.price);
  if(state.sort==="high") items.sort((a,b)=>b.price-a.price);
  if(state.sort==="az") items.sort((a,b)=>a.name.localeCompare(b.name));

  return items;
}

function cardHTML(p){
  const favOn = !!favorites[p.id];
  return `
    <article class="card">
      <a class="media" href="#/product/${encodeURIComponent(p.id)}">
        <img src="${p.img}" alt="${esc(p.name)}" loading="lazy" />
        ${p.inStock ? "" : `<div class="sold">Sold out</div>`}
      </a>

      <div class="cardbody">
        <div class="pname">${esc(p.name)}</div>
        <div class="price">${money(p.price)}</div>
        <div class="sub">${p.ship}</div>

        <div class="cardbtns">
          <button class="btn ${favOn ? "heart on" : "heart"}" data-fav="${esc(p.id)}" type="button">${favOn ? "♥" : "♡"}</button>
          <a class="btn wide" href="#/product/${encodeURIComponent(p.id)}">View</a>
          <button class="btn primary wide" data-quick="${esc(p.id)}" type="button" ${p.inStock ? "" : "disabled"}>
            ${p.inStock ? "Quick add" : "Sold out"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function wireCardButtons(root){
  $$("[data-fav]", root).forEach(b=>{
    b.addEventListener("click",(e)=>{
      e.preventDefault(); e.stopPropagation();
      toggleFav(b.getAttribute("data-fav"));
      route();
    });
  });
  $$("[data-quick]", root).forEach(b=>{
    b.addEventListener("click",()=>{
      const id = b.getAttribute("data-quick");
      const p = PRODUCTS.find(x=>x.id===id);
      if(!p) return;
      addToCart({id:p.id, color:p.colors[0], size:p.sizes[0], qty:1});
      openCartDrawer();
    });
  });
}

// ---------- init ----------
renderBadges();
renderCart();
renderSearch("");
route();

cartBtn.addEventListener("click", openCartDrawer);
closeCart.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();closeCartDrawer();});

favBtn.addEventListener("click",()=>{ location.hash = "#/favorites"; });

mobileMenuBtn.addEventListener("click", openMobileNavDrawer);
closeMobileNav.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();closeMobileNavDrawer();});

openSearch.addEventListener("click", openSearchModalUI);
closeSearch.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();closeSearchModal();});
searchInputGlobal.addEventListener("input",()=>renderSearch(searchInputGlobal.value));

overlay.addEventListener("click", ()=>{
  if(!searchModal.classList.contains("hidden")) { closeSearchModal(); return; }
  if(!mobileNav.classList.contains("hidden")) { closeMobileNavDrawer(); return; }
  if(!cartDrawer.classList.contains("hidden")) { closeCartDrawer(); return; }
  setOverlay(false);
});
document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") closeAll(); });

checkoutBtn.addEventListener("click",()=>{
  if(cart.length===0){ toastMsg("Cart is empty"); return; }
  toastMsg("Checkout hook ready (integrate your API here)");
});
