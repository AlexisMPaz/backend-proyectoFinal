import { getManagerCarts } from "../dao/daoManager.js";
import { managerProducts } from "./Products.js";

const data = await getManagerCarts();
export const managerCarts = new data();

export const createCart = async (req, res) => {
    try {
        const response = await managerCarts.addElements();

        return res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getCart = async (req, res) => {
    try {
        const idCart = req.params.cid;

        const cart = await managerCarts.getElementById(idCart);

        if (cart) {
            return res.status(200).json(cart);
        }

        res.status(200).json({
            message: "Carrito no encontrado"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const updateCartProducts = async (req, res) => {

    const idCart = req.params.cid
    const info = req.body;

    try {
        const products = await managerCarts.updateElement(idCart, info);

        if (products) {
            return res.status(200).json({
                message: "Productos actualizados"
            })
        }

        res.status(200).json({
            message: "Productos no encontrados"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

export const addProductToCart = async (req, res) => {

    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    try {
        const realProduct = await managerProducts.getElementById(idProduct);

        if (realProduct) {

            const cart = await managerCarts.addToCart(idCart, idProduct);

            if (cart) {
                return res.status(200).json(cart);
            }

            res.status(200).json({
                message: "Carrito no encontrado"
            });

        }

        res.status(200).json({
            message: "Producto no Existe"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const updateProductQuantity = async (req, res) => {

    const { quantity } = req.body;

    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const newQuantity = parseInt(quantity);

    try {
        const cart = await managerCarts.updateQuantity(idCart, idProduct, newQuantity);

        if (cart) {
            return res.status(200).json(cart);
        }

        res.status(200).json({
            message: "Carrito no encontrado"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

export const deleteCartProducts = async (req, res) => {

    const idCart = req.params.cid;
    const info = { products: [] }

    try {
        const cart = await managerCarts.updateElement(idCart, info);

        if (cart) {
            return res.status(200).json(cart);
        }

        res.status(200).json({
            message: "Carrito no encontrado"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteCartProduct = async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProduct = req.params.pid;

        const cart = await managerCarts.deleteProduct(idCart, idProduct);

        if (cart) {
            return res.status(200).json(cart);
        }

        res.status(200).json({
            message: "Carrito no encontrado"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}