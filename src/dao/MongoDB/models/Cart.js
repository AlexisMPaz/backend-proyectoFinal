import { Schema } from "mongoose";
import { ManagerMongoDB } from "../db/mongoDBManager.js";

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

    try {
      const cart = await this.model.findById(idCart);
      const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

      if (productIndex === -1) {
        cart.products.push({ productId: idProduct });

      } else {
        cart.products[productIndex].quantity += 1;
      }

      return await cart.save();


    } catch (error) {
      throw error
    }
  }

  async updateQuantity(idCart, idProduct, newQuantity) {
    await this._setConnection();

    try {
      const cart = await this.model.findById(idCart);
      const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

      if (productIndex === -1) {
        throw new Error('El producto no existe en el carrito.');
      }

      cart.products[productIndex].quantity = newQuantity;

      return await cart.save();

    } catch (error) {
      throw error
    }
  }

  async deleteProduct(idCart, idProduct) {
    await this._setConnection();

    try {
      const cart = await this.model.findById(idCart);
      const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));

      if (productIndex === -1) {
        throw new Error('El producto no existe en el carrito.');
      }

      cart.products.splice(productIndex, 1);

      return await cart.save();

    } catch (error) {
      throw error
    }

  }

  async cartPopulate(idCart, model) {
    await this._setConnection();

    try {
      const cart = await this.model.findById(idCart);

      if (!cart) {
        throw new Error(`El carrito no existe`);
      }

      return await cart.populate({ path: "products.productId", model: model })

    } catch (error) {
      throw error
    }
  }
}

export default ManagerCarts;