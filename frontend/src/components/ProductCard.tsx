import type { Product } from "../types";
import { useState } from "react";

interface ProductCardProps {
    product: Product;
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    lowerAmount: (product: Product) => void;
}

export default function ProductCard({ product, addToCart, removeFromCart, lowerAmount }: ProductCardProps) {
     const [amount, setAmount] = useState(0);
     return(
            <>
                <div id="product-card">
                <h2>{product.name}</h2>
                   <div id="product-info" >
                      <p id="desc"> {product.description}</p>
                      <p id="price"> {product.price} </p>

                       <div id="productQuantity">
                         <button onClick={() => addToCart(product)}>+</button>
                         <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                         <button onClick={() => lowerAmount(product)}>-</button>
                       </div>
                       <button onClick={() => removeFromCart(product)}>Remove from cart</button>
                   </div>
                </div>

            </>
     );
}
