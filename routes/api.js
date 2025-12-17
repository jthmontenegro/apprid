import express from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById
} from '../controller/productController.js';

import { db } from '../config/db.js';

const router = express.Router();

/* =====================
   CRUD PRODUCTS
===================== */

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

/* =====================
   DEMO MULTIBASE
===================== */

// DEMO MySQL
router.get('/demo/mysql', async (req, res) => {
  try {
    if (!db.mysql) {
      return res.json({ database: 'MySQL', error: 'No conectado' });
    }

    const [rows] = await db.mysql.query('SHOW TABLES');

    res.json({
      database: 'MySQL',
      data: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DEMO MongoDB
router.get('/demo/mongo', async (req, res) => {
  try {
    if (!db.mongo) {
      return res.json({ database: 'MongoDB', error: 'No conectado' });
    }

    const collections = await db.mongo.connection.db
      .listCollections()
      .toArray();

    res.json({
      database: 'MongoDB',
      data: collections
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
