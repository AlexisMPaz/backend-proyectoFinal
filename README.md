# Backend Proyecto Final para CoderHouse

Comisión: 39685
Alumno: Alexis Paz

Antes de iniciar la aplicacion se debe instalar las dependencias con:

- npm i

**Las variables de entorno necesarias se encuentran en la entrega por la plataforma de Coder**

Para iniciar el servidor (script):

- npm run dev (nodemon)

Puerto: 8080

**Desafio Login por formulario**

- Agregadas vistas para el registro y el login

**Login**

-Incorpore un Middleware que se encarga de hacer un redirect al "/login" en cualquier ruta valida excepto el registro si no hay una sesion verificada.

-En caso de logearse correctamente, se guarda el nombre y el rol del usuario en variables de la sesion para mostrarlo en un mensaje de bienvenida en "/products"

-Si la informacion de logeo es incorrecta recarga el login con mensaje "El usuario no existe"

Para testear el login aqui esta el usuario admin que esta hardcodeado en el archivo "controllers/Users.js":

email: adminCoder@coder.com
password: adminCod3r123

y aqui una cuenta de un usuario comun cargado en la base de datos de MongoDB

email: damian@gmail.com
password: damian1234

**Registro**

-El formulario de registro crea un nuevo usuario en la base de datos, si se ingresa un email ya en uso Recarga la pagina con mensaje "Email en uso"

-Al crear el usuario hace un redirect a login con mensaje "Se ha registrado correctamente"

-El formato del email debe ser valido para que se cree el usuario, me falta hacer una validacion en la vista, por el momento si se pone una direccion invalida es posible que aparesca mensaje correcto pero no se cree el usuario.
El formato para el email es el siguiente:

"nombre@nombre.com"

ejemplo: "alexis@gmail.com"

**Logout**

-Se ha agregado un icono en el navbar al lado del icono del carrito que se encarga de terminar la sesion y hacer un redirect a "/login"

**Postman**

-las vistas se manejan todas con los controllers en Views.js, pero tambien existen los controllers en Session.js y Users.js que trabajan con las routes en user.routes.js y session.routes.js. Estan pensadas para hacer lo mismo que las vistas pero en vez de manejarse con redirects, se manejan con res.status.

Muchas gracias por la paciencia, si tenes alguna pregunta sobre mi trabajo no dudes en mandarme un mensaje.







