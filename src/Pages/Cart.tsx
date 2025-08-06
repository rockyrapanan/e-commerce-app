
import { useCart } from '../context/CartContext';
import { placeOrder } from '../Types/orderData';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { user } = useAuth(); //Get user from AuthContext

  let total = 0;
  for (const item of cartItems) {
    total += item.price * (item.quantity ?? 0);
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderItems = cartItems.map(item => ({
      productId: String(item.id),
      quantity: item.quantity ?? 0,
      price: item.price
    }));

    console.log("Placing order with items:", orderItems, "and total:", total);
    console.log("User ID:", user?.uid ?? "guest-user");

    try {
      const docID = await placeOrder(user?.uid ?? "guest-user", orderItems, total); // ✅ Fixed
      console.log("Order placed successfully with ID:", docID);
      if (docID) {
        alert("Order placed successfully! Your order ID is: " + docID);
        clearCart();
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order. Please try again.");
    }
  };

  return (
    <div>
      <h1>Current Shopping Cart</h1>
      <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.title}</h3>
          <img src={item.image} alt={item.title} className="cart-item-image" />
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
        </div>
      ))}
      <div className="total">
        Total: ${total.toFixed(2)}
      </div>
      <button onClick={handleCheckout} className="checkout-button">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;

