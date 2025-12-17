//app.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';
import { connectDB } from './config/db.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

dotenv.config();
const PORT = process.env.PORT || 8000;

console.log('Variables de entrono:',{
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD ? '***' : '(vacio)',
},
'\n Numero de puerto: ', PORT);

const app = express();

//Middlewares
app.use(cors({
		origin: process.env.CORS_ORIGIN,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization']}
	)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(_dirname, 'public')));

//rutas
app.use('/api', apiRouter);

//Ruta principal
app.get('/',(req, res) => {
	res.sendFile(path.join(_dirname, 'public', 'index.html'));
});

///////************************

app.use((err, req, res, next) => {
	console.error('Error global:', err);
	res.status(500).json({
		success: false,
		error: 'Error interno del servidor',
		details: process.env.NODE_ENV === 'development' ? err.message : undefined
	});
});

const startServer = async () => {
	try {
		await connectDB();
		const server = app.listen(PORT, () => {
			console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
		});

		const shutdown = async () => {
			console.log('\n🔌 Recibida señal de apagado...');
			// Aquí se podría agregar la lógica para cerrar la conexión de la DB
			server.close(() => {
				console.log('✅ Servidor detenido');
				process.exit(0);
			});
		};

		process.on('SIGTERM', shutdown);
		process.on('SIGINT', shutdown);
	} catch (error) {
		console.error('❌ No se pudo conectar a la base de datos. Saliendo...');
		process.exit(1);
	}
};

startServer();