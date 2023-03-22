import { getManagerProducts } from "../dao/daoManager.js";

const data = await getManagerProducts();
export const managerProducts = new data();

export const getProducts = async (req, res) => {

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

    try {
        // Obtener productos paginados y filtrados
        const products = await managerProducts.paginateElements(filters, options)

        if (products) {

            //Armar los links para pagina previa y siguiente
            const prevLink = products.hasPrevPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&page=${products.prevPage}` : null
            const nextLink = products.hasNextPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&page=${products.nextPage}` : null

            return res.status(200).json({
                status: "success",
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: prevLink,
                nextLink: nextLink
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

export const getProduct = async (req, res) => {

    const idProduct = req.params.pid;

    try {
        const product = await managerProducts.getElementByID(idProduct);

        if (product) {
            return res.status(200).json(product)
        }

        return res.status(200).json({
            message: "Producto no encontrado"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const addProducts = async (req, res) => {
    const info = req.body;

    try {
        const products = await managerProducts.addElements(info);

        res.status(204).json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

export const updateProduct = async (req, res) => {

    const idProduct = req.params.pid;
    const info = req.body;

    try {
        const product = await managerProducts.updateElement(idProduct, info);

        if (product) {
            return res.status(200).json({
                message: "Producto actualizado"
            });
        }

        res.status(200).json({
            message: "Producto no encontrado"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteProduct = async (req, res) => {

    const idProduct = req.params.pid;

    try {
        const product = await managerProducts.deleteElement(idProduct);

        if (product) {
            return res.status(200).json({
                message: "Producto eliminado"
            });
        }

        res.status(200).json({
            message: "Producto no encontrado"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

