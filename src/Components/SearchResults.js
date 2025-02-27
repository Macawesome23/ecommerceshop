import React, { useState, useEffect } from "react";
import { useCart } from "../Components/CartContext";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const { addToCart } = useCart();
  const location = useLocation();

  
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on searchQuery
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  return (
    <div className="container mt-5" style={{ paddingTop: "80px" }}>
      <h2 className="text-center mb-4">Search Results for "{searchQuery.length === 1 ? 'All products' : searchQuery}"</h2>
      <div className="row">
        {filteredProducts.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card" style={{ width: "100%", height: "450px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <img className="card-img-top" src={product.image} alt={product.title} style={{ width: "100%", height: "200px", objectFit: "contain" }} />
                <div className="card-body text-center">
                  <h5 className="card-title" style={{ fontSize: "1.2rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {product.title}
                  </h5>
                  <p className="card-text" style={{ fontSize: "0.9rem", height: "40px", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {product.description}
                  </p>
                  <p className="card-text"><strong>${product.price.toFixed(2)}</strong></p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-success flex-grow-1" onClick={() => addToCart(product)}>Add to Cart 🛒</button>
                    <button className="btn btn-primary flex-grow-1">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
