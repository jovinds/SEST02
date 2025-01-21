const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const products = require("./products");
const cartItems = require("./cart");

// Middleware
app.use(express.json());

// Cors
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// app.get()
// app.post()
// app.put()
// app.delete()
// This will return products array and cartItems array
// console.log("Products:", products)
// console.log("Cart:", cartItems)

// .get(Route/URL, Callback(Route Handler))
app.get("/products", (request, response) => {
  // Status Code 200: Successful
  response.status(200).json(products);
});

// Run the Express app
// 1. Open "/shopping-cart-api" in the terminal.
// 2. node "name of main file.(app.js)"

// Route Parameter: placeholder
app.get("/products/:productID", (request, response) => {
  // Check: int.parse
  const productID = parseInt(request.params.productID);
  // create a test condition, the first element passed the test condition will be return
  const product = products.find(
    (productObject) => productObject.id === productID
  );
  if (product) {
    // If there is a match, return the product Object.
    response.json(product);
  } else {
    // Return an error and tell the user the product is not found.
    response.status(404).json({ message: "Product not found" });
  }
});

function generateUniqueId() {
  if (products.length === 0) {
    // No product object inside of the products array.
    return 1;
  }
  const lastProductObject = products[products.length - 1];
  return lastProductObject.id + 1;
}

// .post(Route/URL, Callback(Route Handler))
app.post("/products", (request, response) => {
  // This will return the same value as desctructuring objects.
  // const name = request.body.name
  // const price = request.body.price
  const { name, price } = request.body;
  if (!name || !price) {
    return response.status(400).json({ message: "Name and price is required" });
  }
  const newProduct = {
    id: generateUniqueId(),
    name,
    price,
  };
  products.push(newProduct);
  response.status(201).json({
    message: "Product added to the product list.",
    product: newProduct,
    successful: true,
  });
});

app.put("/products/:productId", (request, response) => {
  const productId = parseInt(request.params.productId);
  const { name, price } = request.body;
  if (!name || !price) {
    return response.status(400).json({ message: "Name and price is required" });
  }
  const product = products.find(
    (productObject) => productObject.id === productId
  );
  if (product) {
    product.name = name;
    product.price = price;
    response.status(200).json({
      message: "Product updated successfully.",
      product: product,
      successful: true,
    });
  } else {
    response.status(404).json({ message: "Product not found" });
  }
});

app.delete("/products/:productId", (request, response) => {
  const productId = parseInt(request.params.productId);

  const productIndex = products.findIndex(
    (productObject) => productObject.id === productId
  );
  if (productIndex !== -1) {
    // .splice(start, deleteCount?, element/s)
    products.splice(productIndex, 1);
    response.status(200).json({ message: "Product deleted successfully" });
  } else {
    response.status(404).json({ message: "Product not found" });
  }
});

// Check Cart ITems

app.get("/cartItems", (request, response) => {
  response.status(200).json(cartItems);
});

// Add Items to cart

// app.post("/cartItems/addToCart", (request, response) => {
//   const { productId, quantity } = request.body;

//   const product = products.find((product) => product.id === productId);
//   if (product) {
//     for (let i = 1; i <= quantity; i++) {
//       cartItems.push(product);
//     }
//     response.status(200).json({ message: "Product added to cart" });
//   } else {
//     response.status(404).json({ message: "Product not found" });
//   }
// });

// add product to the cart items array.
app.post("/cart", (request, response) => {
  const { productId } = request.body;
  const productObjectToAddToCart = products.find(
    (productObject) => productObject.id === productId
  );
  if (!productObjectToAddToCart) {
    // If there is no match
    response.status(404).json({ message: "Product not found." });
  }
  // Check if the product object already exists in the cartItems array.
  const existingCartItem = cartItems.find((item) => item.id === productId);

  if (existingCartItem) {
    // If existingCartItem have a value.
    // The product is already inside of the cartItems array.
    existingCartItem.quantity++;
  } else {
    // If existingCartItem don't have a value.
    // Add the productObject to the cartItem array.
    cartItems.push({ ...productObjectToAddToCart, quantity: 1 });
  }

  response.status(201).json({
    message: "Product added to cart successfully!",
    cart: cartItems,
  });
});

// Delete an Item From Cart

app.delete("/cart/:productId", (request, response) => {
  const productId = parseInt(request.params.productId);
  // Returns the index of the element or -1.
  const itemIndex = cartItems.findIndex((item) => item.id === productId);
  if (itemIndex !== -1) {
    // Delete the item in that index.
    // The product is not inside of the cartItems array.
    // .splice(start, deleteCount, element/s you want to add)
    cartItems.splice(itemIndex, 1);
    response.status(200).json({
      message: "Product removed from cart successfully.",
      cart: cartItems,
    });
  } else {
    response
      .status(404)
      .json({ message: "Product not found inside the cart." });
  }
});

// Run the Express app
// 1. Open "/shopping-cart-api" in the terminal.
// 2. node "name of main file.(app.js)"
// 3. Restart the server everytime there is a change.
// Nodemon
// 1. Open "/shopping-cart-api" in the terminal.
// 2. nodemon "name of main file.(app.js)"
// 3. This will automatically refresh the server everytime there is a change.

// 1. Add a new product Object to the cartItems array.
// 2. Delete a product Object from the cartItems array.
