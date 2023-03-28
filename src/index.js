import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import MongoStore from 'connect-mongo';
import  router  from './routes/index.routes.js';
import { __dirname } from './path.js';
import * as path from 'path';
import { managerMessages } from './controllers/Messages.js';

const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));
app.set("port", process.env.PORT || 8080);

app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));

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