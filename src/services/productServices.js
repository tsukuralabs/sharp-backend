let products = [];

const getAllProducts = () => {
    return products;
};

const getProductById = (productId) => {
    return products.find(
        product => product.id === Number(productId)
    );
};

const addProduct = (productName) => {
    const product = {
        id: products.length + 1,
        productName
    };

    products.push(product);

    return product;
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct
};