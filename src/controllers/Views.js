import { managerCarts } from "./Carts.js";
import { managerProducts } from "./Products.js";
import { managerUsers } from "../config/passport.js";
import { comparePassword, createHash } from "../utils/bcrypt.js";
import { adminUser } from "./Users.js";
import passport from "passport";

export const viewProducts = async (req, res) => {
    const { limit = 10, page = 1, sort = "", category = "" } = req.query;

    const filters = { stock: { $gt: 0 } };
    if (category) filters.category = category;

    const options = { page: parseInt(page), limit: parseInt(limit) };
    if (sort) options.sort = { price: sort === 'desc' ? -1 : 1 }

    try {
        const productsPaginated = await managerProducts.paginateElements(filters, options)

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

        const user = req.session.user
        const isLoggedIn = req.session.login

        res.render("products", {
            products, user , isLoggedIn
        });



    } catch (error) {
        console.log(error);
        res.render("error", { message: "Ha ocurrido un error, intente mas tarde" });
    }
}

export const viewDetails = async (req, res) => {
    const idProduct = req.params.pid;

    try {
        const product = await managerProducts.getElementById(idProduct);

        res.render("details", {
            product
        });

    } catch (error) {
        console.log(error);
        res.render("error", { message: "Ha ocurrido un error, intente mas tarde" });
    }
}

export const viewCart = async (req, res) => {
    const idCart = req.session.user.cartId;

    try {
        const cart = await managerCarts.cartPopulate(idCart, managerProducts.model);

        res.render("cart", {
            cart
        });

    } catch (error) {
        console.log(error);
        res.render("error", { message: "Ha ocurrido un error al cargar el carrito" });
    }
}

export const viewChat = async (req, res) => {
    res.render("chat");
}

export const viewLogin = async (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render("login", { message });
}

export const viewRegister = async (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render("register", { message });
}

export const sessionChecker = (req, res, next) => {
    if (req.session.login) {
        next()
    } else {
        req.session.message = "Primero debe loguearse";
        res.redirect('/login');
    }
}

export const login = async (req, res) => {
    req.session.login = true;
    req.session.user = req.user;
    return res.redirect('/products');
}

export const logout = (req, res) => {
    //delete req.session.user;
    req.session.destroy()
    res.redirect('/login')
}

export const register = (req, res) => {
    req.session.message = "Registrado correctamente, ya puede logearse";
    return res.redirect('/login');
}