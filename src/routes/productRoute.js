const express = require('express');
const productRouter = express.Router();


productRouter.post('/products', (req, res) => {

    res.send('A new product has been created');
});


productRouter.get('/products', (req, res) => {

    res.send('Here is the list of all products');
});


module.exports = productRouter;