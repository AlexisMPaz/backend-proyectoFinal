import passport from "passport"

// Mensajes de error con Passport

export const registerError = async (req, res, next) => {
    passport.authenticate('register', (err, user) => {
        if (err) {
            req.session.message = "Ha ocurrido un error durante el registro";
            return res.redirect('/register');
        }
        if (!user) {
            req.session.message = "El correo electrónico ya está en uso";
            return res.redirect('/register');
        }
        next()
    })(req, res, next)
}

export const loginError = async (req, res, next) => {
    passport.authenticate('login', (err, user) => {
        if (err) {
            req.session.message = "Ha ocurrido un error, intente mas tarde";
            return res.redirect('/login');
        }
        if (!user) {
            req.session.message = "Correo electrónico o contraseña incorrecta";
            return res.redirect('/login');
        }
        req.user = user;
        next()
    })(req, res, next)
}
