const express = require('express');
const productRouter = express.Router();

const {
    getAllProducts,
    getProductById,
    addProduct
} = require('../controllers/productController');

productRouter.post('/products', addProduct);

productRouter.get('/products', getAllProducts);

productRouter.get('/products/:productId', getProductById);

module.exports = productRouter;