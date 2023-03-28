import { getManagerUsers } from "../dao/daoManager.js";
import { createHash } from "../utils/bcrypt.js";

const data = await getManagerUsers();
export const managerUsers = new data();

export const adminUser = {
    first_name: "Alexis",
    last_name: "Paz",
    email: "adminCoder@coder.com",
    age: 28,
    password: createHash("adminCod3r123"),
    role: "Admin"
}

export const createUser = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body

    try {
        const user = await managerUsers.getUserByEmail(email)

        if (user) {
            res.status(200).json({
                status: "failure",
                Response: "El email esta en uso, intente otro"
            });

        } else {
            const hashPassword = createHash(password);

            await managerUsers.addElements([{
                first_name: first_name,
                last_name: last_name,
                email: email,
                age: age,
                password: hashPassword
            }])

            res.status(200).json({
                status: "success",
                greetings: "El usuario ha sido creado, ya puede loguearse"
            });
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}