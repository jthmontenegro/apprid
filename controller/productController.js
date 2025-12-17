import dbService from '../services/dbService.js';

/* GET ALL */
export const getProducts = async (req, res, next) => {
	try {
		const products = await dbService.getAllProducts();
		res.json({
			success: true,
			data: products,
			count: products.length,
		});
	} catch (error) {
		next(error);
	}
};

/* GET BY ID */
export const getProductById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await dbService.getProductById(id);
		if (!product) {
			return res.status(404).json({
				success: false,
				message: 'Producto no encontrado',
			});
		}
		res.json({
			success: true,
			data: product,
		});
	} catch (error) {
		next(error);
	}
};

/* CREATE */
export const createProduct = async (req, res, next) => {
	try {
		const { name, price, description } = req.body;
		const newProduct = await dbService.createProduct({ name, price, description });
		res.status(201).json({ success: true, message: 'Producto registrado', data: newProduct });
	} catch (error) {
		next(error);
	}
};

/* UPDATE */
export const updateProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, price, description } = req.body;
		const updatedProduct = await dbService.updateProduct(id, { name, price, description });
		res.json({ success: true, message: 'Producto actualizado', data: updatedProduct });
	} catch (error) {
		next(error);
	}
};

/* DELETE */
export const deleteProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		await dbService.deleteProduct(id);
		res.json({ success: true, message: 'Producto eliminado' });
	} catch (error) {
		next(error);
	}
};
