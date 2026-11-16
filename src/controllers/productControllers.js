const {
    getAllProducts: getAllProductsService,
    getProductById: getProductByIdService,
    addProduct: addProductService
} = require('../services/productService');

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
    addProduct
};