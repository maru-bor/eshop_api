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