import { managerUsers } from "../config/passport.js";
import { createHash } from "../utils/bcrypt.js";
import passport from "passport";



export const adminUser = {
    first_name: "Alexis",
    last_name: "Paz",
    email: "adminCoder@coder.com",
    age: 28,
    password: createHash("adminCod3r123"),
    role: "Admin"
}

export const createUser = async (req, res) => {
    passport.authenticate('register', (err, user) => {
        if (err) {
            return res.status(500).json({
                message: err
            });
        }
        if (!user) {
            return res.status(200).json({
                status: "failure",
                Response: "El email esta en uso, intente otro"
            });
        }

        res.status(200).json({
            status: "success",
            greetings: "El usuario ha sido creado, ya puede loguearse"
        });

    })(req, res);
}