import express from "express";
import {Form} from "../entity"
import {AppDataSource} from "../connectDb";

const mainRouter = express.Router();

mainRouter.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello World!");
})

mainRouter.post("/", (req: express.Request | any, res: express.Response | any) => {
    try {
        let data: any = req?.body
        console.log(req.body);
        if (data.gay) {
            return res.send({
                message:"ХХАХАХАХАХАХ ГЕЙ!",
                color: "#3ae6ca",
            })
        }
        res.send({
            message: "Ok!",
            color: "#d514dc"
        });
    } catch (error: any) {
        res.send({
            message: "Pizda!",
            error: error.message,
            color: "#DC143C"
        });
    }


})

export default mainRouter;