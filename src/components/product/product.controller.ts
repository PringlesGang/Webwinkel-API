import { Request, Response } from "express";
import { Product } from "./product.model";

import * as dao from "./product.dao";
import { CreateProductDTO } from "./dto/create-product.dto";

//Gets the products from database
export async function getProducts(): Promise<Product[]> {
    return dao.findAll();
}

export async function getProductByCategories(): Promise<Product[][]> {
    let result: Product[][] = [];
    const categories = await dao.findCategories();
    for (let i = 0; i < categories.length; i++) {
        result.push(await dao.findByCategory(categories[i]));
    }
    return result;
}

//Adds a product to the database
export async function createProduct(dto: CreateProductDTO): Promise<Product> {
    const id = await dao.create(dto);

    return await dao.findById(id);
}