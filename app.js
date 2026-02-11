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
const closeModal = document.getEl
