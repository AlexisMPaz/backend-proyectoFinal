import { Router } from "express";
import { managerProducts } from "../controllers/Products.js";
import { managerCarts } from "../controllers/Carts.js";

export const routerViews = Router()

//Vistas

//Index
routerViews.get('/', async (req, res) => { 
    res.render("index");
});

//Vista de productos paginada
routerViews.get('/products', async (req, res) => {
    try {
        //Parametros de consulta con sus respectivos default en caso de no existir
        const { limit = 10, page = 1, sort = "", category = "" } = req.query;

        //Filtros
        const filters = { stock: { $gt: 0 } };
        if (category) filters.category = category;

        //Opciones
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
        };
        if (sort) options.sort = { price: sort === 'desc' ? -1 : 1 }

        // Obtener productos paginados y filtrados
        const productsPaginated = await managerProducts.paginateElements(filters, options)

        //Armar los links para pagina previa y siguiente
        const prevLink = productsPaginated.hasPrevPage ? `/products?category=${category}&limit=${limit}&sort=${sort}&page=${productsPaginated.prevPage}` : null
        const nextLink = productsPaginated.hasNextPage ? `/products?category=${category}&limit=${limit}&sort=${sort}&page=${productsPaginated.nextPage}` : null

        const products = {
            status: "success",
            payload: productsPaginated.docs,
            totalPages: productsPaginated.totalPages,
            prevPage: productsPaginated.prevPage,
            nextPage: productsPaginated.nextPage,
            page: productsPaginated.page,
            hasPrevPage: productsPaginated.hasPrevPage,
            hasNextPage: productsPaginated.hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink
        };


        res.render("products", {
            products
        });

    } catch (error) {

        res.render({
            status: "error",
            payload: error,
        });
    }
});

//Vista de detalles del producto
routerViews.get('/products/:pid', async (req, res) => {
    const idProduct = req.params.pid;

    const product = await managerProducts.getElementByID(idProduct);
    console.log(product)

    res.render("details", {
        product
    });
});

//Vista del carrito
routerViews.get('/cart/:cid', async (req, res) => {
    const idCart = req.params.cid;

    const cart = await managerCarts.cartPopulate(idCart, managerProducts.model);

    res.render("cart", {
        cart
    });
});

//Vista del chat con socket
routerViews.get('/chat', async (req, res) => {
    res.render("chat");
});

