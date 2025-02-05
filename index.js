const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Endpoint 1: Add an Item to the Cart

function addItem(cart, productId, name, price, quantity) {
  let newItem = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(newItem);
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addItem(cart, productId, name, price, quantity);
  res.json({ cartItems: result });
});

// Endpoint 2: Edit Quantity of an Item in the Cart

function editQuantity(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editQuantity(cart, productId, quantity);
  cart = result;
  res.json({ cartItems: cart });
});

//Endpoint 3: Delete an Item from the Cart

function deleteItem(cart, productId) {
  return cart.productId != productId;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((cartItem) => deleteItem(cartItem, productId));
  cart = result;
  res.json({ cartItems: cart });
});

//Endpoint 4: Read Items in the Cart

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

//Endpoint 5: Calculate Total Quantity of Items in the Cart

function calculateTotalQuantity(cart) {
  let quantity = 0;
  for (let i = 0; i < cart.length; i++) {
    quantity = quantity + cart[i].quantity;
  }
  return quantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = calculateTotalQuantity(cart);
  res.json({ totalQuantity: result });
});

// Endpoint 6: Calculate Total Price of Items in the Cart

function calculateTotalPrice(cart) {
  let price = 0;
  for (let i = 0; i < cart.length; i++) {
    price = price + cart[i].price;
  }
  return price;
}

app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
