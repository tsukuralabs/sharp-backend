// Business Logic

const getAllProducts = () => {
    return 'Fetching all products';
};

const getProductById = (productId) => {
    return `Fetching product with ID: ${productId}`;
};

const addProduct = () => {
    return 'Adding a new product';
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct
};