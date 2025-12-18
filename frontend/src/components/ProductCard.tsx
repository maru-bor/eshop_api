import type { Product } from "../types";
import { useState, useEffect } from "react";
import "../styles/ProductCard.css"

interface ProductCardProps {
    product: Product;
    addToCart: (product: Product) => void;
    setQuantity: (product: Product, quantity: number) => void;
    removeFromCart: (product: Product) => void;
    quantityInCart?: number;
}

export default function ProductCard({ product, addToCart, removeFromCart, setQuantity, quantityInCart = 0 }: ProductCardProps) {
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        setAmount(quantityInCart);
    }, [quantityInCart]);

    function handleAmountChange(newAmount: number) {
        setAmount(newAmount);

        if (amount == 0) {
            addToCart(product)
        }

        if (newAmount > 0) {
            setQuantity(product, newAmount);
        } else {
            removeFromCart(product);
        }
    }

    return (
        <div id="product-card">
            <h2>{product.name}</h2>
            <div id="product-info">
                <p id="description">{product.description}</p>
                <p id="price">{product.price} CZK</p>

                {amount <= 0 ? (
                    <div id="addToCart">
                        <button onClick={() => handleAmountChange(1)}>
                            Add to cart
                        </button>
                    </div>
                ) : (
                    <div id="productQuantity">
                        <button onClick={() => handleAmountChange(amount - 1)}>-</button>
                        <input id="quantity-input"
                            type="number"
                            value={amount}
                            min={0}
                            onChange={(e) => handleAmountChange(Math.max(0, Number(e.target.value)))}
                        />
                        <button onClick={() => handleAmountChange(amount + 1)}>+</button>
                    </div>
                )}

                {amount > 0 && (
                    <button onClick={() => handleAmountChange(0)}>
                        Remove from cart
                    </button>
                )}
            </div>
        </div>
    );
}
