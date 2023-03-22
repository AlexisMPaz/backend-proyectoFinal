import { getManagerCarts } from "../dao/daoManager.js";
import { managerProducts } from "./Products.js";

const data = await getManagerCarts();
export const managerCarts = new data();

export const createCart = async (req, res) => {
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

}

export const getCart = async (req, res) => {
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
}

export const updateCartProducts = async (req, res) => {
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

}

export const addProductToCart = async (req, res) => {
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

}

export const updateProductQuantity = async (req, res) => {
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

}

export const deleteCartProducts = async (req, res) => {
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
}

export const deleteCartProduct = async (req, res) => {
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
}