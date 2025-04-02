import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#6f42c1",  // Matches navbar color
        color: "white",
        textAlign: "center",
        padding: "15px",
        position: "relative",
        width: "100%",
        bottom: "0",
      }}
    >
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Shopify. All rights reserved.</p>
        <div>
          <Link to="/about" className="text-white mx-3">
            About Us
          </Link>
          <Link to="/contact" className="text-white mx-3">
            Contact
          </Link>
          <Link to="/privacy" className="text-white mx-3">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
