const express = require('express');
const bookRouter = express.Router();

bookRouter.post('/books', (req, res) => {
    console.log('New book details:', req.body);

    res.send('Your new book has been successfully registered!');
});

bookRouter.get('/books', (req, res) => {

    console.log('Fetching all available books...');

    res.send('Welcome! Here you can explore our book collection.');
});


module.exports = bookRouter;
