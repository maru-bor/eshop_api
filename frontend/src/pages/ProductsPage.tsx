import { useState, useEffect } from "react";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";

export default function ProductsPage({addToCart, removeFromCart}: { addToCart: (product: Product) => void;     removeFromCart: (productId: number) => void;
}) {
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
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    removeFromCart={() => removeFromCart(product.id)}
                />
            ))}
        </div>
    );
}
