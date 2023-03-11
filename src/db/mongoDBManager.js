import mongoose from "mongoose";

export class ManagerMongoDB {
    #url
    constructor(url, collection, schema) {
        this.#url = url
        this.collection = collection
        this.schema = new mongoose.Schema(schema)
        this.model = mongoose.model(this.collection, this.schema)
    }

    async #setConnection() {
        try {
            await mongoose.connect(this.#url, {dbName: 'ecommerce'});
            console.log("DB is connected");

        } catch(error) {
            return error;
        }
    }

    async addElements(elements) {
        this.#setConnection();
        try {
            return await this.model.insertMany(elements);
        } catch(error) {
            return error;
        }
    }

    async getElements() {
        this.#setConnection();
        try {    
            return await this.model.find().lean();
        } catch(error) {
            return error;
        }
    }

    async getElementByID(id) {
        console.log(id)
        this.#setConnection();
        try {
            return await this.model.findById(id)
        } catch(error) {
            return error;
        }
    }

    async updateElement(id, info) {
        this.#setConnection();
        try {
            return await this.model.findByIdAndUpdate(id, info)
        } catch(error) {
            return error;
        }
    }

    async deleteElement(id) {
        this.#setConnection();
        try {
            return await this.model.findByIdAndDelete(id)
        } catch(error) {
            return error;
        }
    }
}