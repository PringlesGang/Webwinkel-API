//Product definition
export interface Order {
    id: number;
    name: string;
    cartNum: number;
    bankNum: number;
    price: number;
    products: string;
    delivered: boolean;
    orderDate: string;
}