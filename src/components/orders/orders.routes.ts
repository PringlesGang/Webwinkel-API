import { Request, Response, Router } from "express";
import database from "../../utils/database";
import { BadRequestException } from "../../utils/exceptions/exception";
import { findAll, findById } from "../product/product.dao";
import { CreateOrderDTO } from "./dto/create-order.dto";
import * as controller from "./order.controller";
//import { findById } as 


const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    const orders = await controller.getOrders();
    
    res.json({
        "success": true,
        "result": orders
    });
});

router.post("/", async (req: Request, res: Response) => {
    const dto = req.body as CreateOrderDTO;

    //Error handling
    if (dto.bankNum.length != 10) {
        throw new BadRequestException("Bank number has to be 10 characters long.")
    }
    if (dto.cardNum.length != 4) {
        res.status(400).send({
            message: "Card number has to be 4 characters long."
        })
        return;
    }
    if (dto.name.length > 100) {
        res.status(400).send({
            message: "Name has to be below 101 characters."
        })
        return;
    }
    if (dto.address.length > 100) {
        res.status(400).send({
            message: "Address has to be below 101 characters."
        })
        return;
    }
    for (let i = 0; i < dto.bankNum.length; i++) {
        if (dto.bankNum.charAt(i) < '0' || dto.bankNum.charAt(i) > '9') {
            res.status(400).send({
                message: "Bank number has to be a number."
            })
            return;
        }
    }
    for (let i = 0; i < dto.cardNum.length; i++) {
        if (dto.cardNum.charAt(i) < '0' || dto.cardNum.charAt(i) > '9') {
            res.status(400).send({
                message: "Card number has to be a number."
            })
            return;
        }
    }
    for (let i = 0; i < dto.products.length; i++) {
        let allProducts = await findAll();
        let productStock = -1;

        //Test if the amount wanted is positive
        if (dto.products[i].amount <= 0) {
            res.status(400).send({
                message: "Item amount has to be positive."
            })
            return;
        }

        //Test if the product exists
        let testProductExists = false;
        for (let j = 0; j < allProducts.length; i++) {
            if (dto.products[i].id == allProducts[j].id) {
                testProductExists = true;
                productStock = allProducts[j].stock;
                break;
            }
        }
        if (testProductExists == false) {
            res.status(400).send({
                message: "Item in cart doesn't exist."
            })
            return;
        }

        //Test if enough stock exists
        if (dto.products[i].amount > productStock) {
            res.status(400).send({
                message: "Not enough stock available."
            })
            return;
        }
    }

    //Calculate the price
    let price = 0;
    for (let i = 0; i < dto.products.length; i++) {
        let foundProduct = await findById(dto.products[i].id);
        price += foundProduct.price * dto.products[i].amount;
    }
    dto.price = price;

    const product = await controller.createOrder(dto);
    
    res.json({
        "success": true,
        "result": product
    });
});

export default router;