import { Schema } from "mongoose";
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";

const url = process.env.URLMONGODB;

const messageSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    message: { 
        type: String, 
        required: true 
    }
});

class ManagerMessages extends ManagerMongoDB {
    constructor() {
        super(url, "messages", messageSchema)
    }
}

export default ManagerMessages;