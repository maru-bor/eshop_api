import type { CartItem } from "../types";

export default function ProductsPage({setShoppingCart,}: { setShoppingCart: React.Dispatch<React.SetStateAction<CartItem[]>>; }) {
    function addToCart() {
        setShoppingCart((prev) => [
            ...prev,
            { id: 1, name: "Boty" },
        ]);
    }

    return (
        <div>
            <h1>Products</h1>
            <button onClick={addToCart}>Add test product</button>
        </div>
    );
}
