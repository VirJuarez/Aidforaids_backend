# Aidforaids_backend

## Descripción general del proyecto
Este proyecto es un e-commerce para la venta de libros. El sistema será capaz de manejar el inventario, permitir la venta y compra de libros, contar con un carrito de compras, permitir la autenticación de los usuarios, registrar nuevos usuarios y contar con un perfil de usuario.

## Tecnologías utilizadas
Las tecnologías utilizadas en este proyecto son Typescript, PostgreSQL, Prisma, Node.js y Express.

## Instrucciones de instalación y configuración
Para instalar y configurar el proyecto, siga estos pasos:

**1.** Clonar el repositorio de GitHub a través del siguiente enlace: https://github.com/VirJuarez/Aidforaids_backend.git.

**2.** Asegúrese de tener instalado Node.js en su sistema.

**3.** Ejecute el comando npm install en su terminal para instalar todas las dependencias necesarias.

**4.** Cree una base de datos PostgreSQL y asegúrese de tener las credenciales necesarias para conectarse. Debe tener tambien instalado Docker y Docker Compose para utilizar la configuración del archivo .yml

**5.** Cree un archivo .env y agregue las siguientes variables de entorno: *DATABASE_URL*, 
*JWT_SECRET*, *DATABASE_USER* y *DATABASE_PASSWORD*

**6.** Ejecute el comando *docker-compose up -d* para utilizar la configuración del archivo -yml

**7.** Ejecute las migraciones de Prisma con el siguiente comando: *npx prisma migrate dev*.

**8.** Ejecute el comando **npm run dev** para iniciar el servidor local.

## Endpoints

**GET http://localhost:3000/products - LISTA DE PRODUCTOS**

Devuelve la lista completa de productos registrados con sus propiedades. Por el momento libros con id, isbn, título, autor, editorial, precio, cantidad en stock

**POST http://localhost:3000/products - AGREGAR PRODUCTO**

Se debe enviar un body con el siguente formato para agregar libros a la base de datos .{"isbn":"978-84082166363", "title": "Mujercitas", "price":300, "author":"Louisa May Alcott", "editorial":"editorial2", "stock":10 }.
En el caso de querer agregar productos que no sean libros, se usarían los campos title(nombre del producto), price, stock, isbn(código del producto), los demás campos no son obligatorios

**POST http://localhost:3000/products/:ISBNdelproducto - MODIFICAR STOCK POR INGRESO DE PRODUCTOS**

Se debe enviar junto con un body de este formato {"nuevostock":10}, y suma la cantidad de stock indicado por body al stock de ese momento. Este endpoint no pide detalles del distribuidor, para eso debería haber modificado la base de datos, y agregar otro model de distribuidor en el que se indique que cantidad y productos se le compraron. La implementación de ese model dependerá de si el negocio cuenta con muchos proveedores, si un mismo libro puede venir de distintos proveedores o no.

**POST http://localhost:3000/user - REGISTRO DE NUEVO USUARIO**

Se envia por body la siguiente información obligatoria {"email":"virginia@gmail.com","name":"Virginia", "password":"Vir123"}. La contraseña se almacena en la base de datos hasheada para mayor seguridad

**POST http://localhost:3000/user/login - LOGIN DE USUARIO**

Se envia por body la siquiente información {"email":"virginia@gmail.com", "password":"Vir123"}, y nos devuelve el token de acceso. Este token tiene una validez de una hora para mayor seguridad

**PUT http://localhost:3000/user/update - AGREGAR o MODIFICAR DATOS DE USUARIO**

Debe recibir por headers la *authorization* con el token de acceso, y por body los datos de address y photoUrl que se quieran modificar

**PUT http://localhost:3000/user/cart - AGREGAR PRODUCTOS AL CARRITO**

Debe recibir por headers la *authorization* con el token de acceso, y por body el id del producto y la cantidad del mismo que se desea agregar {"productId":1, "amount":2 }. No permite agregar más cantidad de la que hay en stock.

**PUT http://localhost:3000/user/buy - COMPRAR** 

Debe recibir por headers la *authorization* con el token de acceso. Al realizar la compra, borra los elementos del carrito y reduce el stock de los productos comprados. Devuelve un mensaje de compra exitosa. Este endpoint es básico, se podría modificar según lo que requiera el cliente y el funcionamiento de la página









