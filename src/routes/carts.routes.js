import { Router } from "express";
import { createCart, getCart, updateCartProducts, addProductToCart, updateProductQuantity, deleteCartProducts, deleteCartProduct } from "../controllers/Carts.js";

export const routerCarts = Router();


// Carts

routerCarts.post('/', createCart);
routerCarts.get('/:cid', getCart);
routerCarts.put('/:cid', updateCartProducts);
routerCarts.post('/:cid/product/:pid', addProductToCart);
routerCarts.put('/:cid/product/:pid', updateProductQuantity);
routerCarts.delete('/:cid', deleteCartProducts);
routerCarts.delete('/:cid/product/:pid', deleteCartProduct);