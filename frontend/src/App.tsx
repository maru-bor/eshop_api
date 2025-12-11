import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import './styles/App.css';

import ProductsPage from "./pages/ProductsPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import type { CartItem, Product } from "./types";

function App() {
    const [shoppingCart, setShoppingCart] = useState<CartItem[]>([]);

    function addToCart(product: Product) {
        setShoppingCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);

            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...prev,
                {
                    id: prev.length + 1,
                    quantity: 1,
                    product: product
                }
            ];
        });
    }

    function removeFromCart(productId: number) {
        setShoppingCart(prev =>
            prev.filter(item => item.product.id !== productId)
        );
    }


    return (
        <Router>
            <nav>
                <Link to="/">Products</Link> |{" "}
                <Link to="/shopping-cart">Cart ({shoppingCart.length})</Link>
            </nav>

            <Routes>
                <Route
                    path="/"
                    element={
                        <ProductsPage
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                        />
                    }
                />
                <Route
                    path="/shopping-cart"
                    element={
                        <ShoppingCartPage
                            shoppingCart={shoppingCart}
                            removeFromCart={removeFromCart}
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;