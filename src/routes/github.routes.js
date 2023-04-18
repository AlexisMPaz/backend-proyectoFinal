import { Router } from "express";
import passport from "passport";

export const routerGithub = Router()

//Register
routerGithub.get('/', passport.authenticate('github'));

//Login
routerGithub.get('/callback', (req, res, next) => {
    passport.authenticate('github', (err, user) => {
        if (err) {
            req.session.message = "Ha ocurrido un error durante el registro";
            return res.redirect('/login');
        }
        if (!user) {
            req.session.message = "No se a podido verificar";
            return res.redirect('/login');
        }

        req.session.login = true;
        req.session.user = user;
        return res.redirect('/products');

    })(req, res, next);
});