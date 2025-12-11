import type { CartItem } from "../types";
import { useState } from "react";
import CheckoutCard from "../components/CheckoutCard.tsx";

export default function ShoppingCartPage({ shoppingCart, removeFromCart }: { shoppingCart: CartItem[]; removeFromCart: (productId: number) => void; }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);

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

            const data = await res.json();

            window.open(`http://localhost:8000/payment/${data.paymentSessionId}`, "_blank");

        } catch (e) {
            console.error(e);
            alert("Error while creating the order.");
        } finally {
            setLoading(false);
        }
    }

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
        </div>
    );
}
