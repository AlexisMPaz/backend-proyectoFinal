const selectedDB = process.env.DBSELECTION

export const getManagerMessages = async() => {
    const modelMessage = selectedDB == 1 ? await import ('./MongoDB/models/Message.js').then(module => module.default) : await import('./Postgresql/models/Message.js').then(module => module.default);
    return modelMessage;
}

export const getManagerProducts = async() => {
    const modelProduct = selectedDB == 1 ? await import('./MongoDB/models/Product.js').then(module => module.default) : await import('./Postgresql/models/Product.js').then(module => module.default);
    return modelProduct;
}

export const getManagerCarts = async() => {
    const modelCart = selectedDB == 1 ? await import('./MongoDB/models/Cart.js').then(module => module.default) : await import('./Postgresql/models/Cart.js').then(module => module.default);
    return modelCart;
}


