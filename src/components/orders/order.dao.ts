import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import database from "../../utils/database";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { Order } from "./order.model";
import { Product } from "../product/product.model";

//Gets all orders
export async function findAll(): Promise<Order[]> {
    const [results] = await database.query("SELECT * FROM orders");

    return results as Order[];
}

//Gets an order by its id
export async function findById(id: number): Promise<Order> {
    const [results] = await database.query("SELECT * FROM orders WHERE id=?", [id]) as RowDataPacket[];

    return results[0] as Order;
}

//Adds an order
export async function create(dto: CreateOrderDTO): Promise<number> {
    let {address, name, cardNum, bankNum, price, products} = dto;

    //Add the order to the database
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query(
        "INSERT INTO orders (address, orderName, cardNum, bankNum, price) VALUES (?, ?, ?, ?, ?)",
        [address, name, cardNum, bankNum, price]
    );

    for (let i = 0; i < products.length; i++) {
        //Add the ordered items to the database
        await database.query(
            "INSERT INTO orderItems (orderId, itemId, amount) VALUES (?, ?, ?)",
            [result.insertId, products[i].id, products[i].amount]
        );

        //Update the stock
        await database.query(
            "UPDATE products SET stock = stock - ? WHERE id = ?",
            [products[i].amount, products[i].id]
        );
    }

    return result.insertId;
}