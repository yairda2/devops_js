const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb+srv://yair:yair@cluster0.ijthrbs.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define student schema and model
const studentSchema = new mongoose.Schema({
  name: String,
  exam1: Number,
  exam2: Number,
  exam3: Number,
});

const Student = require('./src/student');

// Set up routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'page.html'));
});

app.post('/register', async (req, res) => {
  try {
    const { name, exam1, exam2, exam3 } = req.body;
    const student = new Student({ name, exam1, exam2, exam3 });
    await student.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/grades', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
