import { useEffect} from 'react';
import { Product, Category } from '../Types/Type';
import ProductCard from '../Components/ProductCard'; // Import the ProductCard component
import { useProductContext } from '../context/ProductContext'; // Import the ProductContext
import { fetchProducts, fetchCategories } from '../api/Api';
import { useQuery } from '@tanstack/react-query';

import './Home.css'; // Import the CSS file for styling



const Home: React.FC = () => {
   // const [products, setProducts] = useState<Product[]>([]);
    const { products, dispatch, selectedCategory } = useProductContext(); // Use the context to get the products
    const { data: productsData } = useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
    });
    // Fetch categories using the custom API function
    const { data: categories } = useQuery({
      queryKey: ['categories'],
      queryFn: fetchCategories,
    });
    // Effect to set products in the context when data is fetched
    // This effect runs when productsData changes and updates the context state
    useEffect(()=>{
      if(productsData){
        dispatch({ type: 'SET_PRODUCTS', payload: productsData.data });
      }
    },[productsData, dispatch]); // Effect to set categories in the context when data is fetched
    // This effect runs when categories changes and updates the context state
    const getFilteredProducts = () => {
      // Function to filter products based on the selected category
      if (selectedCategory) {
        return products?. filter(
          (product: Product) => product.category === selectedCategory
        );
      }
      return products; // If no category is selected, return all products
    };

    const filteredProducts = getFilteredProducts(); // Get the filtered products based on the selected category
 
  

  return (
    <div>
      {/* Category filter */}
      <label htmlFor="category-select">Choose a category:</label>
      <select id="category-select" onChange={e => dispatch({type: "SET_SELECTED_CATEGORY", payload: e.target.value})}
        value={selectedCategory}>
      {/* Dropdown to select a category */}
        <option value="">All Categories</option>
        {
          categories?.data.map((category: Category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))
        }
      </select>
      <button onClick={()=>dispatch({type:  'SET_SELECTED_CATEGORY', payload: ''})}>Clear Filter</button>
       <div className="container">
         <h1 className="product-heading">Product List</h1>
          <div className="product-list">
            {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          </div>
       </div>
    </div>
  )
}   
export default Home