import { Router } from "express";
import { createUser } from "../controllers/Users.js";

export const routerUser = Router();

//("/api/user")
routerUser.post("/", createUser);
