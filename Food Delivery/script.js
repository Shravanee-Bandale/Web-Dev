const menu = [
  { id: 1, name: "Pizza", price: 200 },
  { id: 2, name: "Burger", price: 120 },
  { id: 3, name: "Pasta", price: 180 },
  { id: 4, name: "Sandwich", price: 100 },
  { id: 5, name: "Cold Coffee", price: 90 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load Menu
function loadMenu() {
  const menuDiv = document.getElementById("menu-items");
  menuDiv.innerHTML = "";

  menu.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="addToCart(${item.id})">Add</button>
    `;
    menuDiv.appendChild(div);
  });
}

// Add to Cart
function addToCart(id) {
  const item = menu.find(m => m.id === id);
  cart.push(item);
  saveCart();
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

// Save Cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Load Cart
function loadCart() {
  const cartList = document.getElementById("cart-list");
  const totalSpan = document.getElementById("total");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="removeFromCart(${index})">X</button>
    `;
    cartList.appendChild(li);
  });

  totalSpan.innerText = total;
}

// Place Order
function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  const newOrder = {
    items: cart,
    date: new Date().toLocaleString()
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  cart = [];
  saveCart();

  alert("Order Placed Successfully!");
  loadOrders();
}

// Load Orders
function loadOrders() {
  const ordersList = document.getElementById("orders");
  ordersList.innerHTML = "";

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.forEach(order => {
    const li = document.createElement("li");
    li.innerText = `${order.date} - ${order.items.length} items`;
    ordersList.appendChild(li);
  });
}

// Init
window.onload = () => {
  loadMenu();
  loadCart();
  loadOrders();
};