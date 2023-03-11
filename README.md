# Backend Proyecto Final para CoderHouse

Comisión: 39685
Alumno: Alexis Paz

Antes de iniciar la aplicacion se debe instalar las dependencias con:

- npm i

**Las variables de entorno necesarias se encuentran en la entrega por la plataforma de Coder**

Para iniciar el servidor (script):

- npm run dev (nodemon)

Puerto: 8080

**Entrega Primera Practica Integradora**

- products.routes.js

Hubo todo un tema con esta entrega, el desafio estaba mal explicado y ya hemos hablado con el profesor, aun asi ya habia cambiado los metodos de Postman para que funcionen con mongoose en vez de fs.
Si bien falta todo lo referente a los carritos, GET, PUT, POST y DELETE Funciona con la base de datos.

La ruta para los productos es "/api/products"

- handlebars.routes.js

Se encarga de mostrar las views de Handlebars. 

En la ruta raiz ("/") renderiza todos los productos en la base de datos de MongoDB.

En la ruta del chat ("/chat") renderiza un chat en tiempo real con socket que carga y muestra los mensajes guardados en la base de datos de MongoDB.

- Estructura dao con un manager en src/dao/daoManager.js que se encarga mediante la variable de entorno en inportar de forma condicional los modelos de mongoose en index.js y en handlebars.routes.js







