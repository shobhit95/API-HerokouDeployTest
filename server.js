const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
const books = [
    { title: 'Harry Potter', id: 1 },
    { title: 'Twilight', id: 2 },
    { title: 'Lorien Legacies', id: 3 }
]

app.get('/', (req, res) => {
    res.send("Welcome to Books APIs.");
});

app.get('/books', (req, res) => {
    res.send(books);
})

app.get('/books/:id', (req, res) => {
    const book = books.find(i => i.id == parseInt(req.params.id));
    if (!book) {
        res.send("The requested book is not available.")
    } else {
        res.send(book);
    }
})

app.get('/books/title/:title', (req, res) => {
    const book = books.find(i => i.title == req.params.title);
    if (!book) {
        res.send("The requested book is not available.")
    } else {
        res.send(book);
    }
})

app.post('/books', (req, res) => {
    if (req.body.title) {
        const newBook = books.find(i => i.id == parseInt(req.body.id));
        if (!newBook) {
            books.push(req.body);
            res.status(200).send("Book is added successfully!")
        } else {
            res.status(404).send("Book with same id already exists!")
        }
    }
    else {
        res.status(404).send("No data to add!")
    }
})

app.put('/books/:id', (req, res) => {
    if (req.body.title) {
        const newBook = books.findIndex(i => i.id == parseInt(req.params.id));
        if (!newBook) {
            res.status(404).send("Book not exists!")
        } else {
            console.log(books)
            books[newBook].title = req.body.title
            res.status(200).send("Book modified successfully!")
        }
    }
    else {
        res.status(404).send("No data to add!")
    }
})

app.delete('/books/:id', (req, res) => {
    if (req.body) {
        const bookIndex = books.findIndex(i => i.id == parseInt(req.params.id));
        if (!bookIndex) {
            res.status(404).send("The requested book is not available.")
        } else {
            books.splice(bookIndex, 1);
            res.status(200).send("Book deleted successfully!")
        }
    } else {
        res.status(404).send("No data to delete!")
    }
})



const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
