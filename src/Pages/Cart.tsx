

import { useCart } from '../context/CartContext';

import './Cart.css'; // Import the CSS file for styling



const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  let total = 0;
  for (const item of cartItems) {
    total += item.price * item.quantity;
  }
  


  return (
    <div>
      <h1>Current Shopping Cart</h1>
      <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.title}</h3>
          <img src={item.image} alt={item.title} className="cart-item-image"/>
          <p>Price: ${item.price}</p>
          <p>Quatity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
        </div>
      ))}
      <div className="total">
        Total: ${total.toFixed(2)}
      </div>
      <button  className="checkout-button">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
