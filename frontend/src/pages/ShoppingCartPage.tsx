import type {CartItem, Order, Product} from "../types";
import {useEffect, useState} from "react";
import CheckoutCard from "../components/CheckoutCard.tsx";
import '../styles/OrderSummary.css';
import ItemCard from "../components/ItemCard.tsx";

interface ShoppingCartProps {
    shoppingCart: CartItem[];
    removeFromCart: (productId: number) => void;
    addToCart: (product: Product) => void;
    setQuantity: (product: Product, quantity: number) => void;
}

export default function ShoppingCartPage({ shoppingCart, removeFromCart, addToCart, setQuantity } : ShoppingCartProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

    useEffect(() => {
        const sessionId = localStorage.getItem("currentPaymentSessionId");
        if (sessionId) {
            fetchOrder(sessionId);
        }
    }, []);

    async function fetchOrder(sessionId: string) {
        try {
            const res = await fetch(`http://localhost:8080/api/order/by-session/${sessionId}`);
            if (!res.ok) return;
            const data: Order = await res.json();
            setCurrentOrder(data);
        } catch (e) {
            console.error(e);
        }
    }

    async function createOrder() {
        if (!firstName || !lastName) {
            alert("Please enter both first name and last name.");
            return;
        }

        setLoading(true);

        const body = {
            firstName,
            lastName,
            items: shoppingCart.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            }))
        };

        try {
            const res = await fetch("http://localhost:8080/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data: Order = await res.json();

            setCurrentOrder(data);
            localStorage.setItem("currentPaymentSessionId", data.paymentSessionId?.toString() || "");

            window.open(`http://localhost:8000/payment/${data.paymentSessionId}`, "_blank");
        } catch (e) {
            console.error(e);
            alert("Error while creating the order.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!currentOrder?.paymentSessionId) return;

        if (currentOrder.status === "PAID" || currentOrder.status === "CANCELLED") return;

        const interval = setInterval(async () => {
            await fetchOrder(currentOrder.paymentSessionId!.toString());
        }, 5000);

        return () => clearInterval(interval);
    }, [currentOrder?.paymentSessionId]);

    return (
        <div>
            <h1>Shopping Cart</h1>

            {shoppingCart.length === 0 && <p>Cart is empty.</p>}

            {shoppingCart.map(item => (
                <div key={item.id}>
                    <ItemCard
                        key={item.product.id}
                        product={item.product}
                        addToCart={addToCart}
                        setQuantity={setQuantity}
                        removeFromCart={() => removeFromCart(item.product.id)}
                        quantityInCart={item.quantity}
                        isInCart={true}
                    />
                </div>
            ))}

            {shoppingCart.length > 0 && (
                <CheckoutCard
                    firstName={firstName}
                    lastName={lastName}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    loading={loading}
                    createOrder={createOrder}
                />
            )}

            {currentOrder && (
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <p>
                        <strong>Customer:</strong> {currentOrder.firstName} {currentOrder.lastName}
                    </p>
                    <p>
                        <strong>Status:</strong>{" "}
                        <span className={`status ${
                            currentOrder.status === "PAID" ? 
                                "status-paid" : currentOrder.status === "CANCELLED" ? 
                                    "status-cancelled" : "status-waiting"
                        }`}>
                            {currentOrder.status}
                        </span>
                    </p>

                    <p><strong>Items:</strong></p>
                    <ul>
                        {currentOrder.items.map(item => (
                            <ItemCard
                                key={item.product.id}
                                product={item.product}
                                quantityInCart={item.quantity}
                                isInCart={false}
                            />
                        ))}
                    </ul>

                    <p>
                        <strong>Total:</strong>{" "}
                        {currentOrder.items.reduce((total, item) => total + item.product.price * item.quantity, 0)} CZK
                    </p>
                </div>
            )}
        </div>
    );
}
