import local from 'passport-local';
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import { getManagerUsers } from '../dao/daoManager.js';
import { createHash, comparePassword } from '../utils/bcrypt.js';
import { generateToken, authToken } from '../utils/jwt.js';

const data = await getManagerUsers();
export const managerUsers = new data();

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                const user = await managerUsers.getUserByEmail(username);
                if (user) {
                    return done(null, false);
                }
                const hashPassword = createHash(password);
                const newUser = await managerUsers.addOneElement({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    role: "Usuario",
                    password: hashPassword
                })
                const token = generateToken(newUser);
                return done(null, newUser);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

        try {
            const user = await managerUsers.getUserByEmail(username);
            if (!user) {
                return done(null, false);
            }
            if (comparePassword(password, user.password)) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/auth/github/callback'
    }, async (accessToken, refreshToken, profile, done) => {

        try {
            const user = await managerUsers.getUserByEmail(profile._json.email);
            console.log(user)

            if (user) { //Usuario ya existe en BDD
                return done(null, user)
            } else {
                const passwordHash = createHash('coder123')
                const userCreated = await managerUsers.addOneElement({
                    first_name: profile._json.name,
                    last_name: ' ',
                    email: profile._json.email,
                    age: 18,
                    role: "Usuario",
                    password: passwordHash //Contraseña por default ya que no puedo acceder a la contraseña de github
                });

                console.log(userCreated)
                return done(null, userCreated)
            }

        } catch (error) {
            return done(error)
        }
    }))

    //Iniciar la session del usuario
    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    //Eliminar la sesion del usuario
    passport.deserializeUser(async (id, done) => {
        const user = await managerUsers.getElementById(id)
        done(null, user)
    });
}