import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	description: { type: String },
});

const Product = mongoose.model('Product', productSchema);

export const getAllProducts = async () => {
	return await Product.find();
};

export const getProductById = async (id) => {
	return await Product.findById(id);
};

export const createProduct = async (product) => {
	const newProduct = new Product(product);
	return await newProduct.save();
};

export const updateProduct = async (id, product) => {
	return await Product.findByIdAndUpdate(id, product, { new: true });
};

export const deleteProduct = async (id) => {
	return await Product.findByIdAndDelete(id);
};
