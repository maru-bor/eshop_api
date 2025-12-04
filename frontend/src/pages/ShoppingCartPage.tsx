import type { CartItem } from "../types";

export default function ShoppingCartPage({shoppingCart, removeFromCart}: { shoppingCart: CartItem[]; removeFromCart: (productId: number) => void; }) {
    return (
        <div>
            <h1>Shopping Cart</h1>

            {shoppingCart.length === 0 && <p>Cart is empty.</p>}

            {shoppingCart.map(item => (
                <div key={item.id}>
                    {item.product.name} - {item.quantity}
                    <button onClick={() => removeFromCart(item.product.id)}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}
