const path = require('path');
const {
    getAllProducts: getAllProductsService,
    getProductById: getProductByIdService,
    addProduct: addProductService
} = require('../services/productServices');

const getProductsPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../view/products.html'));
};

const getAllProducts = (req, res) => {
    const result = getAllProductsService();
    res.send(result);
};

const getProductById = (req, res) => {
    const productId = req.params.productId;

    const result = getProductByIdService(productId);

    res.send(result);
};

const addProduct = (req, res) => {
    const result = addProductService();

    res.send(result);
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    getProductsPage
};