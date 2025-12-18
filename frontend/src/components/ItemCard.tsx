import type { Product } from "../types";
import { useState, useEffect } from "react";
import "../styles/ItemCard.css"

interface ItemCardProps {
    product: Product;
    isInCart: boolean;
    addToCart?: (product: Product) => void;
    setQuantity?: (product: Product, quantity: number) => void;
    removeFromCart?: (product: Product) => void;
    quantityInCart: number;
}

export default function ItemCard({ product, addToCart, removeFromCart, setQuantity, quantityInCart = 0, isInCart }: ItemCardProps) {
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        setAmount(quantityInCart);
    }, [quantityInCart]);

    function handleAmountChange(newAmount: number) {
        setAmount(newAmount);

        if (newAmount === 1 && quantityInCart === 0) {
            addToCart?.(product);
            return;
        }

        if (newAmount > 0) {
            setQuantity?.(product, newAmount);
        } else {
            removeFromCart?.(product);
        }
    }

    return (
        <div id="item-card">
            <p><strong>{product.name}</strong></p>
            <div id="product-info">
                <p id="price">{product.price * amount} CZK</p>
                {isInCart && (
                    <>
                    {amount <= 0 ? (
                        <div id="addToCart">
                            <button onClick={() => handleAmountChange(1)}>
                                Add to cart
                            </button>
                        </div>
                    ) : (
                        <div id="productQuantity">
                            <button onClick={() => handleAmountChange(amount - 1)}>-</button>
                            <input
                                type="number"
                                value={amount}
                                min={0}
                                onChange={(e) => handleAmountChange(Math.max(0, Number(e.target.value)))}
                            />
                            <button onClick={() => handleAmountChange(amount + 1)}>+</button>
                        </div>
                    )}

                    {amount > 0 && (
                        <button id="remove-btn" onClick={() => handleAmountChange(0)}>
                            Remove from cart
                        </button>
                    )}
                    </>
                )}

            </div>
        </div>
    );
}
