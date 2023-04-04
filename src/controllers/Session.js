import passport from "passport";

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
    passport.authenticate('login', (err, user) => {
        if (err) {
            return res.status(500).json({
                message: err
            });
        }
        if (!user) {
            return res.status(200).json({
                status: "failure",
                response: "Correo electrónico o contraseña incorrecta"
            });
        }
        req.session.login = true;
        req.session.name = user.first_name;
        req.session.role = user.role;
        return res.status(200).json({
            status: "success",
            greetings: `Bienvenido ${req.session.name}, tu rol es ${req.session.role}`
        });
    })(req, res);
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
