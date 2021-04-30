// Require Express module
const express = require("express");
// Create new router module
const routes = express.Router();
routes.use(express.json());

const cartItems = [
  { id: 1, product: "bread", price: 2, quantity: 1 },
  { id: 2, product: "milk", price: 1.5, quantity: 1 },
  { id: 3, product: "cheese", price: 4, quantity: 2 },
  { id: 4, product: "eggs", price: 1, quantity: 1 },
];

// Define routes
routes.get("/cart-items", (req, res) => {
  let maxPrice = req.query.maxPrice;
  let prefix = req.query.prefix;
  let pageSize = req.query.pageSize;

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

// Export router module with routes
module.exports = routes;
