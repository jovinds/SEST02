import { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);

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

  return (
    <div>
      <h1>Products Page</h1>
      <p>Welcome to the products page!</p>
      {products && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name}: ${product.price}
              {/* Update Button */}
              <button onClick={() => handleUpdateProduct(product.id)}>
                Update
              </button>
              {/* Delete Button */}
              <button onClick={() => handleDeleteProduct(product.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* condition ? true : false */}
      <h2>{selectedProductId ? "Update Product" : "Add New Product"}</h2>
      <form>
        <div>
          <label htmlFor="product-name">Name:</label>
          <input
            type="text"
            id="product-name"
            value={newProductName}
            onChange={(event) => {
              setNewProductName(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            min={1}
            id="product-price"
            value={newProductPrice}
            onChange={(event) => {
              setNewProductPrice(Number(event.target.value));
            }}
          />
        </div>
        {/* condition ? true : false */}
        {selectedProductId ? (
          <>
            <button type="button" onClick={null}>
              Save Changes
            </button>
            <button type="button" onClick={null}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={addNewProduct}>
            Add Product
          </button>
        )}
      </form>
    </div>
  );
}

export default Products;
