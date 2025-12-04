import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import './App.css';

import ProductsPage from "./pages/ProductsPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import type { CartItem } from "./types";

function App() {
    const [shoppingCart, setShoppingCart] = useState<CartItem[]>([]);

    return (
        <Router>
            <nav>
                <Link to="/">Products</Link> |{" "}
                <Link to="/shopping-cart">Cart ({shoppingCart.length})</Link>
            </nav>

            <Routes>
                <Route
                    path="/"
                    element={<ProductsPage setShoppingCart={setShoppingCart} />}
                />
                <Route
                    path="/shopping-cart"
                    element={<ShoppingCartPage shoppingCart={shoppingCart} />}
                />
            </Routes>
        </Router>
    );
}

export default App;