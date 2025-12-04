import type { CartItem } from "../types";

export default function ShoppingCartPage({shoppingCart,}: { shoppingCart: CartItem[]; }) {
    return (
        <div>
            <h1>Shopping Cart</h1>

            {shoppingCart.length === 0 && <p>Cart is empty.</p>}

            {shoppingCart.map((item) => (
                <p key={item.id}>{item.name}</p>
            ))}
        </div>
    );
}