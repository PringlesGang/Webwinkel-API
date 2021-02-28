import { Request, Response } from "express";
import { Order } from "./order.model";

import * as dao from "./order.dao";
import { CreateOrderDTO } from "./dto/create-order.dto";

//Gets the order from database
export async function getOrders(): Promise<Order[]> {
    return dao.findAll();
}

//Adds an order to the database
export async function createOrder(dto: CreateOrderDTO): Promise<Order> {
    const id = await dao.create(dto);

    return await dao.findById(id);
}