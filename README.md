<!DOCTYPE html>
<html>
<head>
  <title>Danvexis Admin Panel</title>
  <style>
    body { font-family: Arial; background:#111; color:#fff; padding:20px; }
    input, button { padding:10px; margin:5px; width:200px; }
    .card { background:#222; padding:15px; margin:10px 0; }
    img { width:80px; }
  </style>
</head>
<body>

<h1>🔥 Danvexis Admin Dashboard</h1>

<!-- LOGIN -->
<div id="loginBox">
  <h3>Admin Login</h3>
  <input id="email" placeholder="Email">
  <input id="password" type="password" placeholder="Password">
  <button onclick="login()">Login</button>
</div>

<!-- DASHBOARD -->
<div id="dashboard" style="display:none;">
  <h2>Add Product</h2>

  <input id="name" placeholder="Product Name">
  <input id="price" placeholder="Price">
  <input id="stock" placeholder="Stock">
  <input id="image" placeholder="Image URL">

  <button onclick="addProduct()">Add Product</button>

  <h2>Products</h2>
  <div id="productList"></div>
</div>

<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/* 🔐 LOGIN */
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadProducts();
  } catch (e) {
    alert("Login failed");
  }
};

/* ➕ ADD PRODUCT */
window.addProduct = async () => {
  await addDoc(collection(db, "products"), {
    name: name.value,
    price: price.value,
    stock: stock.value,
    image: image.value
  });

  alert("Product added!");
  loadProducts();
};

/* 📦 LOAD PRODUCTS */
async function loadProducts() {
  const snap = await getDocs(collection(db, "products"));
  const list = document.getElementById("productList");
  list.innerHTML = "";

  snap.forEach((d) => {
    const p = d.data();

    list.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <p>Stock: ${p.stock}</p>
        <button onclick="remove('${d.id}')">Delete</button>
      </div>
    `;
  });
}

/* ❌ DELETE PRODUCT */
window.remove = async (id) => {
  await deleteDoc(doc(db, "products", id));
  loadProducts();
};

</script>

</body>
</html>
