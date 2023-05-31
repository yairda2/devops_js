const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('<YOUR_MONGODB_CONNECTION_STRING>', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Register a new student
app.post('/register', async (req, res) => {
  try {
    const { name, exam1, exam2, exam3 } = req.body;
    const student = new Student({ name, exam1, exam2, exam3 });
    await student.save();
    res.status(201).send('Registered successfully!');
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).send('Registration failed. Please try again.');
  }
});

// Retrieve grades for a student
app.get('/grades/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const student = await Student.findOne({ name });
    if (student) {
      res.send(`Exam 1 Grade: ${student.exam1}<br>Exam 2 Grade: ${student.exam2}<br>Exam 3 Grade: ${student.exam3}`);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    console.error('Error retrieving grades:', error);
    res.status(500).send('Failed to retrieve grades');
  }
});

// Set up other routes and middleware

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
