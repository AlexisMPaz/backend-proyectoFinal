import { Router } from "express";
import { managerCarts } from "../controllers/Carts.js";
import { managerProducts } from "../controllers/Products.js";

export const routerCarts = Router();


// Carts

routerCarts.post('/', async (req, res) => { //Crear nuevo carrito
    try {
        const newCart = {}
        await managerCarts.addElements(newCart);

        res.send({ response: 'success' });

    } catch (error) {

        res.send({
            status: "error",
            payload: error
        });
    }

});

routerCarts.get('/:cid', async (req, res) => { //Obtiene el carrito con el ID
    try {
        const idCart = req.params.cid

        const cart = await managerCarts.getElementByID(idCart);

        res.send({
            status: "success",
            payload: cart
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        });
    }
});


routerCarts.put('/:cid', async (req, res) => { //Modifica el carrito con un nuevo array de productos
    try {
        const idCart = req.params.cid
        const info = req.body;

        await managerCarts.updateElement(idCart, info);

        const cart = await managerCarts.getElementByID(idCart);

        res.send({
            status: "success",
            payload: cart
        })


    } catch (error) {
        res.send({
            status: "error",
            payload: error
        });
    }
});

routerCarts.post('/:cid/product/:pid', async (req, res) => { //Agrega un producto al carrito
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;

        const realProduct = await managerProducts.getElementByID(idProduct);

        if (realProduct) {

            const cart = await managerCarts.addToCart(idCart, idProduct);

            res.send({
                status: "success",
                payload: cart
            });

        } else {
            res.send({
                status: "error",
                payload: `No existe el producto ID: ${idProduct}`
            });
        }

    } catch (error) {

        res.send({
            status: "error",
            payload: error
        });
    }

});

routerCarts.put('/:cid/product/:pid', async (req, res) => { //Modifica la cantidad de un producto dentro del carrito
    try {
        const { quantity } = req.body;

        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        const newQuantity = parseInt(quantity);

        const updatedProduct = await managerCarts.updateQuantity(idCart, idProduct, newQuantity);

        res.send({
            status: "success",
            payload: updatedProduct
        })


    } catch (error) {
        res.send({
            status: "error",
            payload: error
        });
    }
});

routerCarts.delete('/:cid', async (req, res) => { //Vacia el array de productos del carrito
    try {
        const idCart = req.params.cid;
        const info = { products: [] }

        await managerCarts.updateElement(idCart, info);

        res.send({
            status: "success",
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        });
    }
});

routerCarts.delete('/:cid/product/:pid', async (req, res) => { //Elimina un producto dentro del array de productos del carrito
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;

        const updatedProduct = await managerCarts.deleteProduct(idCart, idProduct);

        res.send({
            status: "success",
            payload: updatedProduct
        })

    } catch (error) {
        res.send({
            status: "error",
            payload: error
        });
    }
});