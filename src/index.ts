require("dotenv").config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response, Application, NextFunction } from "express";
import router from "./routes";

import database from "./utils/database";
import errorHandler from "./utils/exceptions/errorHandler";

const app: Application = express();
const PORT = parseInt(`${process.env.PORT}`) || 3001;

const Layer = require("express/lib/router/layer");
const handle_request = Layer.prototype.handle_request;

Layer.prototype.handle_request = function (req: Request, res: Response, next: NextFunction) {
    if (!this.isWrapped && this.method) {
        let handle = this.handle;
        this.handle = async function (req: Request, res: Response, next: NextFunction) {
            try {
                await handle.apply(this, arguments);
            } catch (error) {
                next(error);
            }
        };
        this.isWrapped = true;
    }
    return handle_request.apply(this, arguments);
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the webwinkel REST API");
});

app.use(router);
app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}!`);
});