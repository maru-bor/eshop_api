export type CartItem = {
    id: number,
    quantity: number,
    product: Product
};

export type Product = {
    id: number,
    name: string,
    description: string,
    price: number
}

export interface Item {
    id: number;
    product: Product;
    quantity: number;
}

export interface Order {
    id: number;
    firstName: string;
    lastName: string;
    status: string;
    paymentSessionId: number | null;
    items: Item[];
}