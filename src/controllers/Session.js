import { managerUsers } from "./Users.js"
import { comparePassword } from "../utils/bcrypt.js"
import { adminUser } from "./Users.js"

export const getSession = (req, res) => {
    if (req.session.login) {
        return res.status(200).json({
            status: "success",
            response: "La sesion esta activa",
            session: {
                name: req.session.name,
                role: req.session.role
            }
        });
    }

    res.status(200).json({
        status: "failure",
        response: "No existe sesion activa"
    });
}

export const testLogin = async (req, res) => {
    const { email, password } = req.body

    if (email === adminUser.email && comparePassword(password, adminUser.password)) {
        req.session.login = true;
        req.session.name = adminUser.first_name;
        req.session.role = adminUser.role;

        return res.status(200).json({
            status: "success",
            greetings: `Bienvenido ${req.session.name}, tu rol es ${req.session.role}`
        });
    }

    try {
        const user = await managerUsers.getUserByEmail(email);

        if (user && comparePassword(password, user.password)) {
            req.session.login = true;
            req.session.name = user.first_name;
            req.session.role = user.role;

            res.status(200).json({
                status: "success",
                greetings: `Bienvenido ${req.session.name}, tu rol es ${req.session.role}`
            });
        } else {
            res.status(200).json({
                status: "failure",
                response: "El usuario no existe"
            });
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const destroySession = (req, res) => {
    if (req.session.login) {
        req.session.destroy()

        res.status(200).json({
            status: "success",
            response: `La sesion ha terminado, que tenga un buen dia`
        });

    } else {
        res.status(200).json({
            status: "failure",
            response: "No existe sesion activa"
        });

    }
}
