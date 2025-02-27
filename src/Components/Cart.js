import React from "react";
import { useCart } from "../Components/CartContext"; // Import useCart

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="container mt-5">
      <h1>Your Shopping Cart 🛍️</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <img src={item.image} alt={item.title} style={{ height: "50px", marginRight: "10px" }} />
                <span>{item.title} (x{item.quantity}) - ${item.price.toFixed(2)}</span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove ❌
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-warning mt-3" onClick={clearCart}>
            Clear Cart 🗑️
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
