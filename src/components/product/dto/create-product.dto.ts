//Product constructor
export interface CreateProductDTO {
    name: string;
    price: number;
    stock?: number;
    image?: string;
    description?: string;
    category: string;
}