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
  FaBars, // Hamburger Icon
} from "react-icons/fa";

const Navbar = ({ darkMode, setDarkMode, isLoggedIn, handleLogout }) => {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for mobile menu

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

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
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

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <FaBars size={20} />
        </button>

        {/* Navbar Items */}
        <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/" onClick={() => setIsNavbarOpen(false)}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart" onClick={() => setIsNavbarOpen(false)}>
                <FaShoppingCart size={20} /> ({cartCount})
              </Link>
            </li>
          </ul>

          {/* Dark Mode Button */}
          <button
            className="btn btn-outline-light mx-2 dark-mode-toggle"
            onClick={() => setDarkMode((prev) => !prev)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
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
            <Link to="/profile" className="btn btn-outline-light ms-3" onClick={() => setIsNavbarOpen(false)}>
              <FaUser />
            </Link>
          )}

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <button
              className="btn btn-outline-light ms-3"
              onClick={() => {
                handleLogout();
                setIsNavbarOpen(false);
              }}
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline-light ms-3" onClick={() => setIsNavbarOpen(false)}>
              <FaSignInAlt /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
