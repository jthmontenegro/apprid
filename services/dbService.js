import dotenv from 'dotenv';
dotenv.config();

const DB_TYPE = process.env.DB_TYPE || 'MYSQL';

let dbService;

if (DB_TYPE === 'MONGO') {
	dbService = await import('./mongoDbService.js');
} else {
	dbService = await import('./mysqlDbService.js');
}

export default dbService;
