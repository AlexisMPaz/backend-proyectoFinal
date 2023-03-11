import { Router } from "express";
import { managerProducts } from "./handlebars.routes.js";

export const routerProduct = Router();

//Products

routerProduct.get('/', async (req, res) => {
    try {
        const products = await managerProducts.getElements();
        console.log(products)
        res.send({ response: products });

    } catch (error) {
        res.send({ response: error });
    }
});


routerProduct.get('/:idProduct', async (req, res) => {
    try {
        const idProduct = req.params.idProduct;
        const product = await managerProducts.getElementByID(idProduct);
        res.send({ response: product });
    } catch (error) {
        res.send({ response: error });
    }
});

routerProduct.post('/', async (req, res) => {
    try {
        const info = req.body;
        let response = await managerProducts.addElements(info);
        res.send({ response: response });
    } catch (error) {
        res.send({ response: error });
    }
});

routerProduct.put('/:idProduct', async (req, res) => {
    try {
        const idProduct = req.params.idProduct;
        const info = req.body;
        let response = await managerProducts.updateElement(idProduct, info);
        res.send({ response: response });
    } catch (error) {
        res.send({ response: error });
    }
});

routerProduct.delete('/:idProduct', async (req, res) => {
    try {
        const idProduct = req.params.idProduct;
        const product = await managerProducts.deleteElement(idProduct);
        res.send({ response: `El producto ID: ${idProduct} ha sido eliminado` });
    } catch (error) {
        res.send({ response: error });
    }
});