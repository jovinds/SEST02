const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const products = require("./products");
const cartItems = require("./cart");

// Middleware
app.use(express.json());
// Cors
app.use(
  cors({
    origin: "http://localhost:5174",
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
    response.status(200).json(product);
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

// 1. Add a new product Object to the cartItems array.
// 2. Delete a product Object from the cartItems array.

// /cart - get all the cart items.
app.get("/cart", (request, response) => {
  response.status(200).json(cartItems);
});

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

/*
{
    productId: 1
}

cartItems = [
    {id: 1, name: "Laptop", price: 1000, quantity: 2}, 
    {id: 2, name: "Mobile Phone", price: 500, quantity: 1}
]
existingCartItem = {id: 1, name: "Laptop", price: 1000, quantity: 1}
existingCartItem = {id: 1, name: "Laptop", price: 1000, quantity: 2}

[
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mobile Phone", price: 500 },
  { id: 3, name: "Mechanical Keyboard", price: 300 },
];
*/

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

/*
{
    productId: 1
}

cartItems = [
   0 {id: 1, name: "Laptop", price: 1000, quantity: 2}, 
   1 {id: 2, name: "Mobile Phone", price: 500, quantity: 1}
]
   itemIndex = 0

[
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mobile Phone", price: 500 },
  { id: 3, name: "Mechanical Keyboard", price: 300 },
];
*/

app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`);
});

// Run the Express app
// 1. Open "/shopping-cart-api" in the terminal.
// 2. node "name of main file.(app.js)"
// 3. Restart the server everytime there is a change.

// Nodemon
// 1. Open "/shopping-cart-api" in the terminal.
// 2. nodemon "name of main file.(app.js)"
// 3. This will automatically refresh the server everytime there is a change.
