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

const App = () => {
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
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </Router>
    </CartProvider>
  );
}

const MainContent = ({ isLoggedIn, darkMode, setDarkMode, handleLogin, handleLogout }) => {
 
  // Define a reusable wrapper for protected routes
  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  const location = useLocation();
  
  // Define which paths should show the navbar
  const showNavbarPaths = ['/', '/profile', '/cart', '/search'];
  const shouldShowNavbar = showNavbarPaths.includes(location.pathname);

  return (
    <div className={`App ${darkMode ? "dark-theme" : ""}`}>
      {shouldShowNavbar && (
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
      )}
      <Routes>
        <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>}
          />
        <Route path="/login" element={
          <Login handleLogin={handleLogin}/>} 
        />
        <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route path="/search" element={
          <PrivateRoute>
            <SearchResults />
          </PrivateRoute>

          } />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  );
};

export default App;