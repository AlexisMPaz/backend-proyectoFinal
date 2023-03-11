import { promises as fs, existsSync, writeFileSync } from 'fs'

export class CartManager {
    constructor(path) {
        this.path = path
    }

    checkFile = () => {
        !existsSync(this.path) && writeFileSync(this.path, "[]", "utf-8");
    };

    async addCart() {
        this.checkFile();
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));

        const newID = carts.length ? carts[carts.length - 1].id + 1 : 1;
        const newCart = { products: [], id: newID };
        carts.push(newCart);

        await fs.writeFile(this.path, JSON.stringify(carts));
    }

    async getCartByID(idCart) {
        this.checkFile();
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const cart = carts.find(cart => cart.id === idCart);
        return cart ? cart.products : `Error: El Carrito ID: ${idCart} no existe`;
    }

    async addToCart(idCart, idProduct) {
        this.checkFile();
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const cart = carts.find(cart => cart.id === idCart);

        if (!cart) {
            return `Error: El Carrito ID: ${idCart} no existe`;
        }

        const products = JSON.parse(await fs.readFile("./src/models/products.json", 'utf-8'));
        const product = products.find(prod => prod.id === idProduct);

        if (!product) {
            return `Error: El producto ID: ${idProduct} no existe`
        }

        const productInCart = cart.products.find(prod => prod.idProduct === idProduct);
        console.log(productInCart)

        if (!productInCart) {
            cart.products.push({ idProduct, quantity: 1 });
        } else if (productInCart.quantity < product.stock) {
            productInCart.quantity++;
        } else {
            return 'No hay suficiente stock';
        }

        await fs.writeFile(this.path, JSON.stringify(carts));
        return `El producto ID: ${idProduct} ha sido añadido al carrito ID: ${idCart} `
    }
}