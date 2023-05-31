const express = require('express');
const app = express();
const db = require('./db');

// Middleware to parse JSON requests
app.use(express.json());

// Routes
// TODO: Add your routes here

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



const Student = require('./models/student');

// Register a student
// Register page
app.get('/register', (req, res) => {
  res.render('register');
});


const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
