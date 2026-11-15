const express = require('express');
const categoriesRouter = express.Router();


categoriesRouter.post('/categories', (req, res) => {

    res.send('A new category has been created');
});


categoriesRouter.get('/categories', (req, res) => {

    res.send('Here is the list of all categories');
});


module.exports = categoriesRouter;