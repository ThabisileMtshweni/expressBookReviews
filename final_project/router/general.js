const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


  
  public_users.post("/register", (req, res) => {
    const { username, password } = req.body; // Extract username and password from the request body

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if username already exists (assuming 'users' is an object that stores user data)
    if (users[username]) {
        return res.status(400).json({ message: "Username already exists" });
    }

    // Optionally, you can hash the password before storing it (using bcrypt or similar)
    // const hashedPassword = bcrypt.hashSync(password, 10);  // Example with bcrypt

    // Register the new user
    users[username] = { password };  // Save the user with username and password

    // Send success response
    return res.status(201).json({ message: "User registered successfully" });
});

  return res.status(300).json({message: "Yet to be implemented"});

// Get the book list available in the shop
 
  public_users.get('/', function (req, res) {
    // Assuming books are stored in a variable called 'books'
    if (!books || Object.keys(books).length === 0) {
        return res.status(404).json({ message: "No books available" });
    }

    return res.status(200).json({ books: books });
});

  return res.status(300).json({message: "Yet to be implemented"});
  const axios = require('axios');

  // Function to get the list of books using Promise callbacks
  function getBooks() {
      axios.get('https://example.com/api/books') // Replace with your API URL
          .then((response) => {
              console.log("Books List:", response.data); // Handle the response data
          })
          .catch((error) => {
              console.error("Error fetching books:", error); // Handle any errors
          });
  }
  
  getBooks(); // Call the function to fetch books
  
// Get book details based on ISBN

  public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn; // Retrieve ISBN from request parameters

    // Assuming books are stored in an object where keys are ISBN numbers
    const book = books[isbn];

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ book });
});

  return res.status(300).json({message: "Yet to be implemented"});
  const axios = require('axios');

// Function to get the book details based on ISBN using Promise callbacks
function getBookDetails(isbn) {
    axios.get(`https://example.com/api/books/${isbn}`) // Replace with your API URL
        .then((response) => {
            console.log("Book Details:", response.data); // Handle the response data
        })
        .catch((error) => {
            console.error("Error fetching book details:", error); // Handle any errors
        });
}

// Example ISBN to get details
getBookDetails('9781234567890'); // Call the function with a sample ISBN

  
// Get book details based on author
  
  public_users.get('/author/:author', function (req, res) {
    const author = req.params.author; // Retrieve author from request parameters
    const bookKeys = Object.keys(books); // Get all keys (ISBNs) from books object
    const booksByAuthor = [];

    // Loop through each book and check if the author matches
    bookKeys.forEach((isbn) => {
        if (books[isbn].author === author) {
            booksByAuthor.push(books[isbn]);
        }
    });

    if (booksByAuthor.length === 0) {
        return res.status(404).json({ message: "No books found by this author" });
    }

    return res.status(200).json({ books: booksByAuthor });
});

  return res.status(300).json({message: "Yet to be implemented"});
  const axios = require('axios');

// Function to get book details based on author using Promise callbacks
function getBooksByAuthor(author) {
    axios.get(`https://example.com/api/books/author/${author}`) // Replace with your API URL
        .then((response) => {
            console.log("Books by Author:", response.data); // Handle the response data
        })
        .catch((error) => {
            console.error("Error fetching books by author:", error); // Handle any errors
        });
}

// Example author to get books for
getBooksByAuthor('Author Name'); // Call the function with a sample author name

// Get all books based on title

  public_users.get('/title/:title', function (req, res) {
    const title = req.params.title; // Retrieve title from request parameters
    const bookKeys = Object.keys(books); // Get all keys (ISBNs) from books object
    const booksByTitle = [];

    // Loop through each book and check if the title matches
    bookKeys.forEach((isbn) => {
        if (books[isbn].title.toLowerCase() === title.toLowerCase()) {
            booksByTitle.push(books[isbn]);
        }
    });

    if (booksByTitle.length === 0) {
        return res.status(404).json({ message: "No books found with this title" });
    }

    return res.status(200).json({ books: booksByTitle });
});

  return res.status(300).json({message: "Yet to be implemented"});
  const axios = require('axios');

// Function to get book details based on title using Promise callbacks
function getBookDetailsByTitle(title) {
    axios.get(`https://example.com/api/books/title/${title}`) // Replace with your API URL
        .then((response) => {
            console.log("Book Details:", response.data); // Handle the response data
        })
        .catch((error) => {
            console.error("Error fetching book details by title:", error); // Handle any errors
        });
}

// Example title to get book details for
getBookDetailsByTitle('Sample Book Title'); // Call the function with a sample book title


//  Get book review
  public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn; // Retrieve ISBN from request parameters

    // Assuming reviews are stored in an object where the key is the ISBN
    const reviews = bookReviews[isbn];

    if (!reviews) {
        return res.status(404).json({ message: "No reviews found for this book" });
    }

    return res.status(200).json({ reviews });
});

  return res.status(300).json({message: "Yet to be implemented"});

module.exports.general = public_users;
