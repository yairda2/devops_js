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
app.post('/register', async (req, res) => {
  try {
    const { name, exam1, exam2, exam3 } = req.body;
    const student = new Student({ name, exam1, exam2, exam3 });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
