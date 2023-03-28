import { Router } from "express";
import * as controller from "../controllers/Views.js";

export const routerViews = Router()

//Vistas

routerViews.get('/products', controller.sessionChecker, controller.viewProducts);
routerViews.get('/products/:pid', controller.sessionChecker, controller.viewDetails);
routerViews.get('/cart/:cid', controller.sessionChecker, controller.viewCart);
routerViews.get('/chat', controller.sessionChecker, controller.viewChat);
routerViews.get('/login', controller.viewLogin);
routerViews.get('/register', controller.viewRegister);

routerViews.get("/logout", controller.sessionChecker, controller.logout);
routerViews.post("/login", controller.login);
routerViews.post("/register", controller.register);