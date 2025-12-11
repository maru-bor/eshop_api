import type { Product } from "../types";
import { useState, useEffect } from "react";

interface ProductCardProps {
    product: Product;
    addToCart: (product: Product) => void;
    setQuantity: (product: Product, amount: number) => void;
    removeFromCart: (product: Product) => void;
    quantityInCart?: number;
}

export default function ProductCard({ product, addToCart, removeFromCart, setQuantity, quantityInCart = 0 }: ProductCardProps) {
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        setAmount(quantityInCart);
    }, [quantityInCart]);

    useEffect(() => {
        if (amount > 0) {
            setQuantity(product, amount);
        } else {
            removeFromCart(product);
        }
    }, [amount]);

    return (
        <div id="product-card">
            <h2>{product.name}</h2>
            <div id="product-info">
                <p id="description">{product.description}</p>
                <p id="price">{product.price}</p>

                {amount <= 0 ? (
                    <div id="addToCart">
                        <button onClick={() => {
                            setAmount(1);
                            addToCart(product);
                        }}>
                            Add to cart
                        </button>
                    </div>
                ) : (
                    <div id="productQuantity">
                        <button onClick={() => setAmount(prev => Math.max(0, prev - 1))}>-</button>
                        <input
                            type="number"
                            value={amount}
                            min={0}
                            onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                        />
                        <button onClick={() => setAmount(prev => prev + 1)}>+</button>
                    </div>
                )}

                {amount > 0 && (
                    <button onClick={() => {
                        setAmount(0);
                        removeFromCart(product);
                    }}>
                        Remove from cart
                    </button>
                )}
            </div>
        </div>
    );
}
