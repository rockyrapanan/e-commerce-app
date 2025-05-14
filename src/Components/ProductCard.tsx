import { Product } from "../Types/Type";
import "./ProductCard.css"; // Import the CSS file for styling



const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <img src={product.image} alt={product.title} className="product-image"/>
       <p>{product.description}</p>
       <p>${product.price}</p>
       <button className="add-to-cart-button">Add to Cart</button>
    </div>
  )
}

export default ProductCard
