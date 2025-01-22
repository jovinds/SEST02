import { useState, useEffect } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function Products() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showAlert, setShowAlert] = useState(null);

  useEffect(() => {
    // This side effect will only run the first time you mount this component.
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (response.ok) {
          const deserializedData = await response.json();
          setProducts(deserializedData);
          setLoading(false);
        } else {
          console.log("API request failed:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleShowAlert = (message, variant = "success") => {
    setShowAlert({ message, variant });
    setTimeout(() => {
      setShowAlert(null);
    }, 3000);
  };

  const addNewProduct = async () => {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newProductName, price: newProductPrice }),
      });
      if (response.ok) {
        // Update the data state variable
        const responseData = await response.json();
        console.log(responseData.message);
        setProducts([...products, responseData.product]);
        setNewProductName("");
        setNewProductPrice(0);
      } else {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };

  const handleDeleteProduct = async (productID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productID}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Deleted the product object.
        // [{...}, {...}, {...}, {...}, {...}]
        // [{...}, {...}, {...}, {...}]
        // .filter(): create a new array with elements that passed the test condition.
        const updatedProducts = products.filter(
          (productObject) => productObject.id !== productID
        );
        setProducts(updatedProducts);
      } else {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateProduct = async (productID) => {
    setSelectedProductId(productID);
    // .find(): return the first element that pass the test condition
    const productToUpdate = products.find(
      (productObject) => productObject.id === productID
    );
    setNewProductName(productToUpdate.name);
    setNewProductPrice(productToUpdate.price);
  };

  // selectedProductId = 1
  // productToUpdate = { id: 1, name: "Laptop", price: 1000 }
  // newProductName = Laptop
  // newProductPrice = 1000
  /*
  {
    name: "Laptop",
    price: 1000,
  }
  */
  const updateProduct = async () => {
    if (!selectedProductId) return;
    console.log(products);
    try {
      const response = await fetch(
        `http://localhost:3000/products/${selectedProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newProductName,
            price: newProductPrice,
          }),
        }
      );
      if (response.ok) {
        const responseObject = await response.json();
        const updatedProduct = responseObject.product;
        const updatedProducts = products.map((productObject) => {
          if (productObject.id === selectedProductId) {
            return updatedProduct;
          } else {
            return productObject;
          }
        });
        setProducts(updatedProducts);
        setSelectedProductId(null);
        setNewProductName("");
        setNewProductPrice(0);
        handleShowAlert(responseObject.message);
      } else {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelUpdate = () => {
    setSelectedProductId(null);
    setNewProductName("");
    setNewProductPrice(0);
  };
  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/cart", {
        method: POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: productId }),
      });
      if (response.ok) {
        const deserializedData = await response.json();
        handleShowAlert(deserializedData.message);
      } else {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
    } catch (error) {
      console.log("Error adding product to cart:", error);
    }
  };

  return (
    <div>
      {showAlert && (
        <Alert variant={showAlert.variant}>{showAlert.message}</Alert>
      )}
      <h1>Products Page</h1>
      <p>Welcome to the products page!</p>
      {products && (
        <div>
          {products.map((product) => (
            <Card key={product.id}>
              <Card.Body>
                <Card.Title>Product Name: {product.name}</Card.Title>
                <Card.Text>Product Price: {product.price}</Card.Text>
                <Button
                  variant="warning"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleUpdateProduct(product.id)}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* condition ? true : false */}
      <h2>{selectedProductId ? "Update Product" : "Add New Product"}</h2>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Name"
            value={newProductName}
            onChange={(event) => setNewProductName(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            value={newProductPrice}
            onChange={(event) => {
              setNewProductPrice(Number(event.target.value));
            }}
            min="1"
          />
        </Form.Group>

        {/* condition ? true : false */}
        {selectedProductId ? (
          <>
            <Button variant="primary" onClick={updateProduct}>
              Save Changes
            </Button>
            <Button variant="warning" onClick={handleCancelUpdate}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="success" onClick={addNewProduct}>
            Add Product
          </Button>
        )}
      </Form>
    </div>
  );
}

export default Products;
