import type { CartItem } from "../types";

export default function ProductsPage({setShoppingCart,}: { setShoppingCart: React.Dispatch<React.SetStateAction<CartItem[]>>; }) {
    function addToCart(item: CartItem) {
           setShoppingCart(prev => [...prev, item]);

    }
    function removeFromCart(id: number) {
               setShoppingCart(prev => prev.filter(i => i.id !== id));
    }

    return (
        <div>
            <h1>Products</h1>
            <button onClick={addToCart}>Add test product</button>
        </div>
    );
}
