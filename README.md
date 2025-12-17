# COMO CONECTAR 

Paso 1: Elige la base de datos en el código
Abre el archivo d:\motrikids-Backend--main\config\db.js.
Busca la primera línea de código:
const DB_SELECCIONADA = "MYSQL"; 
Asegúrate de que tenga la base de datos que quieres probar ("MYSQL" o "MONGO").


Paso 2: Configura tus contraseñas
Asegúrate de tener un archivo llamado .env en la raíz del proyecto (d:\motrikids-Backend--main).
Este archivo debe tener las credenciales para la base de datos que elegiste.
Si elegiste "MYSQL", el archivo .env debe tener esto (con tus datos):
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=motrikids
Si elegiste "MONGO", el archivo .env debe tener tu cadena de conexión:
MONGO_URI=mongodb://...


Paso 3: Instala las dependencias
Abre una terminal en la carpeta de tu proyecto.
Ejecuta este comando para instalar los paquetes necesarios:
npm install


Paso 4: Inicia el servidor
En la misma terminal, ejecuta:
node app.js

Si todo está bien, la terminal te mostrará un mensaje de éxito como Conectado a MySQL... o  Conectado a MongoDB. Si ves un error, revisa que las contraseñas en tu archivo .env sean las correctas.

# Motrikids - Backend y Frontend Simple

Este repositorio contiene un CRUD completo para gestión de niños (6 a 8 años),
consumido desde un frontend simple (HTML + JavaScript Fetch) y con un backend
en Node.js + Express conectado a una base de datos MySQL.

## Estructura

- **app.js** - punto de entrada del servidor
- **config/db.js** - conexión a MySQL
- **controller/** - controladores REST
- **routes/api.js** - rutas CRUD
- **public/** - frontend estático
- **services/dbService.js** - lógica de acceso a DB

## Endpoints

- `GET /api/ninos` - Obtener todos los niños
- `GET /api/ninos/:id` - Obtener un niño por ID
- `POST /api/ninos` - Crear nuevo niño
- `PUT /api/ninos/:id` - Actualizar niño
- `DELETE /api/ninos/:id` - Eliminar niño

## Cómo ejecutar el proyecto

1. Clona el repositorio
2. Configura tu archivo `.env` con tus credenciales MySQL
3. Ejecuta:

```bash
npm install
npm run dev
