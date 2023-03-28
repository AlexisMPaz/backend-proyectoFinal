
import { Router } from "express";
import { destroySession, getSession, testLogin } from "../controllers/Session.js";

export const routerSession = Router()

//("api/session")
routerSession.post("/testLogin", testLogin);
routerSession.get("/logout", destroySession);
routerSession.get("/getSession", getSession);