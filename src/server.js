import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import routers from "./routes/index.js";
import model from "./utils/fs.js";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

app.use(model, routers);

app.get("/*", (req, res) => res.sendStatus(404));

app.listen(PORT, () => console.log(PORT + " is running"));
