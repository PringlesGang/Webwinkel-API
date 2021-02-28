import { Product } from "../../product/product.model";

//Order constructor
export interface CreateOrderDTO {
    address: string;
    name: string;
    cardNum: string;
    bankNum: string;
    price: number;
    products: [{id: number, amount: number}];
}