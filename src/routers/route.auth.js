import { Router } from "express";
import { REGTR_USER } from "../controllers/auth.js";

const routerAuth = Router()


routerAuth.post("/regstrUser", REGTR_USER)



export {
    routerAuth
}