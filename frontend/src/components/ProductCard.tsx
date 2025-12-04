import type { Product } from "../types";

interface ProductCardProps {
    product: Product;
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart, removeFromCart }: ProductCardProps) {
     return(
            <>
                <div id="product-card">
                <h2>{product.name}</h2>
                   <div id="product-info" >
                      <p id="desc"> {product.description}</p>
                      <p id="price"> {product.price} </p>

                       <button onClick={() => addToCart(product)}>Add to cart</button>
                       <button onClick={() => removeFromCart(product)}>Remove from cart</button>
                   </div>
                </div>

            </>
     );
}
