const express = require('express');
const productRouter = express.Router();

const {
    getAllProducts,
    getProductById,
    addProduct,
    getProductsPage
} = require('../controllers/productControllers');

productRouter.post('/products', addProduct);

productRouter.get('/products', getAllProducts);

productRouter.get('/products/:productId', getProductById);

productRouter.get('/api/products', getProductsPage);

module.exports = productRouter;