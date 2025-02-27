import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import {
  FaMoon,
  FaSun,
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa"; // Import icons

const Navbar = ({ darkMode, setDarkMode, isLoggedIn, handleLogout }) => {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{ backgroundColor: "#6f42c1" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Shopify
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FaShoppingCart size={20} /> ({cartCount})
              </Link>
            </li>
          </ul>

          {/* Dark Mode Button */}
          <button
            className="btn btn-outline-light mx-2 dark-mode-toggle"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label={
              darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
          </button>

          {/* Search Bar */}
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "180px" }}
            />
            <button className="btn btn-outline-light" type="submit">
              <FaSearch />
            </button>
          </form>

          {/* Profile Icon */}
          {isLoggedIn && (
            <Link to="/profile" className="btn btn-outline-light ms-3">
              <FaUser />
            </Link>
          )}

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <button
              className="btn btn-outline-light ms-3"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline-light ms-3">
              <FaSignInAlt /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
