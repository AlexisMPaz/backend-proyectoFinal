# Backend Proyecto Final para CoderHouse

Comisión: 39685
Alumno: Alexis Paz

Antes de iniciar la aplicacion se debe instalar las dependencias con:

- npm i

**Las variables de entorno necesarias se encuentran en la entrega por la plataforma de Coder**

Para iniciar el servidor (script):

- npm run dev (nodemon)

Puerto: 8080

**Segunda Pre-Entrega del Proyecto Final**

- Eliminado FileSystem y actualizado todos los endpoints de la api en products.routes y carts.routes con metodos de mongoose. Metodos actualizados:

    **PRODUCTS:**

    * GET 'api/products': devuelve todos los productos paginados usando distintos querys (category filtra por categoria (si no existe no hay filtrado), page selecciona la pagina (default 1), limit es el numero maximo de doc por pagina (default 10) y sort es el orden de los productos si no se agrega nada no se ordenan y sort es desc se ordenan por precio descendente y si existe pero no es desc se orden de forma ascendente ) con el siguiente formato:
        {
            status: "success",
            payload: Aca estan todos los productos a mostrar,
            totalPages: total de paginas,
            prevPage: anterior pagina,
            nextPage: proxima pagina,
            page: pagina actual,
            hasPrevPage: si tiene pagina anterior,
            hasNextPage: si tiene pagina siguiente,
            prevLink: link de la pagina anterior manteniendo la misma configuracion,
            nextLink: link de la pagina siguiente manteniendo la misma configuracion
        }
            
    * GET 'api/products/:pid': Devuelve solo 1 producto por id

    * POST 'api/products': Agrega 1 o mas productos a la base de datos mediante informacion del body, el schema gracias a sus required y sus defaults se encarga de validar la informacion.

    * PUT 'api/products/:pid': Actualiza un producto con informacion del body, puede ser 1 o mas campos a modificar

    * DELETE 'api/products/:pid': Elimina de la base de datos un producto

    **CARTS:**

    * POST 'api/carts':crea un nuevo carrito con array de productos vacio.

    * GET 'api/carts/:cid': Devuelve el carrito por el ID

    * POST 'api/carts/:cid/product/:pid': Agrega un producto al array del carrito si es un producto valido. Si el producto no existe dentro del array lo pushea con quantity default = 1 y si ya existia solo le suma su quantity en 1.


- Se agregaron nuevos endpoints a la api de carts pedidos por la consigna:

    * PUT '/:cid': modifica el carrito con un array de productos que le llegan por el body sobreescribiendo la data anterior
    El Body con los productos cargados actualmente en el carrito fue el siguiente:

        {
            "products": [       
                {
                    "productId": "6415e3e727162311ee2f8465"
                },
                {
                    "productId": "6415e3e727162311ee2f8466"
                },
                {
                    "productId": "6415e3e727162311ee2f8467"
                },
                {
                    "productId": "6415e3e727162311ee2f8468"
                },
                {
                    "productId": "6415e3e727162311ee2f8469"
                }
            ]
        }

    * PUT 'api/carts/:cid/product/:pid': modifica la quantity de un producto dentro del array del carrito con la cantidad que le llegue por el body en el siguiente formato:
    {"quantity": "cantidad aca"} 

    * DELETE 'api/carts/:cid': Reemplaza el array de productos del carrito por un array vacio.
    
    * DELETE 'api/carts/:cid/product/:pid': Borra un producto dentro del array del carrito.


- Vistas de Handlebars:

 * '/' En la ruta raiz hay una pequeña introduccion a la pagina

 * '/products' Vista en forma de tarjetas los productos paginados con los valores default de los querys:
    limit = 10 y page = 1

    Tambien tiene un sub navbar que filtra los producto por categoria y existen 2 metodos de ordenar los productos por precio, si no se agrega el query sort no se ordenan, si ?sort=desc se ordenan de mayor a menor y si sort existe pero no es igual a desc se ordenan de menor a mayor.

    Cada card tiene un boton que lleva a la pagina de detalles del producto donde esta el boton para agregar al carrito/

* '/products/:pid' vista de los detalles del producto con un boton de agregar al carrito que por el momento no funciona.

* '/cart/:cid' Vista de los productos dentro del array del carrito con el metodo populate

* '/chat' vista del chat en tiempo real con socket







