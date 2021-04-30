// Require Express module
const express = require("express");
// Create new router module
const routes = express.Router();
routes.use(express.json());
// To create a random id
const { v4: uuidv4 } = require("uuid");

const { response } = require("express");

const cartItems = [
  { id: uuidv4(), product: "bread", price: 2, quantity: 1 },
  { id: uuidv4(), product: "milk", price: 1.5, quantity: 1 },
  { id: uuidv4(), product: "cheese", price: 4, quantity: 2 },
  { id: uuidv4(), product: "eggs", price: 1, quantity: 1 },
];

// Define routes

// ROUTE 1 - GET request to retrieve all cart items
routes.get("/cart-items", (req, res) => {
  const maxPrice = req.query.maxPrice;
  const prefix = req.query.prefix;
  const pageSize = req.query.pageSize;

  if (maxPrice) {
    res.json(cartItems.filter((cartItem) => cartItem.price <= maxPrice));
  } else if (prefix) {
    res.json(cartItems.filter((cartItem) => cartItem.product.toLowerCase().includes(prefix.toLowerCase().trim())));
  } else if (pageSize) {
    res.json(cartItems.slice(0, pageSize));
  } else {
    res.json(cartItems);
  }
  res.status(200);
});

// ROUTE 2 - GET request to retrieve the item with a particular id
//NEED TO FIX
routes.get("/cart-items/:id", (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);
  const getItem = cartItems.find((cartItem) => cartItem.id === itemId);

  if (!getItem) {
    response.status(404).send("ID not found.");
  } else {
    res.json(getItem);
    res.status(200);
  }
});

// ROUTE 3 - POST request to add a new cart item
routes.post("/cart-items", (req, res) => {
  const newCartItem = {
    id: uuidv4(),
    product: req.body.product,
    price: req.body.price,
    quantity: req.body.quantity,
  };
  cartItems.push(newCartItem);
  res.status(201);
  res.json(newCartItem);
});

// Export router module with routes
module.exports = routes;
