import { Router } from "express";
import { getManagerProducts } from "../dao/daoManager.js";

export const routerHandlebars = Router()

const data = await getManagerProducts();
export const managerProducts = new data();


//HBS
routerHandlebars.get('/', async (req, res) => {
    const products = await managerProducts.getElements();

    res.render("index", {
        products
    });
});

routerHandlebars.get('/chat', async (req, res) => {
    res.render("chat");
});

