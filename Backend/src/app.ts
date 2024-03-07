import express, {Request, Response, json} from "express";
import cors from "cors";
import { router } from "./routes/routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(router);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`API started on port ${port}`);
})