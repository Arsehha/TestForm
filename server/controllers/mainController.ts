import express from "express";
import {Form} from "../entity"
import {AppDataSource} from "../connectDb";

const mainRouter = express.Router();

mainRouter.get("/form/get-all/", async (req: express.Request | any, res: express.Response | any) => {
    try {
        const formRepository = AppDataSource.getRepository(Form)
        const Data = await formRepository.find()
        return res.send( {
            data: Data,
        })
    } catch (err) {
        console.error("Suka");
    }
})

mainRouter.post("/form/create", async (req: express.Request | any, res: express.Response | any) => {
    try {
        let data: any = req?.body;
        let {name, secondName, phone, gender, gay} = data

        if (!name && !secondName && !phone) {
            return res.status(400).send({
                message: "Обязательные поля"
            })
        }

        const formRepository = AppDataSource.getRepository(Form)
        const formFromDb = await formRepository.findOneBy({
            phone
        })

        if(formFromDb) {
            return res.status(400).send({
                message: "Телефон уже занят"
            })
        }

        const createForm = new Form()
        createForm.name = name
        createForm.secondName = secondName
        createForm.phone = phone
        createForm.gender = gender
        createForm.gay = gay

        const save = await formRepository.save(createForm)
        return res.send({
            save,
            message: "Ok!",
            color: "#d514dc"
        })
    } catch (err) {
        console.error("SukaBlyat");
    }
})

mainRouter.get("/form/get/:id", async (req: express.Request | any, res: express.Response | any) => {
  try {
      const id = req.params.id

      if (!(Number.isInteger(+id))) {
          return res.status(400).send({
              message: "Ощибка id"
          })
      }

      const formRepository = AppDataSource.getRepository(Form)
      const formFromDb = await formRepository.findOneBy({id})
      return res.send({
          fromDb: formFromDb
      })

  }  catch (err) {
      console.error("chto-to ne vichlo");
  }
})

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