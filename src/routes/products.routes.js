import { Router } from "express";
import { getProducts, getProduct, addProducts, updateProducts, deleteProduct } from "../controllers/Products.js";


export const routerProduct = Router();

//Products

routerProduct.get('/', getProducts);
routerProduct.get('/:pid', getProduct);
routerProduct.post('/', addProducts);
routerProduct.put('/:pid', updateProducts);
routerProduct.delete('/:pid', deleteProduct);