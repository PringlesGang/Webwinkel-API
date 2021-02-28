import { Request, Response, Router } from "express";
import { CreateProductDTO } from "./dto/create-product.dto";
import * as controller from "./product.controller";



const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    const products = await controller.getProducts();
    
    res.json({
        "success": true,
        "result": products
    });
});

router.get("/getProductByCategories", async (req: Request, res: Response) => {
    const products = await controller.getProductByCategories();

    res.json({
        "success": true,
        "result": products
    });
});

router.post("/", async (req: Request, res: Response) => {
    const dto = req.body as CreateProductDTO;

    const product = await controller.createProduct(dto);
    
    res.json({
        "success": true,
        "result": product
    });
});

export default router;