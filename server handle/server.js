const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Path to the books.json file
const booksFilePath = path.join(__dirname, 'books.json');

// Function to get books data from the file
const getBooksData = () => {
    try {
        const data = fs.readFileSync(booksFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Function to save books data to the file
const saveBooksData = (books) => {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2), 'utf8');
};

// Route to add a new book
app.post('/api/books', (req, res) => {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Title, Author, and Year are required' });
    }

    const books = getBooksData();
    const newBook = { title, author, year };

    books.push(newBook);
    saveBooksData(books);

    res.status(201).json({ message: 'Book added successfully', book: newBook });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
