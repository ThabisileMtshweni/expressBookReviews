const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

const isValid = (username)=>{ 
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
  const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Optionally use bcrypt to hash passwords

// Sample users object with hashed passwords (you can replace it with your database or storage)
const users = {
    'john_doe': { password: '$2b$10$N9qo8uLOikgW0vYpOg7Pp..dbJ6s1rTSmbQkVszJ0Q.Z25eL1d3je' }, // Hashed password for 'password123'
    'jane_smith': { password: '$2b$10$uOzkvydf1Blpd.LRUkD4POh7KO79t3FFmhuKkj8wzZ0ERz.p1w9vK' } // Hashed password for 'mypassword'
};

const secretKey = 'your_jwt_secret_key'; // Secret key to sign JWTs

regd_users.post("/login", (req, res) => {
    const { username, password } = req.body; // Extract username and password from request body

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the username exists in the database
    const user = [][username];
    if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the password (using bcrypt to compare hashed passwords)
    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate a JWT token after successful login
        const token = jwt.sign({ username: username }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour

        // Optionally store the token in the session (depending on your session management setup)
        req.session.token = token; // Save the JWT in the session

        return res.status(200).json({ message: "Login successful", token: token });
    });


  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
  const reviews = {}; // A simple in-memory object to store book reviews. Replace with your database if needed.

regd_users.put("/auth/review/:isbn", (req, res) => {
    const { review } = req.query; // Extract review text from query parameters
    const { username } = req.session; // Retrieve the username from the session (logged-in user)

    // Check if the user is logged in
    if (!username) {
        return res.status(403).json({ message: "You must be logged in to post a review" });
    }

    // Check if the review is provided in the request
    if (!review || review.trim().length === 0) {
        return res.status(400).json({ message: "Review cannot be empty" });
    }

    const isbn = req.params.isbn; // Extract ISBN from the URL parameter

    // Initialize reviews for the ISBN if not yet created
    if (!reviews[isbn]) {
        reviews[isbn] = [];
    }

    // Check if the user has already posted a review for this ISBN
    const existingReviewIndex = reviews[isbn].findIndex((r) => r.username === username);

    if (existingReviewIndex !== -1) {
        // Modify the existing review
        reviews[isbn][existingReviewIndex].review = review;
        return res.status(200).json({ message: "Review updated successfully" });
    } else {
        // Add a new review for the book
        reviews[isbn].push({ username, review });
        return res.status(200).json({ message: "Review added successfully" });
    }
});

  return res.status(300).json({message: "Yet to be implemented"});
  regd_users.delete("/auth/review/:isbn", (req, res) => {
    const { username } = req.session; // Get the logged-in user's username from session
    const isbn = req.params.isbn; // Get the ISBN from the URL parameter

    // Check if the user is logged in
    if (!username) {
        return res.status(403).json({ message: "You must be logged in to delete a review" });
    }

    // Check if the reviews object exists for the ISBN
    if (!reviews[isbn]) {
        return res.status(404).json({ message: "No reviews found for this ISBN" });
    }

    // Find the review to delete
    const reviewIndex = reviews[isbn].findIndex(review => review.username === username);

    if (reviewIndex === -1) {
        return res.status(404).json({ message: "You have not posted a review for this book" });
    }

    // Remove the review from the array
    reviews[isbn].splice(reviewIndex, 1);

    // If there are no more reviews for this book, you could also delete the entry for that ISBN
    if (reviews[isbn].length === 0) {
        delete reviews[isbn];
    }

    return res.status(200).json({ message: "Review deleted successfully" });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = [];
