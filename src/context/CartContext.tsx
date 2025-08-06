import { createContext, useContext, useReducer } from "react"; // Import necessary hooks and types from React
import { Product } from "../Types/Type"; // Import the Product type from the Types module

interface CartState {
    items: Product[];

}

const initialState: CartState = {
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
};

type Action =
  | { type: 'ADD_TO_CART'; payload: Product} // Action to add a product to the cart
  | {type: 'REMOVE_FROM_CART'; payload: number } // Action to remove a product from the cart
  | {type: 'CLEAR_CART'}; // Action to clear the cart
// Reducer function to manage the cart state.
// It listens for actions and changes the state based on action type.
// The actions are ADD_TO_CART, REMOVE_FROM_CART, and CLEAR_CART.
const cartReducer = (state: CartState, action: Action): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART':
            { const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            let updatedAddItems;

            if (existingItemIndex >= 0) {
                // If item already exists, increase the quantity.
                const updatedItem = {
                    ...state.items[existingItemIndex],
                    quantity: (state.items[existingItemIndex]?.quantity || 0) + 1,
                };
                updatedAddItems = [...state.items];
                updatedAddItems[existingItemIndex] = updatedItem;

            } else {
                updatedAddItems = [...state.items, {...action.payload, quantity: 1}]
            }

            sessionStorage.setItem('cart', JSON.stringify(updatedAddItems));
            return { items: updatedAddItems }; }
        case 'REMOVE_FROM_CART': 
            { const updateRemoveItems = state.items.filter(
                (item: Product) => item.id !== action.payload
            );
            sessionStorage.setItem('cart', JSON.stringify(updateRemoveItems));
            return { items: updateRemoveItems }; }
        case 'CLEAR_CART':
            sessionStorage.setItem('cart', JSON.stringify([]));
            return { items: [] };
        default:
            return state;

    }
};
// Define the context type
type CartContextType = {
    cartItems: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
// Create a provider component to wrap the application and provide the context value
export const CartProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)
    const addToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };
    const removeFromCart = (productId: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId});
    };
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };
    return (
        <CartContext.Provider value={{cartItems: state.items, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
    
};
// Custom hook to use the CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (context == undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
