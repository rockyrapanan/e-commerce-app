import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export const placeOrder = async (
  userId: string,
  items: OrderItem[],
  totalPrice: number
) => {
  const order = {
    userId,
    items,
    totalPrice,
    createdAt: serverTimestamp(),
  };

  console.log("Trying to place order with data:", order);

  try {
    const docRef = await addDoc(collection(db, "orders"), order);
    console.log("Order placed. Firestore doc ID:", docRef.id);
    return docRef.id; // Return doc ID instead of "success"
  } catch (err) {
    console.error("Failed to place order:", err);
    return null;
  }
};

export const fetchUserOrders = async (userId: string) => {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId)
    // (optional) remove orderBy for now if causing issues
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};