import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useCart } from "../Components/CartContext";
import Footer from "./Footer";

const images = [
  {
    src: "https://www.shutterstock.com/image-vector/3d-yellow-great-discount-sale-260nw-2056851839.jpg",
    legend: "Sale 1",
  },
  {
    src: "https://static.vecteezy.com/system/resources/previews/001/937/856/non_2x/paper-art-shopping-online-on-smartphone-sale-promotion-backgroud-banner-for-market-ecommerce-free-vector.jpg",
    legend: "Sale 2",
  },
  {
    src: "https://images.pexels.com/photos/30332024/pexels-photo-30332024/free-photo-of-serene-winter-landscape-with-snowy-cabin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    legend: "Sale 3",
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

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

  // Filter products based on searchQuery
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
     <div className="container">
      {/* Carousel Section */}
      <div
        className="carousel-container"
        style={{
          maxWidth: "90%",
          margin: "0 auto",
          height: "400px",
          marginBottom: "60px",
          marginTop: "64px",
        }}
      >
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={300}
          infiniteLoop
          showIndicators={false}
          showStatus={false}
        >
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Search Bar (on Home Page) */}
      <div className="container mb-4">
        <input
          className="form-control w-50 mx-auto"
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products Section */}
      <div className="container">
        <div className="row">
          {filteredProducts.length === 0 ? (
            <p className="text-center">No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div
                  className="card"
                  style={{
                    width: "100%",
                    height: "450px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    className="card-img-top"
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "1.2rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.title}
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        fontSize: "0.9rem",
                        height: "40px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.description}
                    </p>
                    <p className="card-text">
                      <strong>${product.price.toFixed(2)}</strong>
                    </p>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success flex-grow-1"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart 🛒
                      </button>
                      <button className="btn btn-primary flex-grow-1">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
   
  );
};

export default Home;
