const express = require('express');

const ordersRouter = express.Router();

ordersRouter.post('/orders', (req, res) => {

    res.send('A new order has been created.')
});

ordersRouter.get('/orders', (req, res) => {
    res.send('Here is the list of all orders.');
});

module.exports = ordersRouter;