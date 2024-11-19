import express from 'express';
import config from './config';
import bodyParser from 'body-parser';
import cors from 'cors';
import controller from "./controllers";
import {connectDataBase} from "./connectDb";

const app :express.Express = express()
const port = config.port

connectDataBase()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});

app.use(controller)

