import { Schema } from "mongoose";
import { ManagerMongoDB } from "../db/mongoDBManager.js";
import paginate from 'mongoose-paginate-v2'

const url = process.env.URLMONGODB;

const productSchema = new Schema({
    title: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    code: { 
        type: String,
        unique: true,
        required: true,
        match: /^[A-Z]{2}\d{4}$/

    },
    price: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: Boolean, 
        default: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    thumbnails: {
        type: Array, 
        default: ["/img/torre.png"]
    }
})

productSchema.plugin(paginate);

class ManagerProducts extends ManagerMongoDB {
    constructor() {
        super(url, "products", productSchema)
    }
}

export default ManagerProducts;