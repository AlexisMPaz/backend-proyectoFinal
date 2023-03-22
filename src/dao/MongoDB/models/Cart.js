import { Schema } from "mongoose";
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";

const url = process.env.URLMONGODB;

const cartSchema = new Schema({
  products: {
    type: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    default: []
  },
  total: {
    type: Number,
    required: true,
    default: 0
  }
});

class ManagerCarts extends ManagerMongoDB {
  constructor() {
    super(url, "carts", cartSchema);
  }

  async addToCart(idCart, idProduct) {
    await this._setConnection();

    // Tomar el carrito de la base de datos
    const cart = await this.model.findById(idCart);

    // Verificar que exista el producto dentro del array y tomar su indice si existe
    const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

    //Agrega el producto o suma en 1 a su cantidad si ya existe
    if (productIndex === -1) {
      cart.products.push({ productId: idProduct });

    } else {
      cart.products[productIndex].quantity += 1;
    }

    // Guardar el documento actualizado
    return await cart.save();
  }

  async updateQuantity(idCart, idProduct, newQuantity) {
    await this._setConnection();

    // Tomar el carrito de la base de datos
    const cart = await this.model.findById(idCart);

    // Verificar que exista el producto dentro del array y tomar su indice si existe
    const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

    if (productIndex === -1) {
      throw new Error('El producto no existe en el carrito.');
    }

    // Actualizar la cantidad del producto
    cart.products[productIndex].quantity = newQuantity;

    // Guardar el documento actualizado
    return await cart.save();
  }

  async deleteProduct(idCart, idProduct) {
    await this._setConnection();

    // Tomar el carrito de la base de datos
    const cart = await this.model.findById(idCart);

    // Verificar que exista el producto dentro del array y tomar su indice si existe
    const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

    if (productIndex === -1) {
      throw new Error('El producto no existe en el carrito.');
    }

    // Eliminar el producto
    cart.products.splice(productIndex, 1);

    // Guardar el documento actualizado
    return await cart.save();
  }

  async cartPopulate(idCart, model) {
    await this._setConnection();
    
    try {
      // Tomar el carrito de la base de datos
      const cart = await this.model.findById(idCart);

      return await cart.populate({ path: "products.productId", model: model })

    } catch (error) {
      return null
    }
  }
}

export default ManagerCarts;