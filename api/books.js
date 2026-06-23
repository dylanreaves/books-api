const express = require("express")
const router = express.Router()

let books = [
  { id: 1, title: "The Pragmatic Programmer", author: "David Thomas", genre: "Tech", available: true },
  { id: 2, title: "Educated", author: "Tara Westover", genre: "Memoir", available: true },
  { id: 3, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", available: false },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", available: true },
  { id: 5, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", available: true },
];

let nextId = 6; // use this for any new book you create

router.get("/", (req, res) => {
    if (req.query.genre) {
        const matchingBooks = books.filter((book) => { return book.genre === req.query.genre })
        console.log(matchingBooks)
        res.json(matchingBooks)
    } else {
        res.json(books)
    }
});

router.get("/:id", (req, res) => { 
    console.log(req.params.id)

    let matchingBook = undefined
    for (let i = 0; i < books.length; i++) {
        if (Number(req.params.id) == books[i].id) {
            matchingBook = books[i]
            break
        }
    }

    if (matchingBook) {
        res.json(matchingBook)
    } else {
        res.status(404).send("Not Found")
    }
})

router.post("/", (req, res) => { 
    //console.log(req.body)
    if (!req.body.title) {
        res.status(400).send("Body is missing title.")
    }
    if (!req.body.author) {
        res.status(400).send("Body is missing author.")
    }

    const newBook = {}
    newBook.id = nextId
    newBook.title = req.body.title
    newBook.author = req.body.author
    newBook.genre = req.body.genre
    books.push(newBook)
    nextId++
    res.status(201).send("Added new book:", newBook)
})

router.patch("/:id", (req, res) => { 
    let matchingBook = undefined
    for (let i = 0; i < books.length; i++) {
        if (Number(req.params.id) == books[i].id) {
            matchingBook = books[i]
            break
        }
    }

    if (matchingBook === undefined) {
        res.status(404).send("Not Found")
    } else {
        Object.assign(matchingBook, req.body)
        res.status(200).send("Updated book:", matchingBook)
    }
})

router.delete("/:id", (req, res) => { 
    let matchingBook_index = undefined
    for (let i = 0; i < books.length; i++) {
        if (Number(req.params.id) == books[i].id) {
            matchingBook_index = i
            break
        }
    }

    if (matchingBook_index === undefined) {
        res.status(404).send("Not Found")
    } else {
        books.splice(matchingBook_index, 1)
        res.status(204).send("Deleted Book:", matchingBook_index)
    }
    
})


module.exports = router