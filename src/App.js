import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import SearchResults from "./Components/SearchResults";
import NotFound from "./NotFound";
import Profile from "./Components/Profile";
import Cart from "./Components/Cart";
import { CartProvider } from "./Components/CartContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
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
        <MainContent
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </Router>
    </CartProvider>
  );
}

function MainContent({ isLoggedIn, darkMode, setDarkMode, handleLogin, handleLogout }) {


  return (
    <div className={`App ${darkMode ? "dark-theme" : ""}`}>
      {useLocation().pathname.toLowerCase() !=="/login" && (
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> 
      )}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
