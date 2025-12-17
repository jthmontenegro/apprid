import { db } from '../config/db.js';

const pool = db.mysql;

export const getAllProducts = async () => {
	const [rows] = await pool.query('SELECT * FROM products');
	return rows;
};

export const getProductById = async (id) => {
	const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
	return rows[0];
};

export const createProduct = async (product) => {
	const { name, price, description } = product;
	const [result] = await pool.query(
		'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
		[name, price, description]
	);
	return { id: result.insertId, ...product };
};

export const updateProduct = async (id, product) => {
	const { name, price, description } = product;
	await pool.query(
		'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
		[name, price, description, id]
	);
	return { id, ...product };
};

export const deleteProduct = async (id) => {
	await pool.query('DELETE FROM products WHERE id = ?', [id]);
	return { id };
};
