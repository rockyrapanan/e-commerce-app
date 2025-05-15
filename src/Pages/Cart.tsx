import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addItemToCart = () => {
    const existingItem = cartItems.find(item => item.id === 1);

    if (existingItem) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { id: 1, name: 'Sample Item', price: 10, quantity: 1 },
      ]);
    }
  };

  const removeItemFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="form">
      <h1>Shopping Cart</h1>
      <button className="button" onClick={addItemToCart}>
        Add Item
      </button>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
                <button
                  className="button remove-button"
                  onClick={() => removeItemFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h2>Total: ${totalAmount.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;