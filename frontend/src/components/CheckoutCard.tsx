import '../styles/Checkout.css';

interface CheckoutCardProps {
    firstName: string;
    lastName: string;
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
    loading: boolean;
    createOrder: () => void;
}

export default function CheckoutCard({
                                         firstName,
                                         lastName,
                                         setFirstName,
                                         setLastName,
                                         loading,
                                         createOrder
                                     }: CheckoutCardProps) {
    return (
        <div className="checkout-card">
            <h2>Checkout</h2>

            <div className="checkout-input">
                <label htmlFor={"firstName"}>First Name</label>
                <input
                    id={"firstName"}
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
            </div>

            <div className="checkout-input">
                <label htmlFor={"lastName"}>Last Name</label>
                <input
                    id={"lastName"}
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
            </div>

            <button onClick={createOrder}>
                {loading ? "Processing..." : "Create Order & Pay"}
            </button>
        </div>
    );
}
