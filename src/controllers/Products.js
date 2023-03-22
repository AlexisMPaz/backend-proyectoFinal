import { getManagerProducts } from "../dao/daoManager.js";

const data = await getManagerProducts();
export const managerProducts = new data();

export const getProducts = async (req, res) => {
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
        const prevLink = productsPaginated.hasPrevPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&page=${productsPaginated.prevPage}` : null
        const nextLink = productsPaginated.hasNextPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&page=${productsPaginated.nextPage}` : null

        res.send({
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
        });

    } catch (error) {

        res.send({
            status: "error",
            payload: error,
        });
    }

}

export const getProduct = async (req, res) => {
    try {
        const idProduct = req.params.pid;
        const product = await managerProducts.getElementByID(idProduct);

        res.send({
            status: "success",
            payload: product,
        });

    } catch (error) {

        res.send({
            status: "error",
            payload: error,
        });
    }

}

export const addProducts = async (req, res) => {
    try {
        const info = req.body;
        let response = await managerProducts.addElements(info);

        res.send({
            status: "success",
            payload: response,
        });

    } catch (error) {

        res.send({
            status: "error",
            payload: error,
        });
    }

}

export const updateProducts = async (req, res) => {
    try {
        const idProduct = req.params.pid;
        const info = req.body;
        let response = await managerProducts.updateElement(idProduct, info);

        res.send({
            status: "success",
            payload: response,
        });

    } catch (error) {

        res.send({
            status: "error",
            payload: error,
        });
    }

}

export const deleteProduct = async (req, res) => {
    try {
        const idProduct = req.params.pid;
        await managerProducts.deleteElement(idProduct);

        res.send({
            status: "success",
            payload: `El producto ID: ${idProduct} ha sido eliminado`,
        });

    } catch (error) {

        res.send({
            status: "error",
            payload: error,
        });
    }

}

