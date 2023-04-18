import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport'
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from './path.js';
import * as path from 'path';
import  router  from './routes/index.routes.js';
import { managerMessages } from './controllers/Messages.js';
import { initializePassport } from './config/passport.js'

const app = express();

//Middlewares
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URLMONGODB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 300
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

app.set("port", process.env.PORT || 8080);

//Routes
app.use('/', express.static(__dirname + '/public'));
app.use('/', router);

//Error cuando se ingresa a una pagina que no existe
app.use((req, res) => { res.status(404).render('error', {message: 'Página no encontrada'})});

const server = app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`));

//Chat con Socket

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Cliente conectado");
    managerMessages.getElements().then((messages) => {
        socket.emit("allMessages", messages);
    });

    socket.on("message", async (info) => {
        managerMessages.addElements([info]).then(() => {
            managerMessages.getElements().then((messages) => {
                socket.emit("allMessages", messages);
            });
        });
    });
});