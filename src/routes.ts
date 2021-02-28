import { Router } from "express";
import productsRouter from "./components/product/product.routes";
import ordersRouter from "./components/orders/orders.routes";

const router: Router = Router();
router.use("/products", productsRouter);
router.use("/orders", ordersRouter);

export default router;