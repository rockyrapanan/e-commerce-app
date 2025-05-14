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

    const { data: categories } = useQuery({
      queryKey: ['categories'],
      queryFn: fetchCategories,
    });

    useEffect(()=>{
      if(productsData){
        dispatch({ type: 'SET_PRODUCTS', payload: productsData.data });
      }
    },[productsData, dispatch]);

    const getFilteredProducts = () => {
      if (selectedCategory) {
        return products?. filter(
          (product: Product) => product.category === selectedCategory
        );
      }
      return products;
    };

    const filteredProducts = getFilteredProducts();
 
  

  return (
    <div>
      
      <label htmlFor="category-select">Choose a category:</label>
      <select id="category-select" onChange={e => dispatch({type: "SET_SELECTED_CATEGORY", payload: e.target.value})}
        value={selectedCategory}>
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
         <h1>Product List</h1>
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