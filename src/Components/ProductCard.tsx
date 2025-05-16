import { Product } from "../Types/Type";
import { useCart } from "../context/CartContext";
import "./ProductCard.css"; // Import the CSS file for styling



const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <img src={product.image} alt={product.title} className="product-image"/>
       <p>{product.description}</p>
       <p>${product.price}</p>
       <button className="add-to-cart-button" onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  )
}

export default ProductCard
