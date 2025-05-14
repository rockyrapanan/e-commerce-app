import { createContext, useContext, ReactNode, useReducer } from "react";
import { Product } from "../Types/Type";
// Actions to manage the state
// 1. SET_PRODUCTS: To set the list of products in the state.   
// 2. SET_SELECTED_CATEGORY: To set the selected category in the state.
type ProductAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string };


// Defines the state of shape
interface ProductState {
    products: Product[];    
    selectedCategory: string;
}

// Initial state.
const initialState: ProductState = {
    products: [],   
    selectedCategory: '',    
};

// reducer function to manage the state
// Listens for actions and changes the state based on action type.
const productReducer = (
    state: ProductState, 
    action: ProductAction
): ProductState => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'SET_SELECTED_CATEGORY':
            return { ...state, selectedCategory: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
// Create a context 
interface ProductContextType extends ProductState{
    
    // Dispatch allows us to send actions to the reducer to update the state { SET_PRODUCTS and SET_SELECTED_CATEGORY }.
    dispatch: React.Dispatch<ProductAction>;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
    children: ReactNode;    
}
// Create a provider component to wrap the application and provide the context value
export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);
    return (
        <ProductContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook for accessing the context.
export const useProductContext = (): ProductContextType => {
    const context = useContext(ProductContext);
    if(!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
}
