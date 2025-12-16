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
