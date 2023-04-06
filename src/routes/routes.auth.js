import { Router } from "express";
import { REGTR_USER, LOGIN_USER } from "../controllers/auth.js";

const routerAuth = Router();

routerAuth.post("/signup", REGTR_USER);
routerAuth.post("/signin", LOGIN_USER);

export { routerAuth };
