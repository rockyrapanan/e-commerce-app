

import { useCart } from '../context/CartContext';

import './Cart.css'; // Import the CSS file for styling


// Cart component
const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  // Calculate total price
  let total = 0;
  for (const item of cartItems) {
    total += item.price * (item.quantity ?? 0); // Use optional chaining to handle cases where quantity might be undefined
  }
  


  return (
    // Render the cart items
    <div>
      <h1>Current Shopping Cart</h1> {/* Display the cart items */}
      <button onClick={clearCart} className="clear-cart-button">Clear Cart</button> {/* Button to clear the cart */}
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.title}</h3> {/* Display the title of the item */}
          <img src={item.image} alt={item.title} className="cart-item-image"/>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button> {/* Button to remove the item from the cart */}
        </div>
      ))}
      {/* Display the total price of the cart */}
      <div className="total">
        Total: ${total.toFixed(2)} {/* Format the total price to two decimal places */}
      </div>
      <button  className="checkout-button"> {/* Button to proceed to checkout */ }
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
