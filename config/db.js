// --- CONFIGURACIÓN FÁCIL ---
// Cambia el valor de DB_SELECCIONADA a "MYSQL" o "MONGO" para elegir la base de datos.
const DB_SELECCIONADA = "MONGO"; //Opciones: "MYSQL", "MONGO"
// --------------------------------

// --------------------------------

import { createPool } from 'mysql2/promise';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let db = {};

const connectToMongo = async () => {
	if (!process.env.MONGO_URI) {
		throw new Error('La variable de entorno MONGO_URI no está definida. Por favor, añádela a tu archivo .env');
	}
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('✅ Conectado a MongoDB');
		db.mongo = mongoose;
	} catch (error) {
		console.error('❌ Error de conexión a MongoDB:', error.message);
		throw error;
	}
};

const connectToMySQL = async () => {
	const poolConfig = {
		host: process.env.DB_HOST || 'localhost',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'motrikids',
		port: Number(process.env.DB_PORT) || 3306,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
		timezone: 'local',
		charset: 'utf8mb4',
		decimalNumbers: true,
		enableKeepAlive: true,
		keepAliveInitialDelay: 10000,
	};

	console.log('Configuración MySQL:', {
		host: poolConfig.host,
		user: poolConfig.user,
		database: poolConfig.database,
		port: poolConfig.port,
	});

	try {
		const pool = createPool(poolConfig);
		const connection = await pool.getConnection();
		console.log('✅ Conectado a MySQL - Base de datos:', connection.config.database);
		connection.release();
		db.mysql = pool;
	} catch (error) {
		console.error('❌ Error de conexión a MySQL:', error.message);
		throw error;
	}
};

export const connectDB = async () => {
	console.log(`🔌 Usando la base de datos: ${DB_SELECCIONADA}`);
	if (DB_SELECCIONADA === 'MONGO') {
		await connectToMongo();
	} else if (DB_SELECCIONADA === 'MYSQL') {
		await connectToMySQL();
	} else {
		throw new Error(`El valor de DB_SELECCIONADA ("${DB_SELECCIONADA}") no es válido. Debe ser "MONGO" o "MYSQL".`);
	}
};

export { db };
