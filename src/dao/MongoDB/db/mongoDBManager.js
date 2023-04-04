import mongoose from "mongoose";

export class ManagerMongoDB {
    #url
    constructor(url, collection, schema) {
        this.#url = url
        this.collection = collection
        this.schema = new mongoose.Schema(schema)
        this.model = mongoose.model(this.collection, this.schema)
    }

    async _setConnection() {
        try {
            await mongoose.connect(this.#url, {dbName: 'ecommerce'});
            console.log("DB is connected");

        } catch(error) {
            return error;
        }
    }

    async paginateElements(filters, options) {
        await this._setConnection();
        try {
            return await this.model.paginate(filters, options)
        } catch (error) {
            return error
        }
    }

    async addElements(elements) {
        await this._setConnection();
        try {
            return await this.model.insertMany(elements);
        } catch(error) {
            return error;
        }
    }

    async addOneElement(element) {
        await this._setConnection();
        try {
            return await this.model.create(element);
        } catch(error) {
            return error;
        }
    }

    async getElements() {
        await this._setConnection();
        try {    
            return await this.model.find();
        } catch(error) {
            return error;
        }
    }

    async getElementById(id) {
        console.log(id)
        await this._setConnection();
        try {
            return await this.model.findById(id)
        } catch(error) {
            return error;
        }
    }

    async updateElement(id, info) {
        await this._setConnection();
        try {
            return await this.model.findByIdAndUpdate(id, info)
        } catch(error) {
            return error;
        }
    }

    async deleteElement(id) {
        await this._setConnection();
        try {
            return await this.model.findByIdAndDelete(id)
        } catch(error) {
            return error;
        }
    }
}