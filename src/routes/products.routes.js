import { Router } from "express";
import { getProducts, getProduct, addProducts, updateProduct, deleteProduct } from "../controllers/Products.js";


export const routerProduct = Router();

//Products

routerProduct.get('/', getProducts);
routerProduct.get('/:pid', getProduct);
routerProduct.post('/', addProducts);
routerProduct.put('/:pid', updateProduct);
routerProduct.delete('/:pid', deleteProduct);