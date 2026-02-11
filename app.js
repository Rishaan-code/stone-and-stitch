// Twofouro-inspired (not cloned) storefront: filters, favorites, sizes, search, cart.
// Images are free Unsplash links; swap later.

const IMG = {
  denimA: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1600&q=80",
  denimB: "https://images.unsplash.com/photo-1534026609802-f7239f184d91?auto=format&fit=crop&w=1600&q=80",
  hoodieA:"https://images.unsplash.com/photo-1520975958225-2b89d83cfe19?auto=format&fit=crop&w=1600&q=80",
  hoodieB:"https://images.unsplash.com/photo-1520975916798-6b7c1b0b6a3d?auto=format&fit=crop&w=1600&q=80",
  teeA:  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80",
  pantsA:"https://images.unsplash.com/photo-1522897355400-c4fdec73d979?auto=format&fit=crop&w=1600&q=80",
  shortsA:"https://images.unsplash.com/photo-1559234626-0ebf4754d937?auto=format&fit=crop&w=1600&q=80",
};

const PRODUCTS = [
  {id:"nt-denim-1", name:"WAXED STACK DENIM", category:"Jeans", price:124, inStock:true,  colors:["Black Wax","Indigo"], sizes:["28","30","32","34","36"], ship:"Ships 1–2 days", img:IMG.denimB, tags:["denim","stack","waxed"]},
  {id:"nt-denim-2", name:"STRAIGHT DENIM",   category:"Jeans", price:94,  inStock:true,  colors:["Vintage Blue","Washed Black"], sizes:["28","30","32","34","36"], ship:"Ships 1–2 days", img:IMG.denimA, tags:["denim","straight"]},
  {id:"nt-hood-1",  name:"ZIP HOODIE",       category:"Hoodies", price:84, inStock:true, colors:["Black","Washed Black"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.hoodieA, tags:["hoodie","zip"]},
  {id:"nt-hood-2",  name:"PULLOVER HOODIE",  category:"Hoodies", price:76, inStock:false,colors:["Graphite","Sand"], sizes:["S","M","L","XL"], ship:"Restock soon", img:IMG.hoodieB, tags:["hoodie"]},
  {id:"nt-tee-1",   name:"HEAVY TEE",        category:"Shirts", price:34, inStock:true,  colors:["White","Off-White"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.teeA, tags:["tee","heavy"]},
  {id:"nt-pant-1",  name:"TECH CARGO",       category:"Pants", price:98, inStock:true, colors:["Black","Olive"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.pantsA, tags:["cargo","tech"]},
  {id:"nt-short-1", name:"NYLON SHORT",      category:"Shorts", price:48, inStock:true, colors:["Black","Stone"], sizes:["S","M","L","XL"], ship:"Ships 1–2 days", img:IMG.shortsA, tags:["shorts","nylon"]},
];

const $ = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
const app = $("#app");
const overlay = $("#overlay");

let cart = load("nt_cart", []);       // [{id,color,size,qty}]
let favorites = load("nt_favs", {});  // {id:true}

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

function save(k,v){localStorage.setItem(k, JSON.stringify(v));}
function load(k,f){try{const r=localStorage.getItem(k);return r?JSON.parse(r):f}catch{return f}}
function money(n){return Number(n).toLocaleString(undefined,{style:"currency",currency:"USD"})}
function toastMsg(m){
  toast.textContent=m; toast.classList.remove("hidden");
  clearTimeout(toastMsg._t);
  toastMsg._t=setTimeout(()=>toast.classList.add("hidden"),1400);
}
function setOverlay(on){
  overlay.classList.toggle("hidden", !on);
  overlay.setAttribute("aria-hidden", String(!on));
}
function anyLayerOpen(){
  return !cartDrawer.classList.contains("hidden") || !mobileNav.classList.contains("hidden") || !searchModal.classList.contains("hidden");
}
function closeAll(){
  closeCartDrawer(); closeMobileNavDrawer(); closeSearchModal();
  setOverlay(false);
}

function openCartDrawer(){cartDrawer.classList.remove("hidden"); cartDrawer.setAttribute("aria-hidden","false"); setOverlay(true);}
function closeCartDrawer(){cartDrawer.classList.add("hidden"); cartDrawer.setAttribute("aria-hidden","true"); if(!anyLayerOpen()) setOverlay(false);}

function openMobileNavDrawer(){mobileNav.classList.remove("hidden"); mobileNav.setAttribute("aria-hidden","false"); setOverlay(true);}
function closeMobileNavDrawer(){mobileNav.classList.add("hidden"); mobileNav.setAttribute("aria-hidden","true"); if(!anyLayerOpen()) setOverlay(false);}

function openSearchModalUI(){
  searchModal.classList.remove("hidden");
  searchModal.setAttribute("aria-hidden","false");
  setOverlay(true);
  searchInputGlobal.value="";
  renderSearch("");
  setTimeout(()=>searchInputGlobal.focus(), 10);
}
function closeSearchModal(){searchModal.classList.add("hidden"); searchModal.setAttribute("aria-hidden","true"); if(!anyLayerOpen()) setOverlay(false);}

/* Favorites */
function toggleFav(id){
  if(favorites[id]) delete favorites[id];
  else favorites[id]=true;
  save("nt_favs", favorites);
  renderBadges();
  toastMsg(favorites[id] ? "Added to favorites" : "Removed from favorites");
}

/* Cart */
function cartKey(l){return `${l.id}::${l.color}::${l.size}`;}
function addToCart({id,color,size,qty}){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  if(!p.inStock){ toastMsg("Sold out"); return; }

  const line={id,color,size,qty:Math.max(1, Number(qty||1))};
  const key=cartKey(line);
  const idx=cart.findIndex(x=>cartKey(x)===key);
  if(idx>=0) cart[idx].qty += line.qty;
  else cart.push(line);

  save("nt_cart", cart);
  renderBadges(); renderCart();
  toastMsg("Added to cart");
}
function subtotal(){return cart.reduce((s,l)=>{const p=PRODUCTS.find(x=>x.id===l.id);return p?s+p.price*l.qty:s},0)}
function ship(sub){ if(sub===0) return 0; return sub>=100?0:8; }
function removeLine(key){cart=cart.filter(x=>cartKey(x)!==key); save("nt_cart",cart); renderBadges(); renderCart();}
function changeQty(key, d){
  cart = cart.map(x => cartKey(x)!==key ? x : ({...x, qty:Math.max(1, x.qty+d)}));
  save("nt_cart",cart); renderBadges(); renderCart();
}

function renderBadges(){
  cartCount.textContent = String(cart.reduce((a,x)=>a+x.qty,0));
  favCount.textContent = String(Object.keys(favorites).length);
}
function renderCart(){
  const sub=subtotal(); const s=ship(sub); const t=sub+s;
  cartSubtotal.textContent=money(sub);
  shipEstimate.textContent=money(s);
  cartTotal.textContent=money(t);

  if(cart.length===0){ cartItems.innerHTML=`<div class="muted">Your cart is empty.</div>`; return; }

  cartItems.innerHTML = cart.map(l=>{
    const p=PRODUCTS.find(x=>x.id===l.id);
    const key=cartKey(l);
    return `
      <div class="cartline">
        <div class="cartline-top">
          <div>
            <div class="cartline-name">${esc(p.name)}</div>
            <div class="cartline-meta">${esc(l.color)} • ${esc(l.size)} • ${money(p.price)}</div>
          </div>
          <button class="iconbtn" data-remove="${esc(key)}" type="button">✕</button>
        </div>
        <div class="row">
          <div class="qtyrow">
            <button class="qtybtn" data-dec="${esc(key)}" type="button">−</button>
            <div class="qtyval">${l.qty}</div>
            <button class="qtybtn" data-inc="${esc(key)}" type="button">+</button>
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

/* Search */
function renderSearch(q){
  const query=(q||"").trim().toLowerCase();
  const results = query
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.tags.some(t=>t.includes(query)))
    : PRODUCTS;

  searchResults.innerHTML = results.slice(0,10).map(p=>`
    <a class="drawer-link" href="#/product/${encodeURIComponent(p.id)}">${esc(p.name)} — ${money(p.price)} ${p.inStock?"":"(SOLD OUT)"}</a>
  `).join("");
}

/* Pages */
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

function renderHome(){
  const heroImg = IMG.denimB;
  app.innerHTML = `
    <section class="wrap">
      <div class="hero">
        <div class="hero-media" style="background-image:url('${heroImg}')"></div>
        <div class="hero-body">
          <div class="h1">Minimal streetwear.<br/>Real storefront UX.</div>
          <div class="hero-sub">
            Tight grid, dark scheme, favorites, cart drawer, search, and full filter system.
            Built for clean mobile demos.
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

  const g=$("#featGrid");
  g.innerHTML = PRODUCTS.slice(0,6).map(cardHTML).join("");
  wireCardButtons(g);
}

function renderShop(){
  const state={cat:"All", q:"", sort:"featured", priceMax:150, sizes:new Set(), availability:"all"};

  app.innerHTML=`
    <section class="wrap">
      <div class="section-head">
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
              <option>Shorts</option>
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

          <div class="fgroup">
            <button class="btn wide" id="clear" type="button">Clear</button>
          </div>
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
  priceEl.addEventListener("input",()=>{state.priceMax=Number(priceEl.value); priceLabel.textContent=money(state.priceMax).replace(".00",""); apply();});
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
  app.innerHTML=`
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
  app.innerHTML=`
    <section class="wrap">
      <div class="section-head" style="margin-top:0">
        <h2 class="h2">Contact</h2><div></div>
      </div>
      <div class="filters" style="position:relative;top:auto;max-width:620px">
        <div class="filter-title">Message</div>
        <div class="fgroup"><div class="flabel">Email</div><input class="input" id="em" type="email" placeholder="you@email.com"></div>
        <div class="fgroup"><div class="flabel">Message</div><input class="input" id="msg" placeholder="Write something…"></div>
        <div class="fgroup"><button class="btn primary wide" id="send" type="button">Send</button></div>
        <div class="fine muted">Demo form, wire to your backend later.</div>
      </div>
    </section>
  `;
  $("#send").addEventListener("click",()=>{
    const em=($("#em").value||"").trim();
    const msg=($("#msg").value||"").trim();
    if(!em||!msg){ toastMsg("Fill email + message"); return; }
    save("nt_contact_last",{em,msg,ts:Date.now()});
    $("#em").value=""; $("#msg").value="";
    toastMsg("Sent (demo)");
  });
}

function renderProduct(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p){ renderNotFound(); return; }

  let color=p.colors[0], size=p.sizes[0], qty=1;

  app.innerHTML=`
    <section class="wrap">
      <div class="section-head" style="margin-top:0">
        <a class="navlink" href="#/shop">← Back</a>
        <div class="muted">${p.category}</div>
      </div>

      <div class="grid" style="grid-template-columns:repeat(12,1fr)">
        <div class="card" style="grid-column:span 7">
          <div class="media"><img src="${p.img}" alt="${esc(p.name)}"></div>
        </div>

        <div class="card" style="grid-column:span 5">
          <div class="cardbody">
            <div class="pname">${esc(p.name)}</div>
            <div class="meta"><div class="muted">${p.inStock?"In stock":"Sold out"}</div><div class="price">${money(p.price)}</div></div>
            <div class="sub"><span>${p.ship}</span><span>${p.colors.length} color(s)</span></div>

            <div class="fgroup">
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
                <div class="qtyrow">
                  <button class="qtybtn" id="dec" type="button">−</button>
                  <div class="qtyval" id="qv">1</div>
                  <button class="qtybtn" id="inc" type="button">+</button>
                </div>
                <button class="btn primary" id="add" type="button" ${p.inStock?"":"disabled"}>${p.inStock?"Add to cart":"Sold out"}</button>
              </div>
            </div>

            <div class="fgroup">
              <button class="btn wide" id="fav" type="button">${favorites[p.id]?"♥ Favorited":"♡ Favorite"}</button>
            </div>

            <div class="fine muted">Integration hook: attach your body-scan step at checkout later.</div>
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
    addToCart({id:p.id,color,size,qty});
    openCartDrawer();
  });

  $("#fav").addEventListener("click",()=>{
    toggleFav(p.id);
    $("#fav").textContent = favorites[p.id] ? "♥ Favorited" : "♡ Favorite";
  });
}

function renderNotFound(){
  app.innerHTML=`
    <section class="wrap">
      <div class="section-head" style="margin-top:0"><h2 class="h2">Not found</h2><div></div></div>
      <div class="muted">That page doesn’t exist.</div>
      <div class="btnrow" style="margin-top:12px">
        <a class="btn primary" href="#/">Home</a>
        <a class="btn" href="#/shop">Shop</a>
      </div>
    </section>
  `;
}

/* Filtering + cards */
function filter(state){
  let items=PRODUCTS.slice();

  if(state.cat!=="All") items=items.filter(p=>p.category===state.cat);
  if(state.availability==="in") items=items.filter(p=>p.inStock);
  if(state.availability==="out") items=items.filter(p=>!p.inStock);

  if(state.q.trim()){
    const q=state.q.trim().toLowerCase();
    items=items.filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)||p.tags.some(t=>t.includes(q)));
  }

  items=items.filter(p=>p.price<=state.priceMax);

  if(state.sizes.size){
    items=items.filter(p=>p.sizes.some(s=>state.sizes.has(s)));
  }

  if(state.sort==="featured") items.sort((a,b)=>Number(b.inStock)-Number(a.inStock));
  if(state.sort==="low") items.sort((a,b)=>a.price-b.price);
  if(state.sort==="high") items.sort((a,b)=>b.price-a.price);
  if(state.sort==="az") items.sort((a,b)=>a.name.localeCompare(b.name));

  return items;
}

function cardHTML(p){
  const favOn=!!favorites[p.id];
  return `
    <article class="card">
      <a class="media" href="#/product/${encodeURIComponent(p.id)}">
        <img src="${p.img}" alt="${esc(p.name)}" loading="lazy" />
        ${p.inStock?"":`<div class="sold">SOLD OUT</div>`}
      </a>
      <div class="cardbody">
        <div class="pname">${esc(p.name)}</div>
        <div class="meta"><div class="muted">${p.category}</div><div class="price">${money(p.price)}</div></div>
        <div class="sub"><span>${p.ship}</span><span>${p.sizes.length} sizes</span></div>
        <div class="cardbtns">
          <button class="btn ${favOn?"heart on":"heart"}" data-fav="${esc(p.id)}" type="button">${favOn?"♥":"♡"}</button>
          <a class="btn wide" href="#/product/${encodeURIComponent(p.id)}">View</a>
          <button class="btn primary wide" data-quick="${esc(p.id)}" type="button" ${p.inStock?"":"disabled"}>${p.inStock?"Quick add":"Sold out"}</button>
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
      const id=b.getAttribute("data-quick");
      const p=PRODUCTS.find(x=>x.id===id);
      if(!p) return;
      addToCart({id:p.id,color:p.colors[0],size:p.sizes[0],qty:1});
      openCartDrawer();
    });
  });
}

/* Utils + init */
function esc(s){return String(s).replace(/[&<>"']/g,m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[m]))}

renderBadges();
renderCart();
route();
renderSearch("");

cartBtn.addEventListener("click", openCartDrawer);
closeCart.addEventListener("click",(e)=>{e.preventDefault();e.stopPropagation();closeCartDrawer();});
favBtn.addEventListener("click",()=>{location.hash="#/favorites";});
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
