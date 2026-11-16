const express = require('express');
const productRouter = express.Router();


productRouter.post('/products', (req, res) => {

    res.send('Adding a new product');
});


productRouter.get('/products', (req, res) => {

    res.send('Fetching all products');
});

productRouter.get('/products/:productId', (req, res) => {

    const productId = req.params.productId
    res.send(`Fetching product with ID: ${productId}`);
});

module.exports = productRouter;