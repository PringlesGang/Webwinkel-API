import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { resourceLimits } from "worker_threads";
import database from "../../utils/database";
import { CreateProductDTO } from "./dto/create-product.dto";
import { Product } from "./product.model";

//Gets all products
export async function findAll(): Promise<Product[]> {
    const [results] = await database.query("SELECT * FROM products");

    return results as Product[];
}

//Gets a product by its id
export async function findById(id: number): Promise<Product> {
    const [results] = await database.query("SELECT * FROM products WHERE id=?", [id]) as RowDataPacket[];

    return results[0] as Product;
}

//Gets a product by its category
export async function findByCategory(category: string): Promise<Product[]> {
    const [results] = await database.query("SELECT * FROM products JOIN productCategories ON productCategories.productId=products.id WHERE productCategories.category = ?", [category]) as RowDataPacket[];

    return results as Product[];
}

//Gets all categories
export async function findCategories(): Promise<string[]> {
    let [results] = await database.query("SELECT DISTINCT category FROM productCategories") as RowDataPacket[];
    results = results.map((row: RowDataPacket)=>row["category"]);

    return results as string[];
}

//Adds a product
export async function create(dto: CreateProductDTO): Promise<number> {
    let {name, price, image, stock, description, category} = dto;

    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query(
        "INSERT INTO products (name, price, image, stock, description) VALUES (?, ?, ?, ?, ?)",
        [name, price, image ?? null, stock ?? null, description ?? null]
    );

    for (let i = 0; i < category.length; i++) {
        database.query(
            "INSERT INTO productCategories (productId, category) VALUES (?, ?)",
            [result.insertId, category[i]]
        );
    }

    return result.insertId;
}