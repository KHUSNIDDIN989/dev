import { Router } from "express";
import { GET_USER } from "../controllers/users.js";

const router = Router()


router.get("/getUser", GET_USER)

export {
    router
}