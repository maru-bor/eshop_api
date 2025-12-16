import { useState, useEffect } from "react";
import type { Product, CartItem } from "../types";
import ProductCard from "../components/ProductCard";
import '../styles/ProductsPage.css';
import '../styles/ProductCard.css'

interface ProductsPageProps {
    addToCart: (product: Product) => void;
    setQuantity: (product: Product, amount: number) => void;
    removeFromCart: (productId: number) => void;
    shoppingCart: CartItem[];
}

export default function ProductsPage({ addToCart, setQuantity, removeFromCart, shoppingCart }: ProductsPageProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/product")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch products");
                return res.json();
            })
            .then((data: Product[]) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Products</h1>
            <div id="productsPage">
              {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    setQuantity={setQuantity}
                    removeFromCart={() => removeFromCart(product.id)}
                    quantityInCart={shoppingCart.find(item => item.product.id === product.id)?.quantity || 0}
                />
                ))}
            </div>
        </div>
    );
}
