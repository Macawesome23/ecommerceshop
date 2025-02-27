import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import SearchResults from "./Components/SearchResults";
import NotFound from "./NotFound";
import Profile from "./Components/Profile";
import Cart from "./Components/Cart";
import { CartProvider } from "./Components/CartContext"; // Import CartProvider

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    // Apply or remove dark mode class
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }

    // Store the preference in localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <CartProvider>
      <Router>
        <div className={`App ${darkMode ? "dark-theme" : ""}`}>
          {" "}
          {/* Ensure theme class is added */}
          <Navbar
           
            darkMode={darkMode}
            setDarkMode={setDarkMode}

            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
          <Routes>
            
            <Route
              path="/"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/cart"
              element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
            />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}
