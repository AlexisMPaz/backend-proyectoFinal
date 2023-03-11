import 'dotenv/config'
import express from 'express'
import { __filename, __dirname } from './path.js';
import * as path from 'path';

import { routerProduct } from './routes/products.routes.js';
import { routerHandlebars } from './routes/handlebars.routes.js';
import { routerUpload } from './routes/upload.routes.js';

import { Server } from 'socket.io';
import { engine } from 'express-handlebars';

import { getManagerMessages } from './dao/daoManager.js';

const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

//Routes
app.use('/', express.static(__dirname + '/public'));
app.use('/', routerHandlebars);
app.use('/upload', routerUpload);
app.use('/api/products', routerProduct);

app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`));

//Socket.io

const io = new Server(server);

const data = await getManagerMessages();
const managerMessages = new data();

io.on("connection", (socket) => {
    console.log("Cliente conectado");
    managerMessages.getElements().then((messages) => {
        socket.emit("allMessages", messages);
    })

    socket.on("message", async (info) => {
        managerMessages.addElements([info]).then(() => {
            managerMessages.getElements().then((messages) => {
                socket.emit("allMessages", messages);
            })
        })
    })
})

