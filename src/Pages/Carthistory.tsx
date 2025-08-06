import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserOrders } from '../Types/orderData';

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  createdAt?: { toDate: () => Date };
  totalPrice: number;
  items: OrderItem[];
}

const Carthistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      const uid = user?.uid ?? 'guest-user'; // ✅ Fallback to guest-user
      console.log("Fetching history for UID:", uid);

      try {
        const orderData = await fetchUserOrders(uid);
        console.log("Fetched Orders:", orderData);

        const formattedOrders: Order[] = (orderData as Order[]).map((order) => ({
          id: order.id,
          createdAt: order.createdAt,
          totalPrice: order.totalPrice ?? 0,
          items: order.items ?? []
        }));
        setOrders(formattedOrders);
      } catch (err) {
        console.error('Error fetching order history:', err);
        setError('Failed to load order history.');
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {error && <p className="error">{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>
                Date:{' '}
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleString()
                  : 'Pending...'}
              </p>
              <p>Total: ${order.totalPrice.toFixed(2)}</p>
              <ul>
                {order.items.map((item: OrderItem, index) => (
                  <li key={index}>
                    Product ID: {item.productId} — Quantity: {item.quantity} — Price: $
                    {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Carthistory