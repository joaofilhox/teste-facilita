import express, {Request, Response, json} from "express";
import cors from "cors";
import { router } from "./routes/routes";
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log(`API started on port ${port}`);
})